import React from 'react';
import './Reminder.css';
import Time from 'react-time-format'

class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			userId: '',
			reminderId: '',
      editedTitle: '',
      editedMessage: '',
			editedTime: '',
			edit: false
    }
  }

onTitleChange = (event) => {
  this.setState({editedTitle: event.target.value})
}

onMessageChange = (event) => {
  this.setState({editedMessage: event.target.value})
}

onTimeChange = (event) => {
	this.setState({editedTime: event.target.value})
	console.log(event.target.value)
}

editReminder = (reminder) => {
	this.setState({
		userId: reminder.userid,
		reminderId: reminder.id,
		editedTitle: reminder.title,
		editedMessage: reminder.message,
		editedTime: reminder.remindat,
		edit: true
	})
}

onSubmitCancel = () => {
	this.setState({edit: false})
}

onSubmitChanges = () => {
	fetch(`http://localhost:3000/user/${this.state.userid}/reminder/${this.state.reminderId}`, {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			title: this.state.editedTitle,
			message: this.state.editedMessage,
			remindat: this.state.editedTime,
		})
	}).then(response => response.json())
		.then(stat => {
				console.log(stat);
				this.setState({edit: false});
			}
		)
}

render(){
	const {reminder, deleteReminder} = this.props;

	if (!this.state.edit){
		return (
			<div className='center'>
    		<div className='card pa2 ma2 br3 shadow-5'>
					<div className='w-100 pl3 flex items-center'>
						<h2 className='w-80'>{reminder.title}</h2>
						<input
        	    onClick={() => this.editReminder(reminder)}
          	  className='b input-reset ba b--green green bg-transparent grow pointer f6 dib ml3'
        	    type='submit'
         	    value='Edit'
            />
						<input
           	  onClick={() => deleteReminder(reminder.id)}
          	  className='b input-reset ba b--red red bg-transparent grow pointer f6 dib ml3'
    	        type='submit'
    	        value='Del'
      	    />
					</div>
       	  <p className='w-100 pl3'>{reminder.message}</p>
          <p className='w-100 pl3'><Time value={reminder.remindat} format='YYYY-MM-DD hh:mm' /></p>
      	</div>
    	</div>
		)
	} else {
		
		return(
			
			<div className='center'>
			<div className='form br3 mv2 shadow-5 '>
				<input 
					className='f4 pa2 center w-70 ma3' 
					type='text' 
					placeholder='Title'
					value={this.state.editedTitle}
					onChange={this.onTitleChange} 
					maxLength='40'
					autoComplete='off'
					required
				/>
				<textarea
					rows='3'
					className='f4 pa2 center w-70 ma3' 
					type='text' 
					placeholder='Message' 
					value={this.state.editedMessage}
					onChange={this.onMessageChange}
					maxLength='100'
					autoComplete='off' 
					required>
				</textarea>
				<div className='center w-100'>
					<input 
						className='ma3 pa1' 
						type='datetime-local'
						format='YYYY-MM-DDThh:mmTZD'
            value={this.state.editedTime.slice(0, 16)}
						onChange={this.onTimeChange}
						required
					/>
					<input
						onClick={this.onSubmitChanges}
						className='b ph3 ma3 input-reset ba b--black bg-transparent grow pointer f6 dib'
						type='submit'
						value='Submit'
					/>
					<input
						onClick={this.onSubmitCancel}
						className='b ph3 ma3 input-reset ba b--black bg-transparent grow pointer f6 dib'
						type='submit'
						value='Cancel'
					/>
				</div>
				<div className='center'>
					<p className='f6 link dim black db pointer'>All fields must be filled!</p>
				</div>
			</div>
		</div>
		)
	}
}}

export default Reminder;