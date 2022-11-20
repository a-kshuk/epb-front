import React, { useImperativeHandle, useState } from 'react';
import './ContextMenu.scss';

export interface IItemMenu {
  title: string;
  onPress: () => void;
}

interface IProps {
  items: IItemMenu[];
  onLeftClick?: () => void;
}

export interface IContextMenuRef {
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
// TODO: Возможно нужно сделать глобальным объектом
const ContextMenu = React.forwardRef<IContextMenuRef, IProps>((props, ref) => {
  const { items, onLeftClick } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({ handleClick }));

  const closeMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setIsOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    switch (event.nativeEvent.button) {
      case 0:
        if (onLeftClick) {
          onLeftClick();
        }
        break;
      case 2:
        setPos({ x: event.pageX, y: event.pageY });
        setIsOpen(true);
        break;
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={closeMenu}
      onContextMenu={closeMenu}
      className='context-menu no-selected'
    >
      <ul
        className='context-menu__list'
        style={{ top: `${pos.y}px`, left: `${pos.x}px` }}
      >
        {items.map(({ onPress, title }) => (
          <li
            key={title}
            onClick={() => {
              onPress();
              setIsOpen(false);
            }}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ContextMenu;
