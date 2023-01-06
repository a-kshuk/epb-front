import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
// import { ReactComponent as SuccessSvg } from './images/tick-square.svg';

import styles from './InputBig.module.scss';

interface IInputProps {
  label: string;
  input?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  image?: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  secondaryLabel?: string;
  placeholder?: string;
  helperText?: string;
  status?: 'disable' | 'error' | 'success';
}

const InputBig: React.FC<IInputProps> = (props) => {
  const { label, secondaryLabel, input: inputProps, image, status } = props;
  const isSuccess = useMemo(() => status === 'success', [status]);
  const isError = useMemo(() => status === 'error', [status]);
  const isDisable = useMemo(() => status === 'disable', [status]);

  const SecondLabelElement = useMemo(() => {
    if (!secondaryLabel) {
      return null;
    }
    return <strong className={styles.label}>{secondaryLabel}</strong>;
  }, []);

  const ImageElement = useMemo(() => {
    if (isError) {
      return (
        <div className={styles.icon}>
          {/* <SuccessSvg /> */}
          <img
            src='/images/warning-2.svg'
            // className={classNames(styles.icon)}
          />
        </div>
      );
    }
    if (status === 'success') {
      return (
        <img
          src='/images/tick-square.svg'
          className={classNames(styles.icon, styles.green)}
        />
      );
    }
    if (image) {
      return (
        <img
          {...image}
          className={classNames(styles.icon, {
            [image?.className || '']: !image?.className,
          })}
        />
      );
    }
    return null;
  }, [status]);

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
          {ImageElement}
          {/* <image /> */}
        </div>
      </div>
      <strong
        className={classNames(
          styles.helper,
          { [styles.helper__error]: isError },
          { [styles.helper__success]: isSuccess }
        )}
      >
        Helper text
      </strong>
    </div>
  );
};

export default memo(InputBig);
