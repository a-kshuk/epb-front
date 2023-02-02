import React, { memo, useMemo } from 'react';
import { Button, ButtonIcon, Table } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { IPipelineElement } from 'entities/pipelineElement';

import { ELEMENT_LABEL } from '../constants';

import {
  addThickness,
  moveDownThickness,
  moveUpThickness,
  removeThickness,
} from '../model';

const THICKNESS_TITLES = {
  moveUp: ' ',
  moveDown: ' ',
  number: '№ п/п',
  thickness: 'Толщина',
  remove: ' ',
  add: ' ',
};

interface IProps {
  pipeLineElement: IPipelineElement;
}

const PipelineElementTable: React.FC<IProps> = (props) => {
  const { pipeLineElement } = props;
  const dispatch = useAppDispatch();
  const thicknessList = useAppSelector(
    (state) => state.pipelineThickness.thicknessList
  );

  const list = useMemo(() => {
    const listElement = thicknessList?.filter(
      (el) => el.idElement === pipeLineElement.id
    );
    const length = listElement.length;
    listElement.sort((a, b) => a.position - b.position);

    return listElement.map((thickness) => ({
      moveUp: (
        <ButtonIcon
          imgScr='/images/arrow-circle-up.svg'
          disabled={thickness.position === 1}
          onClick={() => dispatch(moveUpThickness(thickness.id))}
        />
      ),
      moveDown: (
        <ButtonIcon
          imgScr='/images/arrow-circle-down.svg'
          disabled={thickness.position === length}
          onClick={() => dispatch(moveDownThickness(thickness.id))}
        />
      ),
      number: thickness.position,
      thickness: thickness.thickness,
      remove: (
        <ButtonIcon
          imgScr='/images/minus-circle.svg'
          color='red'
          onClick={() => dispatch(removeThickness(thickness.id))}
        />
      ),
      add: (
        <ButtonIcon
          imgScr='/images/add-circle.svg'
          color='red'
          onClick={() =>
            dispatch(
              addThickness({
                position: thickness.position + 1,
                thickness: thickness.thickness,
                idElement: thickness.idElement,
              })
            )
          }
        />
      ),
    }));
  }, [thicknessList, pipeLineElement.id]);

  if (!list.length) {
    return (
      <div className='gap5px'>
        <h5>
          Участок №{pipeLineElement.position}
          {' - '}
          {ELEMENT_LABEL[pipeLineElement.type]}
        </h5>
        <Button
          onClick={() =>
            dispatch(
              addThickness({
                position: 1,
                idElement: pipeLineElement.id,
                thickness: 0,
              })
            )
          }
        >
          Добавить толщину
        </Button>
      </div>
    );
  }

  return (
    <div className='gap5px'>
      <h5>
        Участок №{pipeLineElement.position}
        {' - '}
        {ELEMENT_LABEL[pipeLineElement.type]}
      </h5>
      <Table titles={THICKNESS_TITLES} rows={list} />
    </div>
  );
};

export default memo(PipelineElementTable);
