###myFlix App###

##About##
This is a database app built using MERN stack technology. Parcel is also used to transpile, minify and organize codebase. The main point of the app is to display a database of movies and allow users to interact with the information displayed, such as adding to their favorites.

##The Code##
To use this code, you will need some dependencies, listed in the next section.

To run from a local host, use command 'parcel src/index.html' in the CLI. You can then navigate to 'localhost:1234' in your browser. This program uses https security.

To login / register as a user, you can click on the Register link on the login page. You may get a warning about the login encryption, as it is not entirely finished - but information is secure in the database. From there you can navigate through the app.

##Dependencies##

This app uses:

    "axios": "^0.27.2",
    "parcel": "^2.0.0-rc.0",
    "react": "^17.0.2",
    "react-bootstrap": "^2.4.0",
    "react-dom": "^17.0.2",
    "react-redux": "^8.0.2",
    "react-router-dom": "5.2.0",
    "redux": "^4.2.0",
    "redux-devtools-extension": "^2.13.9"

And when parcel is run to start the app, it will also install the devDependency @parcel/transformer-sass, as SCSS is used in the app. Additionally, propTypes is used throughout, but does not need to be installed. IMPORTANT: Use the versions listed here or the app will not run.

##The API##
The API is currently stored using MongoDB Atlas, and was created before the app by myself. All data shown in the app is sourced from this API.

Thank you for trying out my code!
