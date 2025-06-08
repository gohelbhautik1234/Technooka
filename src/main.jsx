import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Dashboard from './layout/dashboard.jsx'
import './index.css'
const router=createBrowserRouter([
  {
    path:'/',
    element:<Dashboard/>,
  }
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
