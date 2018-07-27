import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import AddReminder from './components/AddReminder/AddReminder';
import Greeting from './components/Greeting/Greeting';
import './App.css';
import ReminderList from './components/ReminderList/ReminderList';

const particlesOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
      },
      reminders: [],
      noReminders: true
    }
  }

  loadUser = (user) => {
    this.setState({ user: {
      id: user.id,
      name: user.name
      }
    })
  }

  loadReminders = () => {
    fetch(`http://localhost:3000/user/${this.state.user.id}/reminder`)
    .then(response => response.json())
    .then(reminders => {
      if (!(reminders === 'Not found!')){
        this.setState({
          reminders: reminders,
          noReminders: false
        })
      } else {
        this.setState({noReminders: true})
      }
    });
  }

  deleteReminder = (reminderId) => {

    fetch(`http://localhost:3000/user/${this.state.user.id}/reminder/${reminderId}`,{
      method: 'delete',
      headers: {'Content-Type': 'application/json'}})
    .then(response => response.json())
    .then(stat => {
      console.log(stat);
      this.onRouteChange('home');
    })
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
      route = 'signin';
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
      this.loadReminders();
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route, user, reminders, noReminders } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <div>
                <Greeting name={user.name}/>
              </div>
              <div>
                <ReminderList reminders={reminders} noReminders={noReminders} deleteReminder={this.deleteReminder}/>
              </div>
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : (
                route === 'addreminder'
                ? <AddReminder userid={user.id} onRouteChange={this.onRouteChange}/>
                : <Register onRouteChange={this.onRouteChange}/>
               ) 
            )
        }
      </div>
    );
  }
}

export default App;
