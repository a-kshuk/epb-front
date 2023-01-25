import React, { memo, useMemo } from 'react';
import { Button, ButtonIcon, Dropdown, Table } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { ELEMENT_LABEL } from '../constants';

import {
  addElement,
  changeTypeElement,
  moveDownElement,
  moveUpElement,
  removeElement,
} from '../model';

const THICKNESS_TITLES = {
  moveUp: ' ',
  moveDown: ' ',
  number: '№ элемента',
  typePipeline: 'Тип элемента',
  remove: ' ',
  add: ' ',
};

const PipelineElementTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { elements } = useAppSelector((state) => state.pipelineElements);

  const list = useMemo(() => {
    const length = elements.length;
    const listElement = [...elements];
    listElement.sort((a, b) => a.position - b.position);

    return listElement.map((element) => ({
      moveUp: (
        <ButtonIcon
          imgScr='/images/arrow-circle-up.svg'
          disabled={element.position === 1}
          onClick={() => dispatch(moveUpElement(element.position))}
        />
      ),
      moveDown: (
        <ButtonIcon
          imgScr='/images/arrow-circle-down.svg'
          disabled={element.position === length}
          onClick={() => dispatch(moveDownElement(element.position))}
        />
      ),
      number: element.position,
      typePipeline: (
        <Dropdown
          items={ELEMENT_LABEL}
          selectedKey={element.type}
          onChange={(type) =>
            dispatch(
              changeTypeElement({
                position: element.position,
                type: type,
              })
            )
          }
        />
      ),
      remove: (
        <ButtonIcon
          imgScr='/images/minus-circle.svg'
          color='red'
          onClick={() => dispatch(removeElement(element.position))}
        />
      ),
      add: (
        <ButtonIcon
          imgScr='/images/add-circle.svg'
          color='red'
          onClick={() =>
            dispatch(
              addElement({
                position: element.position + 1,
                type: element.type,
              })
            )
          }
        />
      ),
    }));
  }, [elements]);

  if (!elements.length) {
    return (
      <Button
        onClick={() => dispatch(addElement({ position: 1, type: 'bend' }))}
      >
        Добавить элемент трубопровода
      </Button>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <div>
        <Table titles={THICKNESS_TITLES} rows={list} />
      </div>
    </div>
  );
};

export default memo(PipelineElementTable);
