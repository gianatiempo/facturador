const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

export const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const toARS = (v: number): string => new Intl.NumberFormat('es', { style: 'currency', currency: 'ARS' }).format(v);

export const calcular = (minimo: number, maximo: number, facturar: number, mult: number): Array<number> => {
  const myValues: Array<number> = [];
  let myTotal = 0;

  while (facturar - myTotal > maximo) {
    const rnd = Math.ceil(random(minimo, maximo) / mult) * mult;

    myTotal += rnd;
    myValues.push(rnd);
  }

  let diferencia = facturar - myTotal;

  if (diferencia <= maximo && diferencia >= minimo) {
    myValues.push(diferencia);
    myTotal += diferencia;
  } else {
    let pos = 0;
    while (diferencia > 0) {
      const valor = Math.ceil(diferencia / (myValues.length - pos) / mult) * mult;
      if (myValues[pos] + valor <= maximo) {
        myValues[pos] += valor;
        diferencia -= valor;
      }
      pos < myValues.length - 1 ? pos++ : (pos = 0);
    }
  }

  return myValues;
};

export type Mes = {
  title: string;
  total: number;
};
