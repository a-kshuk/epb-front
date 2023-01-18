import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IWorkMode {
  id: number;
  title: string;
  temperature: number;
  pressure: number;
}

export interface IMaterialMechanicalProps {
  idWorkMode: number;
  idMaterial: number;
  permissibleStresses: number;
  ovality: number;
  elasticModulus: number;
}

export interface IMaterial {
  id: number;
  title: string;
}

export interface IPipelineMainOptionsState {
  title: string;
  regNumber: string;
  location: string;
  materials: IMaterial[];
  workModes: IWorkMode[];
  materialMechanicalProps: IMaterialMechanicalProps[];
}

const initialState: IPipelineMainOptionsState = {
  title: '',
  regNumber: '',
  location: '',
  materials: [],
  workModes: [],
  materialMechanicalProps: [],
};

export const pipelineMainOptionsSlice = createSlice({
  name: 'pipelineMainOptions',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setRegNumber: (state, action: PayloadAction<string>) => {
      state.regNumber = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },

    addMaterial: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const id = (state.materials[state.materials.length - 1]?.id || 0) + 1;
      const mechanicalProps: IMaterialMechanicalProps[] = state.workModes.map(
        ({ id: idWorkMode }) => ({
          idWorkMode,
          idMaterial: id,
          permissibleStresses: 0,
          ovality: 0,
          elasticModulus: 0,
        })
      );
      state.materials = [...state.materials, { id, title }];
      state.materialMechanicalProps = [
        ...state.materialMechanicalProps,
        ...mechanicalProps,
      ];
    },

    editMaterialMechanicalProps: (
      state,
      action: PayloadAction<IMaterialMechanicalProps>
    ) => {
      const mechanicalProp = action.payload;
      const mechanicalProps = state.materialMechanicalProps.map((props) =>
        props.idWorkMode === mechanicalProp.idWorkMode &&
        props.idMaterial === mechanicalProp.idMaterial
          ? mechanicalProp
          : props
      );
      state.materialMechanicalProps = mechanicalProps;
    },

    removeMaterial: (state, action: PayloadAction<number>) => {
      const materials = state.materials.filter(
        (material) => material.id !== action.payload
      );
      const materialMechanicalProps = state.materialMechanicalProps.filter(
        (mechanicalProps) => mechanicalProps.idMaterial !== action.payload
      );
      state.materials = materials;
      state.materialMechanicalProps = materialMechanicalProps;
    },

    addWorkMode: (
      state,
      action: PayloadAction<{
        temperature: number;
        pressure: number;
        title: string;
      }>
    ) => {
      const { temperature, pressure, title } = action.payload;
      const id = (state.workModes[state.workModes.length - 1]?.id || 0) + 1;
      const mechanicalProps = state.materials.map((material) => ({
        idMaterial: material.id,
        idWorkMode: id,
        permissibleStresses: 0,
        ovality: 0,
        elasticModulus: 0,
      }));
      state.materialMechanicalProps = mechanicalProps;
      state.workModes = [
        ...state.workModes,
        { id, temperature, pressure, title },
      ];
    },

    editWorkMode: (state, action: PayloadAction<IWorkMode>) => {
      const workMode = action.payload;
      state.workModes = state.workModes.map((mode) =>
        mode.id === workMode.id ? workMode : mode
      );
    },

    removeWorkMode: (state, action: PayloadAction<number>) => {
      const workModeId = action.payload;
      const mechanicalProps = state.materialMechanicalProps.filter(
        (props) => props.idWorkMode === workModeId
      );
      const workModes = state.workModes.filter(
        (material) => material.id !== workModeId
      );
      state.materialMechanicalProps = mechanicalProps;
      state.workModes = workModes;
    },
  },
});

export const {
  setTitle,
  setRegNumber,
  setLocation,
  addMaterial,
  removeMaterial,
  addWorkMode,
  editWorkMode,
  removeWorkMode,
} = pipelineMainOptionsSlice.actions;

export default pipelineMainOptionsSlice;
