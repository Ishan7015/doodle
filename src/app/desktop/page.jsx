"use client"

import React from 'react';
import { store } from '@/reduxStore/store';
import { Provider} from 'react-redux';
import App from './components/app';

const Desktop = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
}

export default Desktop;
