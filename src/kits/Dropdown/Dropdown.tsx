import classNames from 'classnames';
import React, { memo, useEffect, useMemo, useState } from 'react';

import styles from './Dropdown.module.scss';

interface IProps<T extends string> {
  items: Record<T, string>;
  selectedKey: T;
  onChange: (key: T) => void;
}

const Dropdown = <T extends string>(props: IProps<T>): JSX.Element => {
  const { selectedKey, items, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onClose = () => setIsOpen(false);
    document.addEventListener('keydown', onClose, false);
    return () => {
      document.removeEventListener('keydown', onClose, false);
    };
  }, [isOpen]);

  const keys = useMemo(
    () => Object.keys(items).filter((key) => key !== selectedKey),
    [selectedKey]
  ) as Array<T>;

  const closeMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setIsOpen(false);
  };

  const contextMenu = useMemo(() => {
    if (!isOpen) {
      return null;
    }
    return (
      <React.Fragment>
        <div
          className={styles.context_menu}
          onClick={closeMenu}
          onContextMenu={closeMenu}
        />
        <div className={styles.selector}>
          {keys.map((key) => (
            <p
              key={key}
              onClick={() => {
                setIsOpen(false);
                onChange(key);
              }}
            >
              {items[key]}
            </p>
          ))}
        </div>
      </React.Fragment>
    );
  }, [isOpen, keys]);

  return (
    <div>
      <div className={styles.dropdown} onClick={() => setIsOpen(true)}>
        {items[selectedKey]}
        <div
          className={classNames(styles.arrow, { [styles.arrow__down]: isOpen })}
        />
      </div>
      {contextMenu}
    </div>
  );
};

export default memo(Dropdown) as typeof Dropdown;
