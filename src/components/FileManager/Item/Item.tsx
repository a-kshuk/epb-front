import React, { useRef } from 'react';
import ContextMenu, {
  IContextMenuRef,
  IItemMenu,
} from '../../ContextMenu/ContextMenu';

export interface IItem {
  parentId?: number;
  id: number;
  title: string;
  onPress: () => void;
}

type IProps = IItem;

const Item: React.FC<IProps> = ({ title, onPress }) => {
  const contextMenuRef = useRef<IContextMenuRef>(null);
  const contextItems: IItemMenu[] = [
    { title: 'Переименовать', onPress: () => console.log('Переименовать') },
    { title: 'Удалить', onPress: () => console.log('Удалить папку') },
  ];

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    contextMenuRef.current?.handleClick(e);
  };

  return (
    <div>
      <ContextMenu
        ref={contextMenuRef}
        items={contextItems}
        onLeftClick={onPress}
      />
      <div
        className='file-manager__item'
        onClick={onClick}
        onContextMenu={onClick}
      >
        {title}
      </div>
    </div>
  );
};

export default Item;
