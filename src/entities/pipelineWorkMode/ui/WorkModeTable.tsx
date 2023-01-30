import React, { memo, useMemo, useState } from 'react';
import { Button, ButtonIcon, Table } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import WorkModeModal from './WorkModeModal';
import { IWorkMode, removeWorkMode } from '../model';

interface IModeTable extends Omit<IWorkMode, 'id'> {
  title: string;
  buttonEdit: string;
  buttonRemove: string;
}

const MODE_TITLES: Record<keyof IModeTable, string> = {
  title: 'Название режима',
  temperature: 'Температура',
  pressure: 'Давление',
  buttonEdit: ' ',
  buttonRemove: ' ',
};

const WorkWorkModeTable: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<IWorkMode | undefined>();
  const dispatch = useAppDispatch();
  const workModes = useAppSelector((state) => state.pipelineWorkMode.modes);

  const modes = useMemo(
    () =>
      workModes.map((mode) => ({
        ...mode,
        buttonEdit: (
          <ButtonIcon
            color='red'
            imgScr='/images/edit-2.svg'
            onClick={() => {
              setMode(mode);
              setIsVisible(true);
            }}
          />
        ),
        buttonRemove: (
          <ButtonIcon
            color='red'
            imgScr='/images/close-circle.svg'
            onClick={() => dispatch(removeWorkMode(mode.id))}
          />
        ),
      })),
    [workModes]
  );

  const tableElement = useMemo(
    () => (modes.length ? <Table titles={MODE_TITLES} rows={modes} /> : null),
    [modes]
  );

  return (
    <div className={'gap5px'}>
      {tableElement}
      <Button
        onClick={() => {
          setMode(undefined);
          setIsVisible(true);
        }}
      >
        Добавить режим работы
      </Button>
      <WorkModeModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        selectedMode={mode}
      />
    </div>
  );
};

export default memo(WorkWorkModeTable);
