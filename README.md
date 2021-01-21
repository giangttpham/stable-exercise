# Simple Mail Items View

### Overview

- This is a simple application to view all mail items queried from the GraphQL server.
- Mail items are displayed as cards, 3 per rows and 6 items per page.
- Users can navigate between pages with the `Next/Previous` buttons.
- App is deployed on Heroku at https://pure-sea-46641.herokuapp.com/
- **_NOTE_**: This GraphQL server returns a list of mails from a `data.json` file. Since this exercise contains a small amount of data, the client is able to request all the mails in one query and a client-side pagination technique was implemented using reactstrap's Pagination component. **However**, for applications with large amount of data, server-side pagination will be preferrable so the client can get exactly the amount of data it needs from each API call. The HTTP payload will be too big otherwise.

### Tech Stack

#### Client

- React
- Reactstrap
- Apollo Client
- Google Fonts: Noto Sans and PT Sans

#### Server

- Node.js
- Express
- GraphQL

### How to run

- Start server from project root `npm install && node server.js`
- Start client using `cd client && npm install && npm start`
- Web app is deployed locally at `http://localhost:3000`
