import React, { useMemo, useRef, useState } from 'react';
import ContextMenu, {
  IContextMenuRef,
  IItemMenu,
} from '../../ContextMenu/ContextMenu';
import Item, { IItem } from '../Item/Item';

export interface IFolder {
  parentId?: number;
  id: number;
  title: string;
  folders?: IFolder[];
  items?: IItem[];
}

type IProps = IFolder;

const Folder: React.FC<IProps> = ({ title, folders, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const src = isOpen ? '/images/open_folder.png' : '/images/close_folder.png';

  const contextMenuRef = useRef<IContextMenuRef>(null);
  const renderItems = useMemo(
    () => items?.map((item) => <Item key={item.title} {...item} />),
    [items]
  );

  const renderFolders = useMemo(
    () => folders?.map((folder) => <Folder key={folder.title} {...folder} />),
    [folders]
  );

  const renderOpenFolder = useMemo(() => {
    if (!isOpen) {
      return null;
    }
    return (
      <div className='file-manager__item__children'>
        {renderFolders}
        {renderItems}
      </div>
    );
  }, [renderFolders, renderItems, isOpen]);

  const contextItems: IItemMenu[] = [
    { title: 'Создать папку', onPress: () => console.log('Создать папку') },
    {
      title: 'Создать трубопровод',
      onPress: () => console.log('Создать трубопровод'),
    },
    { title: 'Переименовать', onPress: () => console.log('Переименовать') },
    { title: 'Удалить папку', onPress: () => console.log('Удалить папку') },
  ];

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    contextMenuRef.current?.handleClick(e);
  };

  return (
    <div>
      <ContextMenu
        ref={contextMenuRef}
        items={contextItems}
        onLeftClick={() => setIsOpen((prev) => !prev)}
      />
      <div
        className='file-manager__item'
        onClick={onClick}
        onContextMenu={onClick}
      >
        <img src={src} className='file-manager__item__image' />
        <div className='file-manager__title'>{title}</div>
      </div>
      {renderOpenFolder}
    </div>
  );
};

export default Folder;
