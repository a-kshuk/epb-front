import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export interface IWorkMode {
  id: number;
  title: string;
  temperature: number;
  pressure: number;
}

export interface IMaterialProps {
  idWorkMode: number;
  idMaterial: number;
  permissibleStresses: number;
  elasticModulus: number;
  linearExpansion: number;
}

interface IPipelineMaterialProps {
  props: IMaterialProps[];
}

const initialState: IPipelineMaterialProps = {
  props: [],
};

export const pipelineMaterialPropsModel = createSlice({
  name: 'pipelineMaterialProps',
  initialState,
  reducers: {
    setMaterialsProps: (state, action: PayloadAction<IMaterialProps[]>) => {
      state.props = action.payload;
    },
  },
});

export interface IMechanicalProps extends IMaterialProps {
  materialTitle: string;
  modeTitle: string;
}

export const useMechanicalPropsList = (): IMechanicalProps[] =>
  useSelector(
    createSelector(
      (state: RootState) => state.pipelineMaterial.materials,
      (state: RootState) => state.pipelineWorkMode.modes,
      (state: RootState) => state.pipelineMaterialProps.props,
      (
        materials: RootState['pipelineMaterial']['materials'],
        modes: RootState['pipelineWorkMode']['modes'],
        materialProps: RootState['pipelineMaterialProps']['props']
      ) => {
        const newMaterialProps: IMechanicalProps[] = [];
        materials.forEach((material) => {
          modes.forEach((mode) => {
            const props = materialProps?.find(
              ({ idMaterial, idWorkMode }) =>
                idMaterial === material.id && idWorkMode === mode.id
            ) || {
              idMaterial: material.id,
              idWorkMode: mode.id,
              permissibleStresses: 0,
              elasticModulus: 0,
              linearExpansion: 0,
            };
            newMaterialProps.push({
              ...props,
              materialTitle: material.title,
              modeTitle: mode.title,
            });
          });
        });
        return newMaterialProps;
      }
    )
  );

export const { setMaterialsProps } = pipelineMaterialPropsModel.actions;

export default pipelineMaterialPropsModel;
