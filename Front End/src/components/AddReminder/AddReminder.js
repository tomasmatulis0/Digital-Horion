import React from 'react';
import './AddReminder.css';

class AddReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: '',
      remindat: ''
    }
  }

  onTitleChange = (event) => {
    this.setState({title: event.target.value})
  }

  onMessageChange = (event) => {
    this.setState({message: event.target.value})
  }

  onTimeChange = (event) => {
    this.setState({remindat: event.target.value})
  }

  onSubmitAddReminder = () => {
    fetch(`http://localhost:3000/user/${this.props.userid}/reminder`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: this.state.title,
        message: this.state.message,
        remindat: this.state.remindat,
        emailsent: 'False'
      })
    }).then(response => response.json())
      .then(user => {
          this.props.onRouteChange('home');
        }
      )
  }

  render() {
    return (
      <div className='center'>
        <div className='form br3 shadow-5'>
          <input 
            className='f4 pa2 center w-70 ma3' 
            type='text' 
            placeholder="Title" 
            onChange={this.onTitleChange} 
            maxLength="40" 
            autoComplete="off" 
            required
          />
          <textarea
            rows='3'
            className='f4 pa2 center w-70 ma3' 
            type='text' 
            placeholder="Message" 
            onChange={this.onMessageChange}
            maxLength="100" 
            autoComplete="off" 
            required>
          </textarea>
          <div className='center w-100'>
            <input 
              className='ma3 pa1' 
              type="datetime-local" 
              onChange={this.onTimeChange}
              required
            />
            <input
              onClick={this.onSubmitAddReminder}
              className="b ph3 ma3 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Add"
            />
          </div>
          <div className='center'>
            <p className="f6 link dim black db pointer">All fields must be filled!</p>
          </div>
        </div>
      </div>
  );
 }
}

export default AddReminder;