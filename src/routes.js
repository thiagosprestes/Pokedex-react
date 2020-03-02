import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar'
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';

const Routes = () => (
    <BrowserRouter>
        <Navbar/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/pokemon/:pokemonNumber" component={Pokemon} />
        </Switch>
    </BrowserRouter>
)

export default Routes;