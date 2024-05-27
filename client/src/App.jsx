import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NameRequirement from './NameRequirement';
import ListingPage from './ListingPage';
import './styles.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={NameRequirement} />
                <Route path="/tasks" component={ListingPage} />
            </Switch>
        </Router>
    );
}

export default App;