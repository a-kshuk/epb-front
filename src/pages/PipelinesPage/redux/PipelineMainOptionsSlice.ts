import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { title } from 'process';

interface IWorkingMode {
  id: number;
  title: string;
  temperature: number;
  pressure: number;
}

interface IMaterialMechanicalProps {
  idWorkMode: number;
  permissibleStresses: number;
  permissibleStressesTest: number;
  ovality: number;
  elasticModulus: number;
}

interface IMaterial {
  id: number;
  title: string;
  mechanicalProps: IMaterialMechanicalProps[];
}

export interface IPipelineMainOptionsState {
  title: string;
  regNumber: string;
  location: string;
  materials: IMaterial[];
  workingModes: IWorkingMode[];
}

const initialState: IPipelineMainOptionsState = {
  title: '',
  regNumber: '',
  location: '',
  materials: [],
  workingModes: [],
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
    addMaterial: (
      state,
      action: PayloadAction<{
        title: string;
        mechanicalProps: IMaterialMechanicalProps[];
      }>
    ) => {
      const { title, mechanicalProps } = action.payload;
      const id = state.materials[state.materials.length - 1]?.id || 1;
      state.materials = [...state.materials, { id, title, mechanicalProps }];
    },
    removeMaterial: (state, action: PayloadAction<{ materialId: number }>) => {
      const materials = state.materials.filter(
        (material) => material.id !== action.payload.materialId
      );
      state.materials = [...materials];
    },
    addWorkingMode: (
      state,
      action: PayloadAction<{
        temperature: number;
        pressure: number;
        title: string;
      }>
    ) => {
      const { temperature, pressure, title } = action.payload;
      const id = state.workingModes[state.workingModes.length - 1]?.id || 1;
      const materials = state.materials.map((material) => {
        const mechanicalProps: IMaterialMechanicalProps[] = [
          ...material.mechanicalProps,
          {
            idWorkMode: id,
            permissibleStresses: 0,
            permissibleStressesTest: 0,
            ovality: 0,
            elasticModulus: 0,
          },
        ];

        return { ...material, mechanicalProps };
      });
      state.materials = materials;
      state.workingModes = [
        ...state.workingModes,
        { id, temperature, pressure, title },
      ];
    },
    removeWorkingMode: (
      state,
      action: PayloadAction<{ workingModeId: number }>
    ) => {
      const { workingModeId } = action.payload;
      const materials = state.materials.map((material) => {
        const mechanicalProps = material.mechanicalProps.filter(
          ({ idWorkMode }) => idWorkMode !== workingModeId
        );
        return { ...material, mechanicalProps };
      });
      state.materials = materials;
      const workingModes = state.workingModes.filter(
        (material) => material.id !== workingModeId
      );
      state.workingModes = [...workingModes];
    },
  },
});

export const {
  setTitle,
  setRegNumber,
  setLocation,
  addMaterial,
  removeMaterial,
  addWorkingMode,
  removeWorkingMode,
} = pipelineMainOptionsSlice.actions;

export default pipelineMainOptionsSlice;
