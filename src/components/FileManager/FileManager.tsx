import React, { useMemo } from 'react';
import Folder, { IFolder } from './Folder/Folder';
import Item, { IItem } from './Item/Item';
import styles from './FileManager.module.scss';

interface IFileManagerProps {
  items?: IItem[];
  folders?: IFolder[];
  children: React.ReactNode;
}

const FileManager: React.FC<IFileManagerProps> = ({
  items,
  folders,
  children,
}) => {
  const renderItems = useMemo(
    () => items?.map((item) => <Item key={item.title} {...item} />),
    [items]
  );
  const renderFolders = useMemo(
    () => folders?.map((folder) => <Folder key={folder.title} {...folder} />),
    [folders]
  );

  return (
    <div className={styles.file_manager}>
      <div className={styles.file_manager__files}>
        {renderFolders}
        {renderItems}
      </div>
      <div className={styles.file_manager__children}>{children}</div>
      {/* {children} */}
    </div>
  );
};

export default FileManager;
