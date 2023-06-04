import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componets/Home';
import Profile from './componets/Profile';
import { Provider } from 'react-redux';
import store from '../src/componets/redux-store/store';
import Resume from './componets/Resume';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Resume" element={<Resume />} />
      </Routes>
    </Router>
    </Provider>
  );
};

export default App;
