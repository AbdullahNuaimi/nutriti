import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import './App.css';
import Header from './components/core/header/header.component';
import AddProgram from './pages/add-program/add-program.page';
import Main from './pages/main/main.page';
import ManageFood from './pages/manage-food/manage-food.page';
import ViewPrograms from './pages/view-programs/view-programs.page';
import Login from './pages/login/login.page';
import NotFound from './pages/not-found/not-found.page';
function App() {
  return (
    <div>
      <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#16697a'
            },
        }}
      >
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path='/NewDietProgram' element={<AddProgram/>}/>
          <Route path='/ManageFoodTable' element={<ManageFood/>}/>
          <Route path='/ViewExistingPrograms' element={<ViewPrograms/>}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
    </div>
  );
}

export default App;
