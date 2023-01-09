import React, { useMemo, useState } from 'react';
import { Button, Input, InputTag } from '@/components';

interface IWorkingMode {
  temperature: number;
  pressure: string;
}

interface IMaterial {
  title: string;
  workingModes: IWorkingMode[];
  IOperatingTime: number;
}

const Material = () => {
  const [material, setMaterial] = useState<string>('');
  const [materials, setMaterials] = useState<string[]>([]);

  const error = useMemo(() => {
    if (!material) {
      return 'Введите значение';
    }
    if (materials.find((value) => value === material)) {
      return 'Такой материал уже существует';
    }
    return '';
  }, [material, materials]);

  const addMaterial = () => {
    if (error) {
      return;
    }
    setMaterials([...materials, material]);
    setMaterial('');
  };

  const removeMaterial = (index: number) => {
    const newMaterials = [...materials];
    if (index) {
      newMaterials.splice(index, index);
    } else {
      newMaterials.shift();
    }
    setMaterials(newMaterials);
  };

  const tags = useMemo(
    () =>
      materials.map((label, index) => ({
        label,
        onRemove: () => removeMaterial(index),
      })),
    [materials]
  );

  return (
    <div>
      <Input
        title={'Материал:'}
        onChange={(e) => setMaterial(e.target.value)}
        value={material}
        error={error}
      />
      <Button onClick={addMaterial}>Добавить материал</Button>
      <InputTag label={'Список материалов:'} tags={tags} />
    </div>
  );
};

export default Material;
