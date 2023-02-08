import { IMaterialProps } from 'entities/pipelineMaterialProps';
import { IWorkMode } from 'entities/pipelineWorkMode';
import { IPipePosition } from 'entities/straightPipe/model/straightPipeModel';

export interface IStraightPipeTable {
  mode: IWorkMode;
  pipes: {
    pipe: IPipePosition;
    materialProps: IMaterialProps;
  }[];
}
