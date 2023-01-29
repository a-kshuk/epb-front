import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './Dropdown.module.scss';

interface IProps<T>
  extends Omit<
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    'value'
  > {
  options: { value: T; label: string }[];
  value?: T;
}
type IRef = HTMLSelectElement;

const Dropdown = <T extends string | number>(
  props: IProps<T>,
  ref: React.ForwardedRef<IRef>
) => {
  const { options, ...otherProps } = props;
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

  return (
    <div className={styles.select}>
      <select ref={ref} {...otherProps}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div
        className={classNames(styles.arrow, { [styles.arrow__down]: isOpen })}
      />
    </div>
  );
};

export default memo(React.forwardRef(Dropdown)) as typeof Dropdown;
