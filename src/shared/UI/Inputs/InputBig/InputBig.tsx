import React, { memo, useMemo } from 'react';
import classNames from 'classnames';

import styles from './InputBig.module.scss';

interface IInputProps {
  label: string;
  input?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  secondLabel?: string;
  helperText?: string;
  status?: 'disable' | 'error' | 'success';
}

const InputBig: React.FC<IInputProps> = (props) => {
  const { label, secondLabel, input: inputProps, status, helperText } = props;
  const isSuccess = useMemo(() => status === 'success', [status]);
  const isError = useMemo(() => status === 'error', [status]);
  const isDisable = useMemo(() => status === 'disable', [status]);

  const SecondLabelElement = useMemo(() => {
    if (!secondLabel) {
      return null;
    }
    return <strong className={styles.label}>{secondLabel}</strong>;
  }, [secondLabel]);

  const HelperTextElement = useMemo(() => {
    if (!helperText) {
      return null;
    }
    return (
      <div
        className={classNames(
          styles.helper,
          { [styles.helper__error]: isError },
          { [styles.helper__success]: isSuccess }
        )}
      >
        {helperText}
      </div>
    );
  }, [helperText, isError, isSuccess]);

  return (
    <div className={styles.container}>
      <div
        className={classNames(
          styles.container_input,
          { [styles.container_input__error]: isError },
          { [styles.container_input__success]: isSuccess },
          { [styles.container_input__disable]: isDisable }
        )}
      >
        <div className={styles.container_fields}>
          <div className={styles.label}>{label}</div>
          {SecondLabelElement}
        </div>
        <div className={styles.container_fields}>
          <input
            className={classNames(
              styles.input,
              { [styles.input__error]: isError },
              { [styles.input__success]: isSuccess },
              { [styles.input__disable]: isDisable }
            )}
            placeholder='Введите значение'
            disabled={isDisable}
            {...inputProps}
          />
          <div
            className={classNames(
              { [styles.icon__error]: isError },
              { [styles.icon__success]: isSuccess }
            )}
          />
        </div>
      </div>
      {HelperTextElement}
    </div>
  );
};

export default memo(InputBig);
