# Chat App Task

A brief description of what this project does and who it's for

### Date of submission

25 October 2023

## Instructions to run assignment locally

### using docker compose

Open terminal and go to the root directory, then type `docker-compose up`

### manual run

- [frontend] open terminal and go to /frontend dir and type `npm install` then `npm run start`
- [backend] open terminal and go to /frontend dir and type `npm install` then `npm run start`

### Time spent

12 hours

### Assumption made

this is for simple group chat, no security concern related how to store & process data.
and because this is for test purpose I haven't optimize anything to improve the web page and database performance.
and I haven't work on any websocket project, so I didn't have time to properly close the socket connection when user is leaving

### Compromise made

to make this app better for real-world application:

- implement indexing on db
- improve web performance by monitoring it using some tools like Google Chrome Lighhouse
- use CDN for static file
- add more feature like recent visited room, typing indicator, user login, user profile, etc
- implement caching (redis)
- implement log tracking, maybe using elasticsearch+kibana
- implement rate limiter
- implement proper error modal/notification on frontend

### Assume the application will go into production

What would be your approach to ensuring the application is ready for production (testing)?

- yes, implement unit and integration testing in backend
- have QA automation to ensure the app is working
- build proper CI/CD to automate deployment
- provide dev, staging and production environment
- use cloud database provider to minimize risk of losing the data
- open communication channel if our user found and error

How would you ensure a smooth user experience as 1000’s of users start using your
app simultaneously?

- testing and keep testing
- keep optimize web page
- implement caching and proper indexing on server and database
- use cloud provider and make sure to choose server based on the geographical user

What key steps would you take to ensure application security?

- validate all the input from client (browser, mobile device, etc)
- make sure all credentials stored in safe place, in my repo I included the .env file, it just to make it easier to run on Vouch side

### What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.

- [backend] for clean code, if I have time I will implement dependency injection and Data Access Object pattern
- [backend] write Class instead of functions for the main logic
- [backend] create or use existing middleware to handle any error
- [backend] implement caching
- [backend] create npm package to export all the error message, I have created custom error message listed in backend/utils/error.js, this is for frontend to match the error code and better to export it as a npm package.
- [frontend] show loading indicator while fetching messages in Chat page
- [frontend] create single component to show error notification, probably toast or modal
- [frontend] more features like typing indicator, user profile, list of available room, login, logout, etc
- [frontend] use cdn to store static file

### Other information about your submission that you feel it's important that we know if applicable.

At the backend instead of username and roomId, I implement userID, roomID and roomCode, and I'm using that IDs to fetch the corresponding data.

roomCode is what user key in when they want to join the room, but in the background I create the room and use roomID to fetch all the data.

Same with username, instead of using username for data fetching, I use userID, since it's a good practice using ID.
