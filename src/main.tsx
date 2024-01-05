import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import OrderBooks from './pages/OrderBooks/OrderBooks.tsx';

const router = createBrowserRouter([
  {
    
    path: '/', 
    element: <App />,
  },
  {
    path: '/order-books',
    element: <OrderBooks />
  }
], {
  basename: '/bible-books',
}); 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
