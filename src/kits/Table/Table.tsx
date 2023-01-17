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
        </tr>
      </thead>
      <tbody>
        {columns.map((column, index) => (
          <tr key={index}>
            {keys.map((key) => (
              <td key={`${key} ${index}`}>{column[key]}</td>
            ))}
          </tr>
        ))}
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
