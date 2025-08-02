// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import {Provider} from 'react-redux'
// import store from './configure/configureStore.js'
// // import './index.css'
// import './index.css' // Ensure this is present

// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//   <BrowserRouter>
//     <App />
//     </BrowserRouter>
// </Provider>  
// )
// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './configure/configureStore.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
