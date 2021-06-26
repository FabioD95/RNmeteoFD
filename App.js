import React from 'react';
import Navigation from './navigation';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './store/reducer'
import 'react-native-gesture-handler';

const rootReducer = combineReducers({
  reducer,
})

const enhacer = composeWithDevTools({
  trace: true,
  traceLimit: 25
})

const store = createStore(rootReducer, enhacer())

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
