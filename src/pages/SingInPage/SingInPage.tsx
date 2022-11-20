import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { login } from '../../features/authorization/authorizationSlice';

function SingInPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onLogin = () => {
    dispatch(login({ firstName: 'Вася', secondName: 'Пупкин' }));
    navigate(-1);
  };
  return (
    <div>
      <button onClick={onLogin}>Войти</button>
    </div>
  );
}

export default SingInPage;
