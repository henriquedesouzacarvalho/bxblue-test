import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
 
import Index from './pages/Index'
import AddComplaint from './pages/AddComplaint'
import Details from './pages/Details'
import ListComplaint from './pages/ListComplaint'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/add-complaint" component={AddComplaint} />
                <Route path="/list-complaint" component={ListComplaint} />
                <Route path="/complaint-detail/:id" component={Details} />
            </Switch>
        </BrowserRouter>
    );
}