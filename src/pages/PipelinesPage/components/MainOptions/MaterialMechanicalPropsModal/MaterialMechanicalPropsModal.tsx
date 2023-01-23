import React, { memo, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Modal } from '@/shared/ui';
import { useAppDispatch } from '@/hooks';
import styles from '../MainOptions.modules.scss';
import {
  editMaterialMechanicalProps,
  IMaterialMechanicalProps,
} from '../../../redux';

type IFormInput = Omit<IMaterialMechanicalProps, 'idWorkMode' | 'idMaterial'>;

interface IProps {
  material: string;
  workMode: string;
  onClose: () => void;
  mechanicalProps?: IMaterialMechanicalProps;
}

const MechanicalPropsModal: React.FC<IProps> = (props) => {
  const { material, workMode, mechanicalProps, onClose } = props;
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({ mode: 'onChange' });

  useEffect(() => {
    if (mechanicalProps) {
      setValue('permissibleStresses', mechanicalProps.permissibleStresses);
      // setValue('ovality', mechanicalProps.ovality);
      setValue('elasticModulus', mechanicalProps.elasticModulus);
      return;
    }
  }, [mechanicalProps]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { permissibleStresses, elasticModulus } = data;
    dispatch(
      editMaterialMechanicalProps({
        ...(mechanicalProps as IMaterialMechanicalProps),
        permissibleStresses: +permissibleStresses,
        // ovality: +ovality,
        elasticModulus: +elasticModulus,
      })
    );
    onClose();
  };

  const getInputError = (key: keyof IFormInput) => {
    if (errors[key]?.type === 'required') {
      return 'error';
    }
  };

  return (
    <Modal
      title={`Свойства материала ${material}`}
      isVisible={!!mechanicalProps}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <Input label='Режим' value={workMode} disabled />
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
        {/* <Controller
          name='ovality'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label='Овальность'
              status={getInputError('ovality')}
              required
              type='number'
              step='0.01'
              {...field}
            />
          )}
        /> */}
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
        <div className={styles.container__button}>
          <Button type='submit'>Сохранить</Button>
          <Button onClick={onClose}>Закрыть</Button>
        </div>
      </form>
    </Modal>
  );
};

export default memo(MechanicalPropsModal);
