/* eslint-disable camelcase */

const round = (value: number, countCeil: number) => {
  let param = 1;
  for (let i = 0; i < countCeil; i++) {
    param *= 10;
  }
  return Math.round(value * param) / param;
};

export interface IPipeBend {
  pressure: number;
  temperature: number;
  externalDiameter: number;
  radiusBend: number;
  ovality: number;
  weldCoefficient: number;
  permissibleStresses: number;
  steelType?: 'carbon' | 'alloy' | 'austenitic';
}

export interface IPipeBendCalculation {
  estimatedThickness: number;
  K1: number;
  K2: number;
  K3: number;
  Y1: number;
  Y2: number;
  Y3: number;
  Sr: number;
  Sr1: number;
  Sr2: number;
  Sr3: number;
  q: number;
  alpha: number;
}

export const calculationThicknessBendPipe = (
  bend: IPipeBend
): IPipeBendCalculation => {
  const p = bend.pressure;
  const R = bend.radiusBend;
  const Da = bend.externalDiameter;
  const fi = bend.weldCoefficient;
  const sigma = bend.permissibleStresses;
  const ovality = bend.ovality;
  const T = bend.temperature;
  const steelType = bend.steelType;

  const K1 = round(((4 * R) / Da + 1) / ((4 * R) / Da + 2), 3);
  const K2 = round(((4 * R) / Da - 1) / ((4 * R) / Da - 2), 3);
  const K3 = 1;

  const alpha = Math.max(0.03, p / (2 * sigma + p));
  const q = Math.max((2 * alpha * R) / Da + 0.5, 1);

  let Y1 = 0;
  let Y2 = 0;
  let Y3 = 0;

  if (steelType === 'carbon') {
    calculationShapeFactor(350, 400);
  } else if (steelType === 'alloy') {
    calculationShapeFactor(400, 450);
  } else if (steelType === 'austenitic') {
    calculationShapeFactor(450, 500);
  }

  const Sr = +((p * Da) / (2 * fi * sigma + p * 1)).toFixed(2);
  const Sr1 = +(Sr * K1 * Y1).toFixed(2);
  const Sr2 = +(Sr * K2 * Y2).toFixed(2);
  const Sr3 = +(Sr * K3 * Y3).toFixed(2);

  const Sa = Math.max(Sr, Sr1, Sr2, Sr3);

  function calculationShapeFactor(T1: number, T2: number) {
    if (T <= T1) {
      const values = shapeFactor_1();
      Y1 = values.Y1;
      Y3 = values.Y3;
    } else if (T >= T2) {
      const values = shapeFactor_2();
      Y1 = values.Y1;
      Y3 = values.Y3;
    } else {
      const values_1 = shapeFactor_1();
      const values_2 = shapeFactor_2();
      const interpolationCoefficient = (1 / (T2 - T1)) * (T - T1);
      Y1 = values_1.Y1 - (values_1.Y1 - values_2.Y1) * interpolationCoefficient;
      Y3 = values_1.Y3 - (values_1.Y3 - values_2.Y3) * interpolationCoefficient;
    }
    Y1 = round(Y1, 3);
    Y2 = Y1;
    Y3 = round(Y3, 3);
  }

  function shapeFactor_1(): { Y1: number; Y3: number } {
    return {
      Y1: Math.max(
        1,
        0.12 * (1 + Math.sqrt(1 + ((0.4 * ovality) / alpha) * q))
      ),
      Y3: Math.max(1, 0.12 * (1 + Math.sqrt(1 + (0.4 * ovality) / alpha))),
    };
  }

  function shapeFactor_2(): { Y1: number; Y3: number } {
    return {
      Y1: Math.max(
        1,
        0.4 * (1 + Math.sqrt(1 + ((0.015 * ovality) / alpha) * q))
      ),
      Y3: Math.max(1, 0.4 * (1 + Math.sqrt(1 + (0.015 * ovality) / alpha))),
    };
  }

  return {
    estimatedThickness: Sa,
    K1,
    K2,
    K3,
    Y1,
    Y2,
    Y3,
    alpha,
    q,
    Sr,
    Sr1,
    Sr2,
    Sr3,
  };
};
