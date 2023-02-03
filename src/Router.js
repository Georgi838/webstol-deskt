import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import MenuMoneyPage from './pages//MainPagePages/MenuMoneyPage';
import UsersListPage from './pages/MainPagePages/UsersListPage';
import MonthReportPage from './pages/MainPagePages/MonthReportPage';


function Router() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
            <Route path='/' element={<AuthPage />}></Route>
            <Route path='/mainPage' element={<MainPage />}></Route>
            <Route path='/menuMoneyPage' element={<MenuMoneyPage />}></Route>
            <Route path='/usersListPage' element={<UsersListPage />}></Route>
            <Route path='/monthReport' element={<MonthReportPage />}></Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}

export default Router;