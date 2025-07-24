import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { Routes, Route, unstable_HistoryRouter as HistoryRouter, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/Home/Home';
import HeaderAndFooter from './templates/HeaderAndFooter/HeaderAndFooter';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { store } from './redux/configStore';
import Login from './pages/Login/Login';
import ShopName from './pages/ShopName/ShopName';
import './i18n';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTop from './ScrollToTop';



const root = ReactDOM.createRoot(document.getElementById('root'));
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;


export const history = createBrowserHistory();
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <HistoryRouter history={history}>
        <ScrollToTop />
        <Routes>
          <Route element={<HeaderAndFooter />}>
            <Route index element={<Home />} path="/"></Route>
            <Route path="/productdetail">
              <Route path=':productid' element={<ProductDetail />}></Route>
            </Route>
            <Route path="/shopname">
              <Route path=':shopnameid' element={<ShopName />}></Route>
            </Route>
            <Route path='*' element={<Navigate to="" />}></Route>
          </Route>
          <Route element={<Login />} path="/login"></Route>
        </Routes>
      </HistoryRouter>
    </GoogleOAuthProvider>
  </Provider>





);


