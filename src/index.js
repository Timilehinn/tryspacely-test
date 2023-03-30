import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'
import 'tw-elements'
import './i18n'
import App from './App'
import './sass/global.scss'
import LoadingIndicator from './components/LoadingIndicator'

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<LoadingIndicator />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
)
