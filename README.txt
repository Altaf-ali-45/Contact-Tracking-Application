CONTACT MANAGEMENT - STUDENT RUN GUIDE

Project Folders:
- contact-backend (Spring Boot API)
- contact-frontend (React + Vite UI)

--------------------------------------------------
1) Prerequisites
--------------------------------------------------
Install these first:
- Java 17
- Maven (or use mvn wrapper if available)
- Node.js (includes npm)
- MySQL Server

Check versions (optional):
- java -version
- mvn -version
- node -v
- npm -v

--------------------------------------------------
2) Create Database
--------------------------------------------------
In MySQL, create database:

CREATE DATABASE contact_db;

--------------------------------------------------
3) Set Your Own DB Username & Password
--------------------------------------------------
Open this file:
contact-backend/src/main/resources/application.yml

Update the datasource section with YOUR MySQL credentials:

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/contact_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
    username: <your_mysql_username>
    password: <your_mysql_password>

Example:
username: root
password: 123456

Save the file.

--------------------------------------------------
4) Run Backend (Spring Boot)
--------------------------------------------------
Open terminal in: contact-backend
Run:

mvn spring-boot:run

Backend URL:
http://localhost:8080

Keep this terminal running.

--------------------------------------------------
5) Run Frontend (React)
--------------------------------------------------
Open another terminal in: contact-frontend
Run:

npm install
npm run dev

Frontend URL:
http://localhost:5173

Keep this terminal running.

--------------------------------------------------
6) Demo Login Credentials
--------------------------------------------------
Use these credentials in the login page:

username: test
password: test123

When backend starts, sample contacts are automatically initialized for this demo user.

--------------------------------------------------
7) If Login Fails
--------------------------------------------------
- Confirm backend is running on port 8080.
- Confirm frontend is running on port 5173.
- Confirm DB username/password in application.yml are correct.
- Confirm MySQL service is running.
- Restart backend after changing application.yml.

--------------------------------------------------
8) Stop Servers
--------------------------------------------------
In each terminal, press:
Ctrl + C

Done.
