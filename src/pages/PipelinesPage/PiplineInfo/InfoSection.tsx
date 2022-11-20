import React, { useState } from 'react';
import { Button, Input } from '../../../components';
import CreateField from './CreateField';
import Material from './Material';

interface IProps {
  title: string;
}

interface IItem {
  title: string;
  value?: string;
}

const defaultItems: IItem[] = [];

const InfoSection: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const { title, children } = props;
  const [items, setItems] = useState<IItem[]>(defaultItems);
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0);
  const [workingTime, setWorkingTime] = useState<number>(0);

  const addItem = (newTitle: string): string | void => {
    const checkItem = items.find((field) => field.title === newTitle);
    if (checkItem) {
      return 'Такой параметр уже существует';
    }
    setItems((prev) => {
      return [...prev, { title: newTitle, value: '' }];
    });
  };

  const removeItem = (index: number) => {
    setItems((prev) => {
      const newItems = [...prev];
      if (index) {
        newItems.splice(index, index);
      } else {
        newItems.shift();
      }
      return newItems;
    });
  };

  const onChangeItem = (value: string, index: number) => {
    setItems((prev) => {
      prev[index].value = value;
      return prev;
    });
  };

  return (
    <section className='info'>
      <h2>{title}</h2>

      <Input
        title={'Название трубопровода:'}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <Input
        title={'Регистрационный номер:'}
        onChange={(e) => setNumber(e.target.value)}
        value={number}
      />

      <Input
        title={'Местонахождение:'}
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />

      <Material />

      <Input
        title={'Температура:'}
        type='number'
        onChange={(e) => setTemperature(+e.target.value)}
        value={temperature}
      />

      <Input
        title={'Выработка (ч):'}
        type='number'
        onChange={(e) => setWorkingTime(+e.target.value)}
        value={workingTime}
      />

      {items.map((field, index) => (
        <div key={index + field.title}>
          <Input
            title={field.title + ':'}
            onChange={(e) => onChangeItem(e.target.value, index)}
            value={field.value}
          />
          <Button onClick={() => removeItem(index)}>Удалить</Button>
        </div>
      ))}
      {children}
      <CreateField createField={addItem} />
    </section>
  );
};

export default InfoSection;
