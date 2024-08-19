import { createStore } from 'redux';
import sidebarReducer from './sidebarReducer';

const store = createStore(sidebarReducer);

export default store;
