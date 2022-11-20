import React, { useMemo } from 'react';
import './InputStyle.scss';

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title: string;
  error?: string;
}

const Input: React.FC<IProps> = (props) => {
  const { title, error, ...otherProps } = props;

  const renderError = useMemo(() => {
    if (!error) return null;
    return <p className='input__error'>{error}</p>;
  }, [error]);

  return (
    <div className='input'>
      <p className='input__title'>{title}</p>
      <input {...otherProps} />
      {renderError}
    </div>
  );
};

export default Input;
