![alt text](public/images/general/logo.svg)
# AidosKuneenNewExplorer

This application was created to collect information about transactions and accounts in the ADK Mainnet network.
It helps to make it easier to find information on the Adk Mainnet.
You can find information about any account or transaction you are interested in,
and also see recent transactions for all tokens of this network.
Aidos Kuneen Explorer is also adapted for mobile devices,
so you can find the information you need even from your phone.

## Technology.
The application is written in `JavaScript` and `PHP` using React technology.
The view data is based on `web3js` libraries and `mySQL` data.
`npm` is used as a package manager.

## Assembly and start.
After downloading the application, the first thing you need to do is install the dependencies for the client side,
The `npm intall` command will help you with this. Next, you must change the MySQL database connection settings in the `/back/index.php` file.
Next, to run the application, you need to write the npm start command in the root directory of the application.
To build the application, you must do npm run build in the root directory of the application.

## About the application.
All search data is taken from the web3 library, and the data for the transaction table is from the MySql database.
The main file of the client part is the Main.jsx file to which all the steel components of the application are connected.
Also in the Main.jsx file, transaction information is requested and then this data is filtered or displayed in
depending on the request.
