import React, { useState } from 'react';
import { Input } from '../../../components';
import { Modal } from '@/kits';

interface IProps {
  createField: (text: string) => string | void;
}

const CreateField: React.FC<IProps> = ({ createField }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const onClose = () => {
    setIsVisible(false);
  };

  const onSave = () => {
    const checkError = !value ? 'Задайте параметр' : createField(value);
    if (checkError) {
      setError(checkError);
    } else {
      setIsVisible(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setValue(e.target.value);
  };

  return (
    <div>
      <button onClick={() => setIsVisible(true)}>Добавить</button>
      <Modal
        isVisible={isVisible}
        onClose={onClose}
        title='Добавить параметр к описанию'
        onSave={onSave}
      >
        <Input
          title='Название параметра'
          onChange={onChange}
          value={value}
          error={error}
        />
      </Modal>
    </div>
  );
};

export default CreateField;
