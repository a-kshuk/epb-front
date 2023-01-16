import React, { memo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input, InputTag, Table, Modal } from '@/kits';

interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: { label: string; value: string };
}

const ModeModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <React.Fragment>
      <Button onClick={() => setIsVisible(true)}>Добавить режим работы</Button>
      <Modal
        title={'Режим работы'}
        isVisible={isVisible}
        onClose={setIsVisible}
      ></Modal>
    </React.Fragment>
  );
};

export default memo(ModeModal);
