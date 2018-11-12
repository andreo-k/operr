# operr
This application is a test task ('quiz').

## prerequisites:
jdk 1.8 - required exactly 1.8 (above/below not supported). environment variable JAVA_HOME is required.
node.js (latest LTS)

## database credentials
configure connection to mysql in file s
./src/main/resources/config/application-dev.yml
./src/main/resources/config/application-prod.yml

by default it wants "operr" database at localhost:3306 with login/password operr/operr

## Development
Install npm packages:
npm install

Build and start development java server:
./mvnw

Build front-end and start webpack development server:
npm start 

That will open web-browser with the application.

## Building for production

To optimize the operr application for production, run:

./mvnw -Pprod package

To immediately execute producton build:
java -jar ./target/operr-0.0.1-SNAPSHOT.war 

To deploy on tomcat pls take:
./target/operr-0.0.1-SNAPSHOT.war.original