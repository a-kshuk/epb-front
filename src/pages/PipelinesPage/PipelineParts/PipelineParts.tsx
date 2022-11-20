import React from 'react';

const PipelineParts = () => {
  return (
    <section className='pipeline_parts'>
      <h2>Толщинометрия</h2>
      {/* {items.map((field, index) => (
        <div key={index + field.title}>
          <Input
            title={field.title + ':'}
            onChange={(e) => onChangeItem(e.target.value, index)}
            value={field.value}
          />
          <Button onClick={() => removeItem(index)}>Удалить</Button>
        </div>
      ))}
      {children} */}
      {/* <CreateField createField={addItem} /> */}
    </section>
  );
};

export default PipelineParts;
