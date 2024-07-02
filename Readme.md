# Form Re-CAPTCHA

Simple captcha for NEXT JS Form.


## Installation

Via npm:

	$ npm install form_recaptcha

## Usage (for next.js)

```javascript

import Captcha from 'form_recaptcha';

const [codeValue, setCodeValue] = useState('');

<Captcha codeValue={codeValue} setCodeValue={setCodeValue} />
```