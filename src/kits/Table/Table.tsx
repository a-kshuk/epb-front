import React, { useEffect, useMemo } from 'react';

import styles from './Table.module.scss';

interface IProps<T extends Record<string, string>> {
  titles: T;
  columns: Record<keyof T, React.ReactNode>[];
}

const Table = <T extends Record<string, string>>(
  props: IProps<T>
): JSX.Element => {
  const { columns, titles } = props;
  const keys = useMemo(() => Object.keys(titles), [titles]);
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={`${key} title`} scope='col'>
              {titles[key]}
            </th>
          ))}
          {/* <th scope='col'>Название материала</th>
          <th scope='col'>Режим работы</th>
          <th scope='col'>Номинальное допускаемое напряжение</th>
          <th scope='col'>Модуль упругости</th> */}
        </tr>
      </thead>
      <tbody>
        {keys.map((key) => (
          <tr key={key}>
            {columns.map((column, index) => (
              <td key={`${key} ${index}`}>{column[key]}</td>
            ))}
          </tr>
        ))}
        {/* <tr>
          <td>183</td>
          <td>Название материал</td>
          <td>Название режима</td>
          <td>1.99</td>
        </tr>
        <tr>
          <td>183</td>
          <td>Название материал</td>
          <td>Название режима</td>
          <td>1.99</td>
        </tr>
        <tr>
          <td>183</td>
          <td>Название материал</td>
          <td>Название режима</td>
          <td>1.99</td>
        </tr>
        <tr>
          <td>183</td>
          <td>Название материал</td>
          <td>Название режима</td>
          <td>1.99</td>
        </tr> */}
      </tbody>
      {/* <tfoot>
        <tr>
          <th scope='row' colSpan={2}>
            Total albums
          </th>
          <td>77</td>
        </tr>
      </tfoot> */}
    </table>
  );
};

export default Table;
