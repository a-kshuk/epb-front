import { memo, useMemo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import styles from './Layout.module.scss';

const Layout = () => {
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
      <div className={styles.header__tabs}>
        <NavLink className={styles.tab} to='sing-in' title='Войти'>
          Войти
        </NavLink>
        <NavLink className={styles.tab} to='sing-up' title='Регистрация'>
          Регистрация
        </NavLink>
      </div>
    );
  }, [isAuthorization]);

  const labelComponent = useMemo(() => {
    return (
      <NavLink className={styles.logo} to='/'>
        <span />
        <strong className={styles.logo__text}>ЭПБ</strong>
      </NavLink>
    );
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          {labelComponent}
          <div className={styles.header__tabs}>
            <NavLink className={styles.tab} to='/'>
              Главная
            </NavLink>
            <NavLink className={styles.tab} to='/news'>
              Новости
            </NavLink>
            <NavLink className={styles.tab} to='/pipelines'>
              Трубопроводы
            </NavLink>
          </div>
        </div>
        {rightComponent}
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>footer</footer>
    </>
  );
};

export default memo(Layout);
