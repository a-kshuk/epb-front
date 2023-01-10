import classNames from 'classnames';
import React, { memo } from 'react';

import styles from './TabBar.module.scss';

interface IProps {
  tabs: {
    label: string;
    onPress?: () => void;
    isSelected?: boolean;
  }[];
  logo?: JSX.Element;
  rightElement?: JSX.Element;
}

const TabBar: React.FC<IProps> = ({ logo, tabs }) => {
  return (
    <div className={styles.tab_bar}>
      <div className={styles.tab_bar__left}>
        {logo}
        <div className={styles.tab_bar__left__tabs}>
          {tabs.map(({ label, onPress, isSelected }) => (
            <div
              key={label}
              onClick={onPress}
              className={classNames(styles.tab, {
                [styles.tab__selected]: !!isSelected,
              })}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(TabBar);
