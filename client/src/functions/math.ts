// math.ts
function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

export default { zeroFill };
