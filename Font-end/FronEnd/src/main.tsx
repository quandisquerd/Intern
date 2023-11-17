
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from './store/store.tsx'
import { Provider } from 'react-redux'
// import './index.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
