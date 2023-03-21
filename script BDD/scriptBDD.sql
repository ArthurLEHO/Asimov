create database Asimov;

use Asimov;

create table PersonnelScolaires (
    id int(10) AUTO_INCREMENT NOT NULL,
    nom varchar(35) NOT NULL,
    prenom varchar(35) NOT NULL,
    statut varchar(25) NOT NULL,
    PRIMARY KEY (id)
);

create table Classes (
    id int(10) AUTO_INCREMENT NOT NULL,
    nom varchar(20),
    PRIMARY KEY (id)
);

create table Matieres (
    id int(10) AUTO_INCREMENT NOT NULL,
    nom varchar(20) NOT NULL,
    PRIMARY KEY (id)
);

create table Notes (
    id int(10) AUTO_INCREMENT NOT NULL,
    matiere varchar(20) NOT NULL,
    coefficient int(2) NOT NULL,
    resultat int(2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (matiere) REFERENCES Matiere(nom)
);

create table Eleves (
    id int(10) AUTO_INCREMENT NOT NULL,
    nom varchar(35) NOT NULL,
    prenom varchar(35) NOT NULL,
    classe varchar(20) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (classe) REFERENCES Classes(nom)
);


