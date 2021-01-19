import { createStore, applyMiddleware } from 'redux';

// 使用 redux-thunk 作為 middleware
import thunk from 'redux-thunk';

// 引入匯總後的 reducer
import reducer from '../reducers';

// redux devtools
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
