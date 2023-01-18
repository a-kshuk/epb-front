import React, { memo, useMemo, useState } from 'react';
import { Button, ButtonIcon, Table } from '@/kits';
import { useAppDispatch, useAppSelector } from '@/hooks';
import ModeModal from '../ModeModal/ModeModal';
import { IWorkMode, removeWorkMode } from '../../../redux';

import styles from '../MainOptions.modules.scss';

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

const ModeTable: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<IWorkMode | undefined>();
  const dispatch = useAppDispatch();
  const { workModes } = useAppSelector((state) => state.pipelineMainOptions);

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
    <div className={styles.container__table}>
      {tableElement}
      <Button
        onClick={() => {
          setMode(undefined);
          setIsVisible(true);
        }}
      >
        Добавить режим работы
      </Button>
      <ModeModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        selectedMode={mode}
      />
    </div>
  );
};

export default memo(ModeTable);
