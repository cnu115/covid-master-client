import React, { Component } from "react";
// import logo from './logo.svg';
import { Provider as ReduxProvider } from "react-redux";
import './App.css';
import Routes from './routes/routes';
import configureStore from "./modules/store";
const reduxStore = configureStore(window.REDUX_INITIAL_DATA);


class App extends Component {
  render(){
    return (
      <ReduxProvider store={reduxStore}>
        <div className="App">
            <Routes />
        </div>
      </ReduxProvider>
    );
  }
}

export default App;
