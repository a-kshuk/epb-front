import React, { memo, useMemo } from 'react';
import ButtonIcon from '../Buttons/ButtonIcon/ButtonIcon';
import Button, { IButtonProps } from '../Buttons/Button/Button';
import styles from './Modal.module.scss';

interface IProps {
  title: string;
  isVisible: boolean;
  onClose: (isVisible: false) => void;
  closeButtonText?: string;
  buttons?: IButtonProps[];
}

const Modal: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const {
    isVisible,
    title,
    children,
    onClose,
    closeButtonText,
    buttons = [],
  } = props;
  const setIsVisible = () => onClose(false);

  if (!isVisible) {
    return null;
  }

  const buttonsElement = useMemo(() => {
    if (!buttons.length && !closeButtonText) {
      return null;
    }
    return (
      <div className={styles.modal__buttons}>
        {buttons.map((buttonPops, index) => (
          <Button key={index} {...buttonPops}></Button>
        ))}
        {closeButtonText ? (
          <Button onClick={setIsVisible}>{closeButtonText}</Button>
        ) : null}
      </div>
    );
  }, [buttons, closeButtonText]);

  return (
    <div className={styles.modal}>
      <div className={styles.modal__window}>
        <div className={styles.modal__header}>
          <label className={styles.modal__title}>{title}</label>
          <ButtonIcon
            color='red'
            imgScr='/images/close-circle.svg'
            onClick={setIsVisible}
          />
        </div>
        <div className={styles.modal__children}>{children}</div>
        {buttonsElement}
      </div>
    </div>
  );
};

export default memo(Modal);
