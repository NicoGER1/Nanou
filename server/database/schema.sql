CREATE TABLE emergency (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    number VARCHAR(30) NOT NULL
);

CREATE TABLE parents (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(80) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    address VARCHAR(255),
    email VARCHAR(80) NOT NULL UNIQUE,
    phoneNumber VARCHAR(30) NOT NULL
);

CREATE TABLE childrens (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    avatar VARCHAR(255),
    firstname VARCHAR(80) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    date_of_birth DATE,
    alimentation VARCHAR(80) NOT NULL
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start DATETIME NULL,
  end DATETIME NULL,
  allDay BOOLEAN DEFAULT FALSE
);

CREATE TABLE childrens_parents (
	  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    child_ID INT NOT NULL,
    parent_ID INT NOT NULL,
    relation VARCHAR(80) NOT NULL,
    FOREIGN KEY (child_ID) REFERENCES Childrens(ID),
    FOREIGN KEY (parent_ID) REFERENCES Parents(ID)
);

