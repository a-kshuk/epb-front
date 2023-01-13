import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import styles from './Input.module.scss';

interface IProps {
  label?: string;
  input?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  secondLabel?: string;
  emptyText?: string;
  helperText?: string;
  imgScr?: string;
  status?: 'error' | 'success' | 'disabled';
}

const Input: React.FC<IProps> = (props) => {
  const { label, secondLabel, helperText, status, input, imgScr } = props;
  const helperTextElement = useMemo(() => {
    if (!helperText) {
      return null;
    }
    return <div className={styles.helper}>{helperText}</div>;
  }, [helperText]);

  const labelElement = useMemo(() => {
    if (!label && !secondLabel) {
      return null;
    }
    return (
      <div className={styles.container__label}>
        <strong className={styles.label}>{label}</strong>
        {secondLabel && (
          <strong className={styles.secondLabel}>{secondLabel}</strong>
        )}
      </div>
    );
  }, [label, secondLabel]);

  const iconElement = useMemo(() => {
    if (imgScr) {
      const mask = `url(${imgScr})`;
      return <div style={{ WebkitMaskImage: mask, mask }} />;
    }
    if (status === 'success' || status === 'error') {
      return <div className={styles.input__icon} />;
    }
    return null;
  }, [imgScr, status]);

  return (
    <div
      className={classNames(styles.container, {
        [styles.error]: status === 'error',
        [styles.success]: status === 'success',
        [styles.disabled]: status === 'disabled',
      })}
    >
      {labelElement}
      <div className={styles.input__container}>
        <input
          className={styles.input__text}
          placeholder='Введите значение'
          disabled={status === 'disabled'}
          {...input}
        />
        {iconElement}
      </div>
      {helperTextElement}
    </div>
  );
};

export default memo(Input);
