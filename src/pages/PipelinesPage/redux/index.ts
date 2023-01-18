export {
  default as pipelineMainOptionsSlice,
  setTitle,
  setRegNumber,
  setLocation,
  addMaterial,
  removeMaterial,
  addWorkMode,
  editWorkMode,
  removeWorkMode,
} from './PipelineMainOptionsSlice';

export type {
  IMaterial,
  IMaterialMechanicalProps,
  IWorkMode,
} from './PipelineMainOptionsSlice';
