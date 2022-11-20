type partPipeline = 'прямой участок' | 'гиб';

export interface IThicknessMeasurement {
  materialName: string;
  type: partPipeline;
  allowableStress: number;
  pressure: number;
  outsideDiameter: number;
}
