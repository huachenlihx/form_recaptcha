import { useEffect, useId, useRef, useState } from 'react';

type CaptchaProps = {
  codeValue: string;
  setCodeValue: (value: string) => void;
};

const canvasWidth = 160;
const canvasHeight = 30;

const getCode = () => Math.floor(Math.random() * 1_000_000).toString();

const randomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red},${green},${blue})`;
};

/**
 * Visual-only CAPTCHA challenge. The embedding form MUST offer an accessible,
 * equivalent verification alternative; see ACCESSIBILITY.md.
 */
export default function RECAPTCHA({ codeValue, setCodeValue }: CaptchaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instructionsId = useId();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    setCodeValue(getCode());
  }, [setCodeValue]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 28px Arial';
    context.fillStyle = '#111111';
    context.fillText(codeValue.split('').join('\u200a'), 15, 25);

    for (let i = 0; i <= 15; i++) {
      context.strokeStyle = randomColor();
      context.beginPath();
      context.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
      context.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
      context.stroke();
    }

    for (let i = 0; i < 50; i++) {
      context.strokeStyle = randomColor();
      context.beginPath();
      const x = Math.random() * canvasWidth;
      const y = Math.random() * canvasHeight;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
  }, [codeValue]);

  const refreshCaptcha = () => {
    setCodeValue(getCode());
    setAnnouncement('A new visual CAPTCHA challenge has been generated.');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        role="img"
        aria-label="Visual CAPTCHA challenge containing distorted characters"
        aria-describedby={instructionsId}
      >
        Visual CAPTCHA challenge. An alternative verification method is required for users who cannot view the image.
      </canvas>
      <button
        type="button"
        onClick={refreshCaptcha}
        aria-label="Generate a new visual CAPTCHA challenge"
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '2px solid #047857',
          borderRadius: 8,
          padding: '10px 14px',
          minHeight: 44,
          minWidth: 44,
          cursor: 'pointer',
        }}
      >
        New Captcha
      </button>
      <span id={instructionsId} style={{ fontSize: 14, lineHeight: 1.5 }}>
        Visual verification challenge. If you cannot read it, use the alternative verification option provided by the form.
      </span>
      <span role="status" aria-live="polite" aria-atomic="true" className="sr-only" style={{
        position: 'absolute', width: 1, height: 1, padding: 0,
        margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap', border: 0,
      }}>
        {announcement}
      </span>
    </div>
  );
}
