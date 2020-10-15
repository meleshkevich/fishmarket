import React from 'react';
import  {render} from 'react-dom';
import App from './components/App';
import StorePicker from './components/StorePicker';  
import Router from './components/Router';
import { Route } from 'react-router-dom';

 render(<Router/>, document.getElementById('main'));
