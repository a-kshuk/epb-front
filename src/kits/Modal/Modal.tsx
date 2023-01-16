import React, { memo } from 'react';
import Button, { IButtonProps } from '../Button/Button';
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
    closeButtonText = 'Закрыть',
    buttons = [],
  } = props;
  const setIsVisible = () => onClose(false);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__window}>
        <div className={styles.modal__header}>
          <h5 className={styles.modal__title}>{title}</h5>
          <div className={styles.modal__close} onClick={setIsVisible} />
        </div>
        <div className={styles.modal__children}>{children}</div>
        <div className={styles.modal__buttons}>
          {buttons.map((buttonPops, index) => (
            <Button key={index} {...buttonPops}></Button>
          ))}
          <Button onClick={setIsVisible}>{closeButtonText}</Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Modal);
