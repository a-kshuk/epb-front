import React, { memo, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Modal } from '@/kits';
import { useAppDispatch } from '@/hooks';
import { addMaterial, editMaterial, IMaterial } from '../../../redux';

import styles from '../MainOptions.modules.scss';

type IFormInput = Omit<IMaterial, 'id'>;

interface IProps {
  isVisible: boolean;
  setIsVisible: (isVisible: false) => void;
  material?: IMaterial;
}

const MaterialModal: React.FC<IProps> = (props) => {
  const { material, isVisible, setIsVisible } = props;
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({ mode: 'onChange' });

  useEffect(() => {
    if (material) {
      setValue('title', material.title);
      return;
    }
    setValue('title', '');
  }, [material]);

  const onSubmit: SubmitHandler<IFormInput> = ({ title }) => {
    material
      ? dispatch(editMaterial({ id: material.id, title }))
      : dispatch(addMaterial(title));
    setIsVisible(false);
  };

  const getInputError = (key: keyof IFormInput) => {
    if (errors[key]?.type === 'required') {
      return 'error';
    }
  };

  return (
    <Modal
      title={material ? 'Редактирование материала' : 'Создание материала'}
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
        <div className={styles.container__button}>
          <Button type='submit'>Сохранить</Button>
          <Button onClick={() => setIsVisible(false)}>Закрыть</Button>
        </div>
      </form>
    </Modal>
  );
};

export default memo(MaterialModal);
