
import React from 'react'
import { Switch, Route,Router,BrowserRouter } from 'react-router-dom'
import Restaurant from './restaurant_details_noclass.js';
import Home from './home';
 
const Main = () => (
<main>
 <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/details/:id" component={Restaurant}/>
      </Switch>
  </BrowserRouter> 
  </main>
)

export default Main;