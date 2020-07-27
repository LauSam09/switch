# Switch

[![LauSam09](https://circleci.com/gh/LauSam09/switch.svg?style=svg)](https://app.circleci.com/pipelines/github/LauSam09/switch)

Switch is an application for managing house recipes and shopping. It is a progressive web application (PWA) application written using React, and is intended to function entirely offline if necessary.

When online, the client PouchDB databases synchronise in real-time with a server-hosted CouchDB using its [replication protocol](https://pouchdb.com/guides/replication.html).

## Technologies
* Application
  * React
  * Material UI to simplify layout and styling.
  * [PouchDB](https://pouchdb.com/) / [CouchDB](https://couchdb.apache.org/) to store and synchronise data between clients.
* CI/CD
  * Docker
  * CircleCI - branch-dependent automated linting, building and deployment.
  * Google Cloud Platform (Cloud Run)
