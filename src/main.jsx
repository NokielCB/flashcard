import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext.jsx';
import Layout from './components/Layout.jsx'
import NotFound from './pages/NotFound.jsx'
import Study from './pages/Study.jsx'
import Stats from './pages/Stats.jsx'
import Words from './pages/Words.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children:
      [
        {
          index: true,
          element: <Study />
        },
        {
          path: '/stats',
          element: <Stats />
        },
        {
          path: '/words',
          element: <Words />
        },
      ],

  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </StrictMode>,
)
