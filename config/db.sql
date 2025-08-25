-- Active: 1755252367116@@127.0.0.1@3306@cheap_fuel
CREATE DATABASE cheap_fuel

USE cheap_fuel

SELECT DATABASE()

CREATE TABLE fuel_types(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO fuel_types ( name) VALUES
( 'AI-92'),
( 'AI-95'),
( 'Diesel');


CREATE TABLE gas_station(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

SELECT * FROM gas_station_branch

CREATE TABLE gas_station_branch(
    id int AUTO_INCREMENT PRIMARY KEY,
    gas_station_id int NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    FOREIGN KEY(gas_station_id) 
    REFERENCES gas_station(id)
);


CREATE TABLE gas_station_fuel_type(
    id int AUTO_INCREMENT PRIMARY KEY,
    gas_station_branch_id int NOT NULL,
    fuel_type_id int NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    is_exists BOOLEAN NOT NULL,
    FOREIGN KEY(gas_station_branch_id) 
    REFERENCES gas_station_branch(id),
    FOREIGN KEY(fuel_type_id) 
    REFERENCES fuel_types(id)
);

SELECT * FROM gas_station_fuel_type

-- Филиал "Jon"
INSERT INTO gas_station_fuel_type (gas_station_branch_id, fuel_type_id, price, is_exists) VALUES
(1, 1, 10200.50, TRUE),
(1, 2, 9800.00, FALSE);

-- Филиал "Dep"
INSERT INTO gas_station_fuel_type (gas_station_branch_id, fuel_type_id, price, is_exists) VALUES
(2, 1, 10100.00, TRUE),
(2, 3, 8900.00, TRUE);

-- Филиал "Alex"
INSERT INTO gas_station_fuel_type (gas_station_branch_id, fuel_type_id, price, is_exists) VALUES
(3, 3, 8750.00, TRUE);


show tables


SELECT gsb.name, gsb.address FROM fuel_types ft
LEFT JOIN gas_station_fuel_type gsft ON ft.id=gsft.fuel_type_id
LEFT JOIN gas_station_branch gsb on gsb.id=gsft.gas_station_branch_id WHERE ft.name = ?