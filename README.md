## Introduction
This project is to save each questionnaire's data into json files and show the list of the data.
To do this, we make the node server to store the data into local file. In front-end, we couldn't access the local drive to write file.

The text file which stored the list of questions is saved in public folder, named fields.txt. 
In this file, we could change queries, before using this app.

And each questionnaire's information is stored in the json files. These files are named as like the header of Form, so before save, you could change the saving filename. These files are stored in the src/questionnaires folder.

These paths could not change.

To do this, I use the react bootstrap for responsive ui and pagination,  and react-bootstrap-table for table pagination.

## Run Locally

### 1. Environment 
First, you should install node to start this react server.
Then download node modules. Try this command.

First download node modules for front-end.
```
npm install
```
Then download node modules for back-end.
```
cd ./server
npm install
cd ..
```
or
```
npm install -g yarn

yarn install

cd ./server
yarn install
cd..
```
### 2. Start

First, you shoul start node server to save questionnaires into json file.
```
cd ./server
npm start
cd ..
```
Then, start front end to start.
```
npm start
```





