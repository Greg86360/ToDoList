import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bulma/css/bulma.min.css'
import Content from './Content/Content';
import Header from './Header/Header'
import Test from './Test/Test'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Content/>
    {/* <Test/> */}
  </React.StrictMode>
);


