import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from './components/GlobalStyles'
import 'bootstrap/dist/css/bootstrap.css'

import { persistor, store } from './configureStore'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </Router>
    </PersistGate>
  </Provider>,
)

reportWebVitals()
