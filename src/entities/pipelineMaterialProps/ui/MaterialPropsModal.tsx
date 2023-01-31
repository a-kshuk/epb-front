import React, { memo, useEffect, useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Modal } from 'shared/ui';
import { useAppDispatch } from 'shared/hooks';

import {
  setMaterialsProps,
  IMaterialProps,
  IMechanicalProps,
} from '../material';

type IFormInput = Omit<IMaterialProps, 'idWorkMode' | 'idMaterial'>;

interface IProps {
  onClose: () => void;
  mechanicalProps: IMechanicalProps[];
  index?: number;
}

const MaterialPropsModal: React.FC<IProps> = (props) => {
  const { index, mechanicalProps, onClose } = props;
  const dispatch = useAppDispatch();

  const materialProps = useMemo(
    () => (typeof index === 'number' ? mechanicalProps[index] : undefined),
    [index]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({ mode: 'onChange' });

  useEffect(() => {
    if (materialProps) {
      setValue('permissibleStresses', materialProps.permissibleStresses);
      setValue('elasticModulus', materialProps.elasticModulus);
      setValue('linearExpansion', materialProps.linearExpansion);
      return;
    }
  }, [materialProps]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(
      setMaterialsProps(
        mechanicalProps.map(
          ({
            idMaterial,
            idWorkMode,
            permissibleStresses,
            elasticModulus,
            linearExpansion,
          }) => {
            if (
              idMaterial === materialProps?.idMaterial &&
              idWorkMode === materialProps.idWorkMode
            ) {
              return {
                idMaterial: materialProps.idMaterial,
                idWorkMode: materialProps.idWorkMode,
                ...data,
              };
            }
            return {
              idMaterial,
              idWorkMode,
              permissibleStresses,
              elasticModulus,
              linearExpansion,
            };
          }
        )
      )
    );
    onClose();
  };

  const getInputError = (key: keyof IFormInput) => {
    if (errors[key]?.type === 'required') {
      return 'error';
    }
  };

  if (!materialProps) {
    return null;
  }

  return (
    <Modal
      title={`Свойства материала ${materialProps.materialTitle}`}
      isVisible={!!mechanicalProps}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={'gap20px'}>
        <Input label='Режим' value={materialProps.modeTitle} disabled />
        <Controller
          name='permissibleStresses'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label='Номинальное допускаемое напряжение'
              status={getInputError('permissibleStresses')}
              required
              type='number'
              step='0.5'
              {...field}
            />
          )}
        />
        <Controller
          name='elasticModulus'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label='Модуль упругости'
              status={getInputError('elasticModulus')}
              required
              type='number'
              step='0.01'
              {...field}
            />
          )}
        />
        <Controller
          name='linearExpansion'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label='Коэффициент линейного расширения'
              status={getInputError('linearExpansion')}
              required
              type='number'
              step='0.1'
              {...field}
            />
          )}
        />
        <div className={'container__btn'}>
          <Button type='submit'>Сохранить</Button>
          <Button onClick={onClose}>Закрыть</Button>
        </div>
      </form>
    </Modal>
  );
};

export default memo(MaterialPropsModal);
