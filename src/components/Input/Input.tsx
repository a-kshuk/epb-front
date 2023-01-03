import React, { memo, useMemo } from 'react';
import styles from './InputStyle.module.scss';

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
    return <p className={styles.input__error}>{error}</p>;
  }, [error]);

  return (
    <div className={styles.input}>
      <p className={styles.input__title}>{title}</p>
      <input {...otherProps} />
      {renderError}
    </div>
  );
};

export default memo(Input);
