import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  imgScr: string;
  children: string;
}

interface ITextProps extends Omit<IProps, 'imgScr'> {
  imgScr?: never;
}

interface IImgProps extends Omit<IProps, 'children'> {
  children?: never;
}

export type IButtonProps = IProps | ITextProps | IImgProps;

const Button: React.FC<IProps | ITextProps | IImgProps> = (props) => {
  const { children, imgScr, ...otherProps } = props;

  const iconElement = useMemo(() => {
    if (!imgScr) {
      return null;
    }
    const mask = `url(${imgScr})`;
    return <span style={{ WebkitMaskImage: mask, mask }} />;
  }, [imgScr]);

  return (
    <button
      className={classNames(
        styles.button,
        { [styles.button__icon]: !children && !!imgScr },
        { [styles.button__icon__text]: !!children && !!imgScr }
      )}
      {...otherProps}
    >
      {children}
      {iconElement}
    </button>
  );
};

export default Button;
