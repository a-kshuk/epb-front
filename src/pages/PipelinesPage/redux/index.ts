export {
  default as pipelineMainOptionsSlice,
  setTitle,
  setRegNumber,
  setLocation,
  addMaterial,
  editMaterial,
  removeMaterial,
  addWorkMode,
  editWorkMode,
  removeWorkMode,
  editMaterialMechanicalProps,
} from './PipelineMainOptionsSlice';

export type {
  IMaterial,
  IMaterialMechanicalProps,
  IWorkMode,
} from './PipelineMainOptionsSlice';
