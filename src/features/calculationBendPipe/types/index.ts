import { IBendPipePosition } from 'entities/bendPipe/model/bendPipeModel';
import { IMaterial } from 'entities/pipelineMaterial';
import { IMaterialProps } from 'entities/pipelineMaterialProps';
import { IWorkMode } from 'entities/pipelineWorkMode';

export interface IBendPipeTable {
  mode: IWorkMode;
  pipes: {
    pipe: IBendPipePosition;
    materialProps?: IMaterialProps;
    material?: IMaterial;
  }[];
}
