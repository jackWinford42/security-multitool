# RAMT: Reputation Analyses Multi Tool

RAMT is website where users can test suspicious emails and urls for reputation and analyses. When a user investigates an email or url, the website returns a reputation score as well as notes. RAMT also features a graph display of site-wide searches over various time ranges. Each user can see their history of tested items and edit their account.

Email and Url reputation analysis is done with ipqualityscore.com and their API for fraud detection. Ipqualityscore analyses over one billion actions a day, making the service trustworthy and effective. The api also draws propriety data from honeypots, traps, dark web monitoring, threat network, and reports from fortune 500 companies.

Database Schema for RAMT:
![Database PNG](databaseSchema/RAMTDatabaseSchema.png?raw=true "RAMT Database Schema")

## Available React Scripts to use in reactFrontend/ 

In the reactFrontend/ project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

To run the tests for the backend, run
```console
foo@bar:~$ jest
```
in the expressBackend/ directory.

The website is deployed at:
http://ramt.surge.sh/

RAMT was creating using the following technologies:  
Front End:   
React
React-redux
Javascript
Css

Back End:  
Node
Express
Javascript
PostgreSQL

Deployed Using:
Github
Heroku
Surge