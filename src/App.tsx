import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getYear } from 'date-fns';

import Calendar from './calendar/Calendar.component';

import logo from './logo.svg';
import './App.scss';

const App = () => {
  const [year, setYear] = useState(getYear(new Date()));
  const goBack = () => setYear(year - 1);
  const goForward = () => setYear(year + 1);
  
  return (
  <Router>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <div className="year-panel">
                <div className="navigation-button left" onClick={goBack}>
                  <svg
                    version="1.1"
                    id="triangle-prev"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 50 50"
                    enableBackground="new 0 0 50 50">
                    <polygon
                      className="triangle-polygon"
                      fill="#FFFFFF"
                      stroke="#FFFFFF"
                      strokeMiterlimit="10"
                      points="3.6,44.5 25.3,7 46.9,44.5"/>
                  </svg>
                </div>

                <h1 className="App-title">{year}</h1>

                <div
                  className="navigation-button right"
                  onClick={goForward}>
                  <svg
                    version="1.1"
                    id="triangle-next"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 50 50"
                    enableBackground="new 0 0 50 50">
                    <polygon
                      className="triangle-polygon"
                      fill="#FFFFFF"
                      stroke="#FFFFFF"
                      strokeMiterlimit="10"
                      points="3.6,44.5 25.3,7 46.9,44.5"/>
                  </svg>
                </div>
              </div>
            </header>
            <main className="body">
              <Calendar year={year} />
            </main>
          </div>
        )}
      />
  </Router>
  );
};

export default App;
