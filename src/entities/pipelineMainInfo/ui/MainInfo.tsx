import React, { memo } from 'react';
import { Input } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { setTitle, setRegNumber, setLocation } from '../model';

const MainOptions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { title, regNumber, location } = useAppSelector(
    (state) => state.pipelineMainOptions
  );

  return (
    <React.Fragment>
      <Input
        label='Название трубопровода'
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
        required
      />
      <Input
        label='Регистрационный номер'
        value={regNumber}
        onChange={(e) => dispatch(setRegNumber(e.target.value))}
        required
      />
      <Input
        label='Местоположение'
        value={location}
        onChange={(e) => dispatch(setLocation(e.target.value))}
        required
      />
    </React.Fragment>
  );
};

export default memo(MainOptions);
