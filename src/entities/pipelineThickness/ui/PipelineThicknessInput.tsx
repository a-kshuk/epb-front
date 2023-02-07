import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'shared/ui';
import { IThickness, changeThickness } from '../model';

const PipelineThicknessInput: React.FC<IThickness> = (props) => {
  const dispatch = useDispatch();
  const { thickness } = props;

  return (
    <Input
      value={thickness || ''}
      onChange={(e) =>
        dispatch(changeThickness({ ...props, thickness: +e.target.value }))
      }
      type='number'
    />
  );
};

export default memo(PipelineThicknessInput);
