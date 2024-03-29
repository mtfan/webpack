import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //localStorage
import storageSession from 'redux-persist/lib/storage/session'; //sessionStorage
// import { AsyncStorage } from 'react-native'; //react-native Storage
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    window.devToolsExtension ? window.devToolsExtension() : undefined,
    applyMiddleware(thunk)
  );
  let persistor = persistStore(store);
  return { store, persistor };
}
