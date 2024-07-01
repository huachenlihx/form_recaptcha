import { useEffect, useRef } from 'react';

const getCode = (): string => Math.floor(Math.random() * 1_000_000).toString();

const randomColor = () => {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return "rgb(" + red + "," + green + "," + blue + ")";
}

const canvasWidth = 150;
const canvasHeight = 30;

const RECAPTCHA = ({codeValue, setCodeValue}: {codeValue: string, setCodeValue: Function}) =>{
  const canvasRef = useRef(null)

  useEffect(()=>{
    const newCode = getCode();
    setCodeValue(newCode);
 },[setCodeValue]);

 useEffect(()=>{
  const canvas = (canvasRef.current as unknown) as HTMLCanvasElement;
  if(canvas) {
    const context = canvas.getContext('2d');
    if(context){
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      // insert code
      context.font = "bold 28px Arial";
      context.letterSpacing = '3px';
      context.fillText(codeValue, 15, 25);

      // insert lines
      for (let i = 0; i <= 15; i++) {
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
        context.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
        context.stroke();
      }

      // inset dots
      for (let i = 0; i < 50; i++) {
        context.strokeStyle = randomColor();
        context.beginPath();
        let x = Math.random() * canvasWidth;
        let y = Math.random() * canvasHeight;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }
    }
  }
},[codeValue]);

  return (
    <div style={{display: 'flex'}}>
    <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
    <button type='button' onClick={()=>{setCodeValue(getCode())}}>New Captcha</button>
    </div>
  )
}

export default RECAPTCHA;