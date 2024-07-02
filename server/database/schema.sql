CREATE TABLE emergency (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    number VARCHAR(30) NOT NULL
);

CREATE TABLE poison_service (
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
    gender VARCHAR(10) NOT NULL,
    date_of_birth DATE,
    alimentation VARCHAR(80) NOT NULL,
    allergy VARCHAR(255) NOT NULL,
   passy VARCHAR(255) NOT NULL,
   milk VARCHAR(255) NOT NULL
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

INSERT INTO parents (firstname, lastname, address, email, phoneNumber)
VALUES
    ('Pierre', 'Dupont', '12 rue de la Paix', 'pierre.dupont@example.com', '06 12 34 56 78'),
    ('Marie', 'Martin', '34 avenue de la République', 'arie.martin@example.com', '07 89 01 23 45'),
    ('Jean', 'Lefebvre', '56 rue de la Liberté', 'jean.lefebvre@example.com', '06 54 32 10 98'),
    ('Sophie', 'Garcia', '78 boulevard de la Nation', 'ophie.garcia@example.com', '07 65 43 21 09');
    
  INSERT INTO childrens (avatar, firstname, lastname, gender, date_of_birth, alimentation, allergy, passy, milk)
VALUES
    ('https://image.noelshack.com/fichiers/2024/27/2/1719908200-child-5.png', 'Théo', 'Martin', 'Garçon', '2023-06-20', 'végétarien', 'Figue', 'Oui', 'Maternelle'),
    ('https://image.noelshack.com/fichiers/2024/27/2/1719908201-child-6.png', 'Léa', 'Dupont', 'Fille', '2022-02-15', 'omnivore', 'Pollen', 'Non', 'En poudre'),
    
    ('https://image.noelshack.com/fichiers/2024/27/2/1719908201-child-2.png', 'Léo', 'Lefebvre', 'Garçon', '2023-03-12', 'omnivore', 'Arachide', 'Non', 'En poudre'),
    ('https://image.noelshack.com/fichiers/2024/27/2/1719908201-child-3.png', 'Anaïs', 'Garcia', 'Fille', '2023-01-25', 'végétalien', 'Aucune', 'Oui', 'En poudre');

    INSERT INTO childrens_parents (child_ID, parent_ID, relation)
VALUES
    (1, 1, 'père'),
    (2, 2, 'mère'),
    (3, 3, 'père'),
    (4, 4, 'mère');

    INSERT INTO emergency (name, number) VALUES
('Urgences', '112'),
('Pompiers', '18'),
('Police', '17'),
('SAMU / ambulance', '15');

INSERT INTO poison_service (name, number) VALUES
('ANGERS', '02 41 48 21 21'),
('BORDEAUX', '05 56 96 40 80'),
('LILLE', '08 00 59 59 59'),
('LYON', '04 72 11 69 11'),
('MARSEILLE', '04 91 75 25 25'),
('NANCY', '03 83 22 50 50'),
('PARIS', '01 40 05 48 48'),
('RENNES', '02 99 59 22 22'),
('STRASBOURG', '03 88 37 37 37'),
('TOULOUSE', '05 61 77 74 47');