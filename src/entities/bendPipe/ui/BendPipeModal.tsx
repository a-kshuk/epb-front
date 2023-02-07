import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { Button, Dropdown, Input, Modal } from 'shared/ui';

import { IBendPipe, useStraightPipeList, setBendPipes } from '../model';

type IFormInput = Omit<IBendPipe, 'idElement'>;

interface IProps {
  pipe?: IBendPipe & { position: number };
  onClose: () => void;
}

const BendPipeModal: React.FC<IProps> = (props) => {
  const { pipe, onClose } = props;
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue } = useForm<IFormInput>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (pipe) {
      console.log(pipe);
      setValue('diameter', pipe.diameter);
      setValue('thickness', pipe.thickness);
      setValue('idMaterial', pipe.idMaterial);
      return;
    }
  }, [pipe]);

  const materials = useAppSelector((state) =>
    state.pipelineMaterial.materials.map(({ id, title }) => ({
      value: id,
      label: title,
    }))
  );

  const pipeList = useStraightPipeList();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const pipes = pipeList.map((el) => {
      if (el.idElement !== pipe?.idElement) {
        return el;
      }
      return {
        idElement: el.idElement,
        idMaterial: data.idMaterial ? +data.idMaterial : undefined,
        diameter: data.diameter ? +data.diameter : 0,
        thickness: data.thickness ? +data.thickness : 0,
      };
    });
    dispatch(setBendPipes(pipes));
    onClose();
  };

  return (
    <Modal
      isVisible={!!pipe}
      onClose={onClose}
      title={`Редактирование прямого участка №${pipe?.position}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={'gap20px'}>
        <Dropdown options={materials} {...register('idMaterial')} />
        <Input
          label='Диаметр (мм)'
          {...register('diameter')}
          onChange={() => null}
        />
        <Input
          label='Исполнительная толщина (мм)'
          {...register('thickness')}
          onChange={() => null}
        />
        <div className={'container__btn'}>
          <Button type='submit'>Сохранить</Button>
          <Button onClick={onClose}>Закрыть</Button>
        </div>
      </form>
    </Modal>
  );
};

export default BendPipeModal;
