import { ISteelType } from '../model/pipelineMaterialModel';

export const STEEL_TYPE_LABEL: Record<ISteelType, string> = {
  carbon: 'углеродистая',
  alloy: 'легированная',
  austenitic: 'аустенитная',
};

export const STEEL_TYPE_TABLE: { value: ISteelType; label: string }[] = [
  { value: 'carbon', label: 'углеродистая' },
  { value: 'alloy', label: 'легированная' },
  { value: 'austenitic', label: 'аустенитная' },
];
