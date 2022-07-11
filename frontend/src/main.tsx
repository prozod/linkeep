//native
import React from 'react';
import ReactDOM from 'react-dom/client';

//styles
import './index.css';

// views/components
import App from './App';
import { Login } from '@views/Login';
import { Dashboard } from '@views/Dashboard';
import { Auth } from '@views/Auth';
import { NotFound } from '@views/NotFound';
import { Home } from '@views/Home';

//router + query
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from '@views/Register';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Home />} />
            <Route path='auth' element={<Auth />} />
            <Route path='auth/login' element={<Login />} />
            <Route path='auth/register' element={<Register />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
