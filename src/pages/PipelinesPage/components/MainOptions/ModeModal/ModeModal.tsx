import React, { memo, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, Input, Modal } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { IWorkMode, addWorkMode, editWorkMode } from '../../../redux';

import styles from '../MainOptions.modules.scss';

type IFormInput = Omit<IWorkMode, 'id'>;

interface IProps {
  selectedMode?: IWorkMode;
  isVisible: boolean;
  setIsVisible: (isVisible: false) => void;
}

const WORKING_MODE = 'Режим работы №';
const ModeModal: React.FC<IProps> = ({
  selectedMode,
  isVisible,
  setIsVisible,
}) => {
  const dispatch = useAppDispatch();
  const { workModes } = useAppSelector((state) => state.pipelineMainOptions);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({ mode: 'onChange' });

  useEffect(() => {
    if (selectedMode) {
      setValue('title', selectedMode.title);
      setValue('temperature', selectedMode.temperature);
      setValue('pressure', selectedMode.pressure);
      return;
    }
    const searchParams = {
      isSearch: true,
      index: 1,
      value: `${WORKING_MODE}1`,
    };
    while (searchParams.isSearch) {
      const mode = workModes.find((item) => item.title === searchParams.value);
      if (mode) {
        searchParams.value = WORKING_MODE + searchParams.index;
        searchParams.index++;
      } else {
        searchParams.isSearch = false;
      }
    }
    setValue('title', searchParams.value);
    setValue('temperature', 20);
    setValue('pressure', 1);
  }, [selectedMode, workModes]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    selectedMode
      ? dispatch(editWorkMode({ id: selectedMode.id, ...data }))
      : dispatch(addWorkMode(data));
    setIsVisible(false);
  };

  const getInputError = (key: keyof IFormInput) => {
    if (errors[key]?.type === 'required') {
      return 'error';
    }
  };

  return (
    <Modal title={'Режим работы'} isVisible={isVisible} onClose={setIsVisible}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <Controller
          name='title'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label='Название режима'
              status={getInputError('title')}
              required
              {...field}
            />
          )}
        />
        <Controller
          name='temperature'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label='Температура'
              status={getInputError('temperature')}
              required
              type='number'
              {...field}
            />
          )}
        />
        <Controller
          name='pressure'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label='Давление'
              status={getInputError('pressure')}
              required
              type='number'
              {...field}
            />
          )}
        />
        <div className={styles.container__button}>
          <Button type='submit'>Сохранить</Button>
          <Button onClick={() => setIsVisible(false)}>Закрыть</Button>
        </div>
      </form>
    </Modal>
  );
};

export default memo(ModeModal);
