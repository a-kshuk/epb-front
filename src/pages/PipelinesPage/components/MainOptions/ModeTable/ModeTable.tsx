import React, { memo, useMemo } from 'react';
import { Button, Input, InputTag, Table } from '@/kits';
import { useAppDispatch, useAppSelector } from '@/hooks';
import ModeModal from '../ModeModal/ModeModal';
import { IWorkingMode } from '../../../redux';

import styles from '../MainOptions.modules.scss';

interface IModeTable extends Omit<IWorkingMode, 'id'> {
  title: string;
}

const MODE_TITLES: Record<keyof IModeTable, string> = {
  title: 'Название режима',
  temperature: 'Температура',
  pressure: 'Давление',
};

const ModeTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { workingModes } = useAppSelector((state) => state.pipelineMainOptions);

  return (
    <div className={styles.container__table}>
      <Table titles={MODE_TITLES} columns={workingModes} />
      <ModeModal />
    </div>
  );
};

export default memo(ModeTable);
