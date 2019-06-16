import React from 'react';
import './App.css';
import Title from './Components/Title'
import StockList from './Components/StockList'
import UserData from './Components/UserData'

const USER_API = 'https://qwilrstockwallet.herokuapp.com/api/balance/'

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      userData: []
    }
  }

  fetchUserData() {
    fetch(USER_API)
      .then(response => response.json())
      .then(json => {
        this.setState({
          userData: json[0]
        })
      });
  }

  componentDidMount() {
    this.fetchUserData()
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-fixed-top bg-light">
          <div className="row">
            <Title />
          </div>
          <div>
            <UserData
              fetchUserData={this.fetchUserData.bind(this)}
              userData={this.state.userData}
            />
          </div>
        </nav>
        <div>
          <StockList
            userData={this.state.userData}
            fetchUserData={this.fetchUserData.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
