CREATE TABLE emergency (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    number VARCHAR(20) NOT NULL
);

CREATE TABLE parents (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(80) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    address VARCHAR(255),
    email VARCHAR(80) NOT NULL UNIQUE,
    phoneNumber VARCHAR(20) NOT NULL
);

CREATE TABLE schedule (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    end_hour TIME NOT NULL,
    start_hour TIME NOT NULL
  );  

CREATE TABLE childrens (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    avatar VARCHAR(255),
    firstname VARCHAR(80) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    date_of_birth DATE
);

CREATE TABLE childrens_parents (
	  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    child_ID INT NOT NULL,
    parent_ID INT NOT NULL,
    relation VARCHAR(80) NOT NULL,
    FOREIGN KEY (child_ID) REFERENCES Childrens(ID),
    FOREIGN KEY (parent_ID) REFERENCES Parents(ID)
);

CREATE TABLE schedule_children (
	  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	  child_ID INT NOT NULL,
	  schedule_ID INT NOT NULL,
    FOREIGN KEY (child_ID) REFERENCES Childrens(ID),
    FOREIGN KEY (schedule_ID) REFERENCES schedule(ID),
    Date DATE NOT NULL
);