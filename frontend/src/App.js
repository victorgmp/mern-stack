import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './componets/Navigation';
import NotesList from './componets/NotesList';
import CreateNote from './componets/CreateNote';
import CreateUser from './componets/CreateUser';


function App() {
  return (
    <Router>
      <div>
        <Navigation />

        <Route path="/" exact component={NotesList} />
        <Route path="/edit/id" component={CreateNote} />
        <Route path="/create" component={CreateNote} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
