# RAMT: Reputation Analyses Multi Tool

The website is deployed at:
http://ramt.surge.sh/

RAMT is website where users can test suspicious emails and urls for reputation and analyses. When a user investigates an email or url, the website returns a reputation score as well as notes. RAMT also features a graph display of site-wide searches over various time ranges. Each user can see their history of tested items and edit their account.

Email and Url reputation analysis is done with ipqualityscore.com and their API for fraud detection. Ipqualityscore analyses over one billion actions a day, making the service trustworthy and effective. The api also draws propriety data from honeypots, traps, dark web monitoring, threat network, and reports from fortune 500 companies.

Chart.js is used to make the charts on the homepage animated and interactable. Also a combination of Bootstrap and Reactstrap is used for much of the styling such as Cards and Alerts. Most of all, Material.ui is used to style elements of the page such as the forms, nav bar, and buttons. The font RAMT uses is Roboto.

Database Schema for RAMT:
![Database PNG](databaseSchema/RAMTDatabaseSchema.png?raw=true "RAMT Database Schema")

## Available React Scripts to use in reactFrontend/ 

In the reactFrontend/ project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any list errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

To run the tests for the backend, run
```console
foo@bar:~$ jest
```
in the expressBackend/ directory.

The standard flow of interaction with RAMT begins with authorization. Once authorization is passed, by logging in or signing up, the core features of the site are accessible. On the home page various reputation data from the site's history can be displayed. To investigate the reputation of an email or url there is a page for each. Finally, each user can visit their profile page to view their investigate history and edit account details.
 
RAMT was creating using the following technologies:

Front End:\
React\
React-redux\
Javascript\
Css

Back End:\
Node\
Express\
Javascript\
PostgreSQL

Deployed Using:\
Github\
Heroku\
Surge
