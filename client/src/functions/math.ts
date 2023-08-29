// math.ts
function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

function randomInRange(min: number, max:number) {
  return Math.random() * (max - min) + min;
}

export default { zeroFill, randomInRange};
