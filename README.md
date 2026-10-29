# Form Re-CAPTCHA

A simple CAPTCHA component for Next.js / React forms, written in TypeScript.

[![npm version](https://img.shields.io/npm/v/form_recaptcha.svg)](https://www.npmjs.com/package/form_recaptcha)
[![license](https://img.shields.io/npm/l/form_recaptcha.svg)](#license)

## Features

- Drop-in React component for Next.js forms
- Written in TypeScript, with bundled type declarations
- Controlled component: the CAPTCHA value lives in your own React state

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
npm run build   # compiles TypeScript to dist/
```

## Contributing

Issues and pull requests are welcome at
[github.com/huachenlihx/form_recaptcha](https://github.com/huachenlihx/form_recaptcha/issues).

## License

ISC © Hua Chen
