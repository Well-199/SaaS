import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './routes/Routes'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store' 

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
	<Provider store={store}>
      	<BrowserRouter>
        	<Router/>
      	</BrowserRouter>
    </Provider>
  </React.StrictMode>
)
