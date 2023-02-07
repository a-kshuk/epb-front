import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import { NewsPageAsync } from '../pages/NewsPage/NewsPage.async';
import { SingInPageAsync } from '../pages/SingInPage/SingInPage.async';
import SingUpPage from '../pages/SingUpPage/SingUpPage';
import { NotFoundPageAsync } from '../pages/NotFoundPage/NotFoundPage.async';
import Layout from '../components/Layout/Layout';
import LogoutPage from '../pages/LogoutPage/LogoutPage';
import { PipelinesPageAsync } from '../pages/PipelinesPage/PipelinesPage.async';
import React, { Suspense } from 'react';

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/news' element={<NewsPageAsync />} />
            <Route path='/pipelines' element={<PipelinesPageAsync />} />
            <Route path='/sing-in' element={<SingInPageAsync />} />
            <Route path='/sing-up' element={<SingUpPage />} />
            <Route path='/logout' element={<LogoutPage />} />
            <Route path='*' element={<NotFoundPageAsync />} />
          </Route>
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
