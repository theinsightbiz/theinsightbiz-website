import './styles/global.css'
import './styles/theme.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

import { initReveal, initRipple } from './utils/beautifyInteractions'
import { initSmoothScroll } from './utils/smoothScroll'

// Mount the app
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// Initialize global interactions after first paint
requestAnimationFrame(() => {
  initReveal()
  initRipple()
  initSmoothScroll()
})
