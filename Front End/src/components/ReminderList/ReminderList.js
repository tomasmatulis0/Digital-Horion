import React from 'react';
import Reminder from '../Reminder/Reminder';


const ReminderList = ({reminders, noReminders, deleteReminder}) => {

	if (!noReminders){
    const reminderComponent = reminders.map((reminder, i) => {
			return <Reminder key={i} reminder={reminders[i]} deleteReminder={deleteReminder}/>
		})
  return (
    <div>
      {reminderComponent}
    </div>
  );
	}else {
		return (
			<div>
				<p>There's no reminders, please add some...</p>
			</div>
		);
	}

}

export default ReminderList;