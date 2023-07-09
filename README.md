# Project_A5
======================

A decentralised voting system using blockchain smart contracts. Part of the Project Based Learning module of the Advanced Internet Computing course at the TUHH, SoSe, 2023.

# Development Mode
-----------------------

While in development mode use the following commands:
```bash
cd server
npm start
cd ../ui
ng s --port 80 (sudo if required)
```

To view the frontend UI, open http://localhost in web browser

# Production Mode
------------------------

For **docker** (production mode) use the following command in the root folder:
```bash
docker-compose up
```
and specify admin credentials when asked
*username*: 12345
*password*: admin

For **cloud** the URL is:
[http://35.194.18.200/](http://35.194.18.200/ "Decentralised Voting System") 
