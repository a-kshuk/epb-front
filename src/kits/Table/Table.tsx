import React, { useMemo } from 'react';

import styles from './Table.module.scss';

interface IProps<T extends Record<string, string>> {
  titles: T;
  rows: Record<keyof T, React.ReactNode>[];
}

const Table = <T extends Record<string, string>>(
  props: IProps<T>
): JSX.Element => {
  const { rows, titles } = props;
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
        {rows.map((row, index) => (
          <tr key={index}>
            {keys.map((key) => (
              <td key={`${key} ${index}`}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      {/* <tfoot>
        <tr>
          <td colSpan={keys.length}> Нет данных</td>
        </tr>
      </tfoot> */}
    </table>
  );
};

export default Table;
