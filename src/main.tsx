import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routers from './router.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Routers />
    </Provider>
  </StrictMode>
)
