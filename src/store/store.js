import {compose,applyMiddleware}  from 'redux';
import { legacy_createStore as createStore} from 'redux'
import {persistStore,persistReducer} from 'redux-persist'
import { rootReducer } from './root-reducer';
import storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from './middleware/logger';

//root reducer

const persistsConfig={
    key:'root',
    storage,
    blacklist:['user']
}
const persistedReducer=persistReducer(persistsConfig,rootReducer);
const middleWares=[process.env.NODE_ENV==='development' && loggerMiddleware].filter(Boolean);
const composeEnhancer=(process.env.NODE_ENV!=='production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers=composeEnhancer(applyMiddleware(...middleWares))

export const store=createStore(persistedReducer,undefined,composedEnhancers)

export const persistor=persistStore(store)