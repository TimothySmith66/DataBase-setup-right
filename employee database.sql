CREATE DATABASE employer_db;
 
 USE employer_db;
 
 CREATE table employee(
 id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
 first_name VARCHAR(50) NOT NULL,
 last_name VARCHAR (50) NOT NULL, 
 role_id INT NOT NULL,
 manager_id INT,
 PRIMARY KEY (id)
 );
 CREATE TABLE department(
 id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
 name varchar(50) NOT NULL,
 PRIMARY KEY(id)
 );
 
 CREATE TABLE role( 
 id INT NOT NULL AUTO_INCREMENT,
 salary DECIMAL NOT NULL,
 title VARCHAR (30) NOT NULL,
 department_id INT NOT NULL,
 PRIMARY KEY (id)
 );


 INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Timothy", Smith, 2256, 7788);