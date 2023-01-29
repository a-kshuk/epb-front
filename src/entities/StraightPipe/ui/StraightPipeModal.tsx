import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { Button, Dropdown, Input, Modal } from 'shared/ui';

import { IStraightPipe, useStraightPipeList, setPipes } from '../model';

type IFormInput = Omit<IStraightPipe, 'idElement'>;

interface IProps {
  pipe?: IStraightPipe & { position: number };
  onClose: () => void;
}

const StraightPipeModal: React.FC<IProps> = (props) => {
  const { pipe, onClose } = props;
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IFormInput>({ mode: 'onChange' });

  const materials = useAppSelector((state) =>
    state.pipelineMainOptions.materials.map(({ id, title }) => ({
      value: id,
      label: title,
    }))
  );

  const pipeList = useStraightPipeList();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const pipes = pipeList.map((el) => {
      if (el.idElement !== pipe?.idElement) {
        return {
          idElement: el.idElement,
          idMaterial: el.idMaterial,
          diameter: el.diameter,
        };
      }
      return {
        idElement: el.idElement,
        idMaterial: data.idMaterial ? +data.idMaterial : undefined,
        diameter: data.diameter ? +data.diameter : 0,
      };
    });
    dispatch(setPipes(pipes));
    onClose();
  };

  return (
    <Modal
      isVisible={!!pipe}
      onClose={onClose}
      title={`Редактирование прямого участка №${pipe?.position}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dropdown options={materials} {...register('idMaterial')} />
        <Input
          label='Диаметр'
          {...register('diameter')}
          onChange={() => null}
        />
        <Button type='submit'>Сохранить</Button>
        <Button onClick={onClose}>Закрыть</Button>
      </form>
    </Modal>
  );
};

export default StraightPipeModal;
