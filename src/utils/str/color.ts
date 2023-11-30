// hexToRgbA('#fbafff')
export function hexToRgba(hex: string, opacity: string='1'){
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      let c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      const cs= '0x'+c.join('') as any as number;
      return 'rgba('+[(cs>>16)&255, (cs>>8)&255, cs&255].join(',')+`,${opacity})`;
  }
  // throw new Error('Bad Hex');
  return hex
}
