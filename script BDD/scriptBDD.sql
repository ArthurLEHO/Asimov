create database Asimov;

use Asimov;

create table PersonnelScolaires (
    id int(10) AUTO_INCREMENT NOT NULL,
    ps_nom varchar(35) NOT NULL,
    ps_prenom varchar(35) NOT NULL,
    ps_motdepasse varchar(25) NOT NULL,
    ps_statut varchar(25) NOT NULL,
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
    el_nom varchar(35) NOT NULL,
    el_prenom varchar(35) NOT NULL,
    el_classe varchar(20) NOT NULL,
    el_motdepasse varchar(25) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (el_classe) REFERENCES Classes(nom)
);

INSERT INTO Eleves (el_nom, el_prenom, el_classe, el_motdepasse) VALUES ('Covarel', 'Dylan', '6ème', 'testDylan');
INSERT INTO Eleves (el_nom, el_prenom, el_classe, el_motdepasse) VALUES ('Gondre', 'Macéo', '3ème', 'testMaceo');
INSERT INTO Eleves (el_nom, el_prenom, el_classe, el_motdepasse) VALUES ('Zidi', 'Kamil', '5ème', 'testKamil');
INSERT INTO PersonnelScolaires (ps_nom, ps_prenom, ps_motdepasse, ps_statut) VALUES ('Cardona', 'Laurent', 'testLaurent', 'Professeur');
INSERT INTO PersonnelScolaires (ps_nom, ps_prenom, ps_motdepasse, ps_statut) VALUES ('Buer', 'Micheline', 'testMicheline', 'Principale');

