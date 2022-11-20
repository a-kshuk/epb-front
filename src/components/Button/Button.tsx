import React from 'react';

interface IProps {
  onClick: () => void;
}

const Button = (props: React.PropsWithChildren<IProps>) => {
  const { children, onClick } = props;
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
