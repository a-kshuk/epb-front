import React from 'react';
import classNames from 'classnames';
import styles from './ButtonIcon.module.scss';

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  imgScr: string;
  color?: 'red';
}

const Button: React.FC<IButtonProps> = (props) => {
  const { imgScr, color, className, ...otherProps } = props;

  const mask = `url(${imgScr})`;
  return (
    <button
      className={classNames(
        styles.button,
        { [styles.red]: color === 'red' },
        className
      )}
      style={{ WebkitMaskImage: mask, mask }}
      {...otherProps}
    />
  );
};

export default Button;
