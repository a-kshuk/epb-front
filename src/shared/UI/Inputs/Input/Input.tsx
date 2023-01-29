import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import styles from './Input.module.scss';

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  secondLabel?: string;
  emptyText?: string;
  helperText?: string;
  imgScr?: string;
  status?: 'error' | 'success';
}

type IRef = HTMLInputElement;

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<IRef, IProps>((props, ref) => {
  const {
    label,
    secondLabel,
    required,
    helperText = required ? 'Обязательное поле' : '',
    imgScr,
    disabled,
    status,
    ...otherProps
  } = props;

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
        <label className={styles.label}>
          {label}
          {required ? ' *' : null}
        </label>
        {secondLabel && (
          <strong className={styles.secondLabel}>{secondLabel}</strong>
        )}
      </div>
    );
  }, [label, secondLabel, required]);

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
        [styles.disabled]: disabled,
      })}
    >
      {labelElement}
      <div className={styles.input__container}>
        <input
          ref={ref}
          className={styles.input__text}
          placeholder='Введите значение'
          disabled={disabled}
          {...otherProps}
        />
        {iconElement}
      </div>
      {helperTextElement}
    </div>
  );
});

export default memo(Input);
