import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 부트스트랩
import 'bootstrap/dist/css/bootstrap.min.css';
// 리덕스
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import contactApp from './REDUX_reducers'

// 스토어 생성
const store = createStore(contactApp);

// 렌더
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

