// @vitest-environment jsdom
import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import RECAPTCHA from '../components/RECAPTCHA';

const context = {
  clearRect: vi.fn(),
  fillText: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  canvas: { width: 160, height: 30 },
  font: '',
  strokeStyle: '',
};

function ControlledCaptcha() {
  const [codeValue, setCodeValue] = useState('');
  return (
    <>
      <output data-testid="captcha-code">{codeValue}</output>
      <RECAPTCHA codeValue={codeValue} setCodeValue={setCodeValue} />
    </>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
    context as unknown as CanvasRenderingContext2D,
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('RECAPTCHA', () => {
  it('generates a code on mount using the parent state setter', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.123456);
    render(<ControlledCaptcha />);
    expect(await screen.findByTestId('captcha-code')).toHaveTextContent('123456');
  });

  it('renders a 160 by 30 canvas', () => {
    render(<ControlledCaptcha />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '160');
    expect(canvas).toHaveAttribute('height', '30');
  });

  it('draws the CAPTCHA code onto the canvas', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.123456);
    render(<ControlledCaptcha />);
    await waitFor(() => expect(context.fillText).toHaveBeenCalled());
    expect(context.clearRect).toHaveBeenCalledWith(0, 0, 160, 30);
    expect(context.fillText).toHaveBeenCalledWith(
      '1\u200a2\u200a3\u200a4\u200a5\u200a6',
      15,
      25,
    );
  });

  it('draws interference strokes on the canvas', async () => {
    render(<ControlledCaptcha />);
    await waitFor(() => expect(context.stroke).toHaveBeenCalled());
    // 16 lines (0..15) plus 50 dots, per canvas redraw.
    expect(context.stroke.mock.calls.length).toBeGreaterThanOrEqual(66);
    expect(context.beginPath).toHaveBeenCalled();
    expect(context.moveTo).toHaveBeenCalled();
    expect(context.lineTo).toHaveBeenCalled();
  });

  it('generates a new code when New Captcha is clicked', async () => {
    vi.spyOn(Math, 'random')
      .mockImplementationOnce(() => 0.123456)
      .mockReturnValue(0.765432);
    render(<ControlledCaptcha />);
    expect(await screen.findByTestId('captcha-code')).toHaveTextContent('123456');
    fireEvent.click(screen.getByRole('button', { name: 'Generate a new visual CAPTCHA challenge' }));
    expect(await screen.findByTestId('captcha-code')).toHaveTextContent('765432');
  });

  it('uses a non-submit button so it does not submit surrounding forms', () => {
    render(<ControlledCaptcha />);
    expect(screen.getByRole('button', { name: 'Generate a new visual CAPTCHA challenge' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('labels the visual challenge without revealing the solution to screen readers', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.123456);
    render(<ControlledCaptcha />);
    const challenge = screen.getByRole('img', {
      name: 'Visual CAPTCHA challenge containing distorted characters',
    });
    expect(challenge).toHaveAttribute('aria-describedby');
    expect(challenge.getAttribute('aria-label')).not.toContain('123456');
    expect(screen.getByText(/alternative verification option provided by the form/i)).toBeInTheDocument();
  });

  it('announces when a challenge is refreshed, without speaking its answer', async () => {
    render(<ControlledCaptcha />);
    fireEvent.click(screen.getByRole('button', {
      name: 'Generate a new visual CAPTCHA challenge',
    }));
    const announcement = screen.getByText(
      'A new visual CAPTCHA challenge has been generated.',
      { selector: '[role="status"]' },
    );
    expect(announcement).toHaveAttribute('aria-live', 'polite');
    expect(announcement).not.toHaveTextContent(screen.getByTestId('captcha-code').textContent ?? '');
  });

  it('does not crash when canvas 2D context is unavailable', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    expect(() => render(<ControlledCaptcha />)).not.toThrow();
  });
});
