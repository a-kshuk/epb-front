import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import Tag, { ITagProps } from '../../Tag/Tag';

import styles from './InputTag.module.scss';

interface ITag extends Omit<ITagProps, 'color'> {
  color?: never;
}

interface IProps {
  label?: string;
  tags: ITag[];
  secondLabel?: string;
  emptyText?: string;
  helperText?: string;
  status?: 'error' | 'success';
}

const InputTag: React.FC<IProps> = (props) => {
  const { label, secondLabel, tags, helperText, status, emptyText } = props;
  const color = useMemo(() => {
    if (status === 'error') {
      return 'red';
    }
    if (status === 'success') {
      return 'green';
    }
  }, [status]);

  const labelElement = useMemo(() => {
    if (!label && !secondLabel) {
      return null;
    }
    return (
      <div className={styles.container__label}>
        <strong className={styles.label}>{label}</strong>
        {secondLabel && (
          <strong className={styles.secondLabel}>{secondLabel}</strong>
        )}
      </div>
    );
  }, [label, secondLabel]);

  const tagsElement = useMemo(() => {
    if (!tags?.length) {
      // return <Tag label='Нет данных' color={color || 'gray'} />;
      return (
        <strong className={styles.empty}>{emptyText || 'нет данных'}</strong>
      );
    }
    return (
      <React.Fragment>
        {tags.map((tagProps) => {
          const tag: ITagProps = tagProps as ITagProps;
          return <Tag key={tag.label} {...tag} color={color} />;
        })}
      </React.Fragment>
    );
  }, [tags]);

  const helperTextElement = useMemo(() => {
    if (!helperText) {
      return null;
    }
    return (
      <div className={styles.container__helper}>
        <div className={styles.container__helper__icon} />
        {helperText}
      </div>
    );
  }, [helperText]);

  return (
    <div
      className={classNames(
        styles.container,
        { [styles.container__error]: status === 'error' },
        { [styles.container__success]: status === 'success' }
      )}
    >
      {labelElement}
      <div className={styles.container__tags}>{tagsElement}</div>
      {helperTextElement}
    </div>
  );
};

export default memo(InputTag);
