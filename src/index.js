import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, browserHistory } from 'react-router-dom';
import Main from './components/Main';
import App from './components/App';
import Login from './components/Login';
import LoginContainer from './containers/LoginContainer';
import Register from './components/Register';
import RegisterContainer from './containers/RegisterContainer';
import DownloadImage from './components/DownloadImage';
import EditUserinfo from './components/EditUserinfo';
import EditUserinfoContainer from './containers/EditUserinfoContainer';
import Userimagepage from './components/Userimagepage';
import Notfound from './components/Notfound';
//Redux 설정
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(ReduxThunk)
));

const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter history={browserHistory}>
      <Provider store={store}>
        <Main>
          <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/image/:id" component={DownloadImage}/>
            <Route path="/login" component={LoginContainer}/>
            <Route path="/register" component={RegisterContainer}/>
            <Route path="/user/:userid/edit" component={EditUserinfoContainer}/>
            <Route path="/user/:userid/collection" component={Userimagepage}/>
            <Route component={Notfound} />
          </Switch>
        </Main>
      </Provider>

    </BrowserRouter>
, rootElement
);

if (module.hot) {
  console.log('module hot');
  module.hot.accept();
}
