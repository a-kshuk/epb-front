import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import styles from './Tag.module.scss';

interface IProps {
  text: string;
  color?: 'gray' | 'purple' | 'red' | 'blue' | 'green' | 'yellow';
}

interface IRemoveProps extends IProps {
  onRemove: () => void;
  onPress?: never;
}

interface IPressProps extends IProps {
  onRemove?: never;
  onPress?: () => void;
}

export type ITagProps = IRemoveProps | IPressProps;

const Tag: React.FC<ITagProps> = (props) => {
  const { onRemove, onPress, text, color = 'purple' } = props;

  const removeIconElement = useMemo(() => {
    if (!onRemove) {
      return null;
    }
    return <div className={styles.icon__remove} />;
  }, [onRemove]);

  return (
    <div
      onClick={onRemove || onPress}
      className={classNames(
        styles.tag,
        { [styles.tag__remove]: !!onRemove },
        { [styles.tag__gray]: color === 'gray' },
        { [styles.tag__red]: color === 'red' },
        { [styles.tag__blue]: color === 'blue' },
        { [styles.tag__green]: color === 'green' },
        { [styles.tag__yellow]: color === 'yellow' }
      )}
    >
      {removeIconElement}
      {text}
    </div>
  );
};

export default memo(Tag);
