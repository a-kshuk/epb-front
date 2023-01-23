import React, { memo } from 'react';
import classNames from 'classnames';

import styles from './TabBar.module.scss';

interface IProps {
  selectedTab: string;
  onChangeTab: (tab: string) => void;
  tabs: string[];
  rightElement?: JSX.Element;
}

const TabBar: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const { tabs, onChangeTab, selectedTab, rightElement, children } = props;
  return (
    <React.Fragment>
      <div className={styles.tab_bar}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => onChangeTab(tab)}
              className={classNames(styles.tab, {
                [styles.tab__selected]: selectedTab === tab,
              })}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className={styles.right_element}>{rightElement}</div>
      </div>
      <div className={styles.container_children}>{children}</div>
    </React.Fragment>
  );
};

export default memo(TabBar);
