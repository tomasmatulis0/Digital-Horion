# Digital-Horion

First part ( Back-end ):
Create a simple API using NODE JS with 2 Models User and Reminder.
You can use any DB (we usually use Postgresql).
API should be capable of:
* User registration - POST /user (done)
* User login - POST /user/login (done)
* Create reminder for logged in User - POST /user/{USER_ID}/reminder (done)
* Edit reminder for logged in User - PATCH /user/{USER_ID}/reminder/{REMINDER_ID} (done, small bug, after edit need to click "Home" to rerender)
* Delete reminder for logged in User - DELETE /user/{USER_ID}/reminder/{REMINDER_ID} (done)
* List reminders for logged in User - GET /user/{USER_ID}/reminder (done)
* Filter reminders by date - GET /user/{USER_ID}/reminder?QUERY (not done)
* Send email to user with reminder title as email subject and reminder message as email body. (not done)
For sending emails you can use any Email providers or SMTP, it's up to you how you will send it.
 
User
    id
    email - string
    password - string
    name - string
Reminder
    id
    title - string
    message - string
    userId
    created - date
    remindAt -  date
    emailSent - boolean 

We recommend using LoopbackJs framework (did with Express.js)

Second part ( Front-end ): 
Build Simple app using "Reminder" API, which is capable of:
- Create reminder for logged in User (done)
- Edit reminder for logged in User (done)
- Delete reminder for logged in User (done)
- List reminders for logged in User (done)
- Filter reminders by date (not done)
(if you decide to skip first part, use local JSON files imitating API calls).
 
App must be built using modern Javascript frameworks, such as: React or AngularJs. (used React.js)
There are no designs provided. Use of Material UI should be enough for this project.
