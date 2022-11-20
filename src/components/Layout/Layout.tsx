import { memo, useMemo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import './Layout.scss';

const Layout = memo(() => {
  const isAuthorization = useAppSelector(
    (state) => state?.authorization?.isAuthorization
  );

  const rightComponent = useMemo(() => {
    if (isAuthorization) {
      return (
        <div>
          <NavLink to='/logout'>Выйти</NavLink>
        </div>
      );
    }
    return (
      <div>
        <NavLink className='header__link__button' to='sing-in' title='Войти'>
          Войти
        </NavLink>
        <NavLink to='sing-up' title='Регистрация'>
          Регистрация
        </NavLink>
      </div>
    );
  }, [isAuthorization]);

  return (
    <>
      <header className='header'>
        <div>
          <NavLink className='header__link__button' to='/'>
            Главная
          </NavLink>
          <NavLink className='header__link__button' to='/news'>
            Новости
          </NavLink>
          <NavLink className='header__link__button' to='/pipelines'>
            Трубопроводы
          </NavLink>
        </div>
        {rightComponent}
      </header>

      <main className='main'>
        <Outlet />
      </main>

      <footer className='footer'>footer</footer>
    </>
  );
});

export default Layout;
