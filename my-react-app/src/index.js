import React from 'react';
import ReactDOM from 'react-dom/client';
import Content from './Content/Content';
import Header from './Header/Header'
import Test from './Test/Test'
import '../node_modules/bulma/css/bulma.min.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Content/>
    {/* <Test/> */}
  </React.StrictMode>
);


