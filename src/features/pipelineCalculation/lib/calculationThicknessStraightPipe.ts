interface ICalculationThicknessStraightPipe {
  pressure: number;
  externalDiameter: number;
  weldCoefficient: number;
  permissibleStresses: number;
}

export const calculationThicknessStraightPipe = (
  pipe: ICalculationThicknessStraightPipe
): number => {
  const p = pipe.pressure;
  const Da = pipe.externalDiameter;
  const fi = pipe.weldCoefficient;
  const sigma = pipe.permissibleStresses;

  const Sa = +((p * Da) / (2 * fi * sigma + p * 1)).toFixed(2);
  return Sa;
};
