# myFlix-client

## Description
This is the client-side component of a "movies" web application, called "myFlix". The app provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favourite movies.

## Key Features
- users can register and then login with their email and password
- users can access information about movies, directors and genres
- clicking on a movie allows the user to add the movie to their favourites' list
- users can see their profile details and favourite movies in a profile view 
- users can  update their user profile and delete favourite movies from that view
- user can delete their account/profile

## Getting Started
Before installing the app, make sure you have a recent version of Node and npm installed. To get a local copy up and running follow these steps. 

### Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- npm
```
npm install -g npm
```

### Installation
 
1. Clone the Github repo to your local machine
- Make a copy of this [GitHub repository](https://github.com/netti-w/myFlix-client) and save it on your local machine by either downloading it as a zip file or using the git command in your terminal:
```
git clone https://github.com/netti-w/myFlix-client
```
2. Install local dependencies
- Head to the root directory of your repo in your terminal and install all local dependencies by typing the following command in your terminal:
```
npm install
```
### Run application locally
The app is built with Parcel, to run the app locally, run `parcel/src/index.html` and navigate to `http://localhost:1234/`. 

### Usage
Sign up as a new user. After Registration, go and login with your username and password. In the movies view, click on a movie to see movie details or to add it to your favourites' list. Additionally you can click on the director and genre to get further details. In the user profile you can change your profile details or remove movies from your favourites' list.

## Dependancy
- HTML5
- CSS3
- JavaScript (ES6)
- React
- React-DOM
- React-Router-DOM
- React-Bootstrap
- React-Redux
- Redux
- Axios
- PropTypes

## Project screenshots
Login view:
![](/screenshots/login_view.png)

Movies view:
![](/screenshots/movies_view.png)

Profile view:
![](/screenshots/profile_view.png)

## Project Repository
[myFlix-client](https://github.com/netti-w/myFlix-client)