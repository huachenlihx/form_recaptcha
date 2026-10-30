# Accessibility notes — form_recaptcha

## Improvements included

- The CAPTCHA canvas is identified by an accessible name and instructions, without exposing the answer through ARIA.
- The **New Captcha** button is a native button, keyboard-operable, with an accessible name and at least 44 × 44 CSS-pixel target dimensions.
- Refresh events provide a polite screen-reader announcement.
- Instructions remain visible at browser zoom; the component wraps on narrow screens.
- Unit tests verify descriptive naming and refresh announcements in addition to the existing CAPTCHA behavior.

## Crucial WCAG 2.2 limitation

A distorted-text image CAPTCHA cannot be made fully accessible through ARIA alone. WCAG 2.2 success criterion **1.1.1 Non-text Content** includes a specific CAPTCHA provision: identify the CAPTCHA purpose and provide alternative forms using different sensory perception modes. The CAPTCHA in this package does **not** include an equivalent nonvisual challenge or server-side verification method.

**The application that embeds this library must provide an equivalent, usable alternative verification path.** An accessible, server-validated challenge or other anti-abuse method is preferable. An audio-only alternative may also exclude some users; multiple options and manual testing are recommended. The displayed instructions refer to an alternative, but the host application must actually supply it. Do not describe the package as WCAG compliant on its own.

Also ensure that the host application provides a properly labeled field for entering the CAPTCHA response, error text and recovery, appropriate focus management, and secure **server-side** validation. The published component only displays and refreshes the visual challenge.

## Verification checklist

1. Tab and Shift+Tab through the host form; verify visible focus on the refresh button.
2. Activate the refresh button using Enter and Space.
3. With VoiceOver, verify that the canvas is described and the challenge refresh is announced without reading the secret code.
4. Zoom to 200% and 400% and check that the instructions and controls remain usable.
5. Verify that users unable to read the image can complete the **real alternative** verification method.
6. Run axe DevTools and manual screen-reader checks on the host form; automated tests alone cannot establish WCAG conformance.
