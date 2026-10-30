# Form Re-CAPTCHA

A simple CAPTCHA component for Next.js / React forms, written in TypeScript.

[![npm version](https://img.shields.io/npm/v/form_recaptcha.svg)](https://www.npmjs.com/package/form_recaptcha)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

## Features

- Drop-in React component for Next.js forms
- Written in TypeScript, with bundled type declarations
- Controlled component: the CAPTCHA value lives in your own React state
- Labeled canvas, keyboard-operable refresh button, and polite refresh announcements

## Requirements

- React 18+
- Next.js (or any React 18 app)

## Installation

```bash
npm install form_recaptcha
```

## Usage

The component is a controlled component. Keep the CAPTCHA value in state and
pass it to `Captcha` along with its setter.

```tsx
"use client"; // required when using the Next.js App Router

import { useState } from "react";
import Captcha from "form_recaptcha";

export default function ContactForm() {
  const [codeValue, setCodeValue] = useState("");

  return (
    <form>
      {/* ...your form fields... */}
      <Captcha codeValue={codeValue} setCodeValue={setCodeValue} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Props

| Prop           | Type                      | Description                                  |
| -------------- | ------------------------- | -------------------------------------------- |
| `codeValue`    | `string`                  | Current CAPTCHA value, held in your state    |
| `setCodeValue` | `(value: string) => void` | State setter called by the component         |

## Development

```bash
git clone https://github.com/huachenlihx/form_recaptcha.git
cd form_recaptcha
npm install
npm test        # runs React component unit tests
npm run build   # compiles TypeScript to dist/
```

## Automated tests

The project uses **Vitest**, **React Testing Library**, and **jsdom** for React
component tests. The tests mock the HTML canvas 2D context, so they do not
require a browser, server, or real CAPTCHA verification service.

Tests cover:

- Generating an initial CAPTCHA code and updating the parent component state.
- Rendering the canvas at its expected dimensions (160 × 30).
- Drawing the CAPTCHA text and interference lines/dots.
- Generating a new code when the **New Captcha** button is clicked.
- Ensuring the refresh button does not submit a parent form.
- Handling a missing canvas 2D context without crashing.

```bash
npm install           # installs test dependencies; refreshes package-lock.json
npm test              # run the nine component tests once
npm run test:watch    # watch files and rerun tests
npm run test:coverage # generate a local coverage/ report
npm run build         # compile the published component
```

**Note:** If upgrading from the original repository, run `npm install` once
before `npm ci` to update `package-lock.json` with the new test dependencies.
Commit the refreshed lockfile alongside `package.json` for reproducible installs.
`coverage/` is generated output and is ignored by Git.

These are component unit tests, not an accessibility audit or a guarantee that
client-side CAPTCHA alone can prevent automated submissions. Actual bot
protection requires trusted server-side validation.

## Accessibility (WCAG 2.2)

The component includes accessibility-oriented enhancements: a descriptive accessible name for the canvas (without disclosing the CAPTCHA answer), readable instructions, a keyboard-operable 44px minimum refresh control, and a screen-reader announcement on refresh. The test suite includes accessibility assertions.

**Important limitation:** This is still an image-based visual challenge. It cannot independently satisfy WCAG 2.2 criterion **1.1.1 Non-text Content** for CAPTCHA, which requires alternatives accommodating different sensory abilities. The containing form must provide an **equivalent accessible verification path** (for example, an accessible server-validated verification method) and clear instructions for using it. Merely labeling the canvas does not make its characters available to screen readers. See [ACCESSIBILITY.md](ACCESSIBILITY.md).

This work targets applicable accessibility requirements; it is **not a claim of full WCAG 2.2 AA conformance**.

## Contributing

Issues and pull requests are welcome at
[github.com/huachenlihx/form_recaptcha](https://github.com/huachenlihx/form_recaptcha/issues).

## License

MIT © 2026 Hua Chen
