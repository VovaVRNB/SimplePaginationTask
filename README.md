# SimplePaginationTask
Stack:
- Java 11
- Angular 12
- MySQL server 8.0.28

1. DB setting.

This application use MySQL database. Before starting you need to create db, tables and fill some data for the app. You can find the script below:

CREATE DATABASE UKEES;

USE UKEES;

 CREATE TABLE tblUsers(
    usrID int NOT NULL AUTO_INCREMENT,
    usrName VARCHAR(50) NOT NULL,
    usrRole VARCHAR(20) NOT NULL,
    PRIMARY KEY (usrID)
 );

INSERT INTO tblUsers (usrName, usrPassword, usrRole) VALUES 
("admin", "$2a$10$Il7twPvztg1rns8oQqa1E.V7xKohWXaiXTjJ06Ubalm//nZsGm6aq", "ROLE_ADMIN"), 
("user", "$2a$10$Il7twPvztg1rns8oQqa1E.V7xKohWXaiXTjJ06Ubalm//nZsGm6aq", "ROLE_USER");

CREATE TABLE tblDepartments( 
dpID INT NOT NULL AUTO_INCREMENT, 
dpName VARCHAR(100) NOT NULL, 
PRIMARY KEY (dpID) 
);

CREATE TABLE tblEmployees( 
empID INT NOT NULL AUTO_INCREMENT, 
empName VARCHAR(50) NOT NULL, 
empActive BOOLEAN, 
emp_dpID INT NOT NULL, 
PRIMARY KEY (empID), 
FOREIGN KEY (emp_dpID) REFERENCES tblDepartments(dpID)
);

INSERT INTO tblDepartments (dpName) VALUES (’Tech’);
INSERT INTO tblDepartments (dpName) VALUES ('HR');
INSERT INTO tblDepartments (dpName) VALUES (‘Finance’);

INSERT INTO tblEmployees (empName, empActive, emp_dpID) VALUES («Volodymyr», true, 1), («Vladyslav», false, 1), («Mykyta», true, 2), («Olha», true, 2), («Kateryna», false, 2), («Serhii», true, 3), («Bogdan», false, 3), («Dmytro», true, 3), («Daria», true, 2), («Julia», true, 1), («Ihor», true, 1), («Anna», false, 2);

2. Application setting.   
 
Now, when db is created, you need to go to application code and find «application.properties» file where you need to set username and password for your database. Next you can start the application.

3. UI setting.

UI uses Angular. Some steps to start our UI:
- Download Node.Js from https://nodejs.org/en/download/
- Check your version by command “node -v”
- Install Angular CLI by command “npm install -g @angular/cli”
- Check your Angular version by command “ng -v”

After Angular installation open your terminal, go to the «TestTaskUI» directory and write «ng serve» command to start. Now you can go to the «localhost:4200/login».

In «login» page you can log in by two ways: as admin or as user. Difference between this two roles is that admin can do edit and delete operations. However user can just search and watch.

Credentials:

- For ADMIN:
	Login - admin
	Password - password
- For USER:
	Login - user
	Password - password


Thats all what you need to do to start application.
