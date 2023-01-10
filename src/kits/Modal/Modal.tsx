import React from 'react';
import Button from '../Button/Button';
import './ModalStyle.scss';

interface IProps {
  title: string;
  isVisible: boolean;
  onClose: () => void;
  onSave?: () => void;
}

const Modal: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const { isVisible, title, children, onClose, onSave } = props;

  if (!isVisible) {
    return null;
  }

  return (
    <div className='modal'>
      <div className='modal__window'>
        <div className='modal__header'>
          <span className='modal__title'>{title}</span>
          <Button onClick={onClose}>X</Button>
        </div>
        <div className='modal__children'>{children}</div>
        <div className='modal__buttons'>
          {onSave && <button onClick={onSave}>Сохранить</button>}
          <Button onClick={onClose}>Закрыть</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
