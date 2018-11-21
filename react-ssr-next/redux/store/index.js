import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //localStorage
import storageSession from 'redux-persist/lib/storage/session'; //sessionStorage
// import { AsyncStorage } from 'react-native'; //react-native Storage
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: storageSession
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  return { store, persistor };
}
