import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      isInfoEmpty: false,
      serverResponse: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = () => {
    if ((this.state.email.length && this.state.password.length && this.state.name.length)){
      fetch('http://localhost:3000/user', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        })
      }).then(response => response.json())
        .then(res => {
          console.log(res)
          this.setState({serverResponse: res});
          this.setState({isInfoEmpty: false});
        })
    }else{
      this.setState({isInfoEmpty: true});
    }
}

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                  required
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                  required
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                  required
                />
              </div>
            </fieldset>
              <div className="">
                <input
                  onClick={this.onSubmitSignIn}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                />
              </div>
            {
              this.state.isInfoEmpty === true
              ? (
                <div>
                  <p className="f6 link dim red db pointer">All fields must be filled!</p>
                </div>
              )
              : (
                  this.state.serverResponse === 'User registered!'
                  ? (
                    <div>
                      <p className="f6 link dim green db pointer">{`${this.state.serverResponse}`}</p>
                    </div>
                  )
                  : (
                    <div>
                      <p className="f6 link dim red db pointer">{`${this.state.serverResponse}`}</p>
                    </div>
                  )

              )
            }
          </div>
        </main>
      </article>
    );
  }
}

export default Register;