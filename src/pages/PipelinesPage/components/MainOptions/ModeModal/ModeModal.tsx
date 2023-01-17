import React, { memo, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, Input, Modal } from '@/kits';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { IWorkingMode, addWorkingMode } from '../../../redux';

import styles from '../MainOptions.modules.scss';

type IFormInput = Omit<IWorkingMode, 'id'>;

interface IProps {
  id?: number;
}

const WORKING_MODE = 'Режим работы №';
const ModeModal: React.FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const { workingModes } = useAppSelector((state) => state.pipelineMainOptions);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({ mode: 'onChange' });

  useEffect(() => {
    if (id) {
      const mode = workingModes.find((item) => item.id === id);
      if (mode) {
        setValue('title', mode.title);
        setValue('temperature', mode.temperature);
        setValue('pressure', mode.pressure);
      }
      return;
    }
    const searchParams = {
      isSearch: true,
      index: 1,
      value: `${WORKING_MODE}1`,
    };
    while (searchParams.isSearch) {
      const mode = workingModes.find(
        (item) => item.title === searchParams.value
      );
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
  }, [id, workingModes]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(addWorkingMode(data));
    setIsVisible(false);
  };

  const getInputError = (key: keyof IFormInput) => {
    if (errors[key]?.type === 'required') {
      return 'error';
    }
  };

  return (
    <React.Fragment>
      <Button onClick={() => setIsVisible(true)}>Добавить режим работы</Button>
      <Modal
        title={'Режим работы'}
        isVisible={isVisible}
        onClose={setIsVisible}
      >
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
    </React.Fragment>
  );
};

export default memo(ModeModal);
