import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import NewsPage from '../pages/NewsPage/NewsPage';
import SingInPage from '../pages/SingInPage/SingInPage';
import SingUpPage from '../pages/SingUpPage/SingUpPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import Layout from '../components/Layout/Layout';
import LogoutPage from '../pages/LogoutPage/LogoutPage';
import PipelinesPage from '../pages/PipelinesPage/PipelinesPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/pipelines' element={<PipelinesPage />} />
        <Route path='/sing-in' element={<SingInPage />} />
        <Route path='/sing-up' element={<SingUpPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
