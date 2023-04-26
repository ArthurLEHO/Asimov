create database Asimov;

use Asimov;

create table PersonnelScolaires (
    ps_id INTEGER AUTO_INCREMENT NOT NULL,
    ps_nom varchar(35) NOT NULL,
    ps_prenom varchar(35) NOT NULL,
    ps_motdepasse varchar(25) NOT NULL,
    ps_statut varchar(25) NOT NULL,
    ps_idMatiere INTEGER NULL,
    PRIMARY KEY (ps_id)
);

create table Classes (
    cl_id INTEGER AUTO_INCREMENT NOT NULL,
    cl_nom varchar(20),
    cl_IdProf INTEGER NOT NULL,
    PRIMARY KEY (cl_id)
);

create table Matieres (
    mt_id INTEGER AUTO_INCREMENT NOT NULL,
    mt_nom varchar(20) NOT NULL,
    PRIMARY KEY (mt_id)
);

create table Notes (
    nt_id INTEGER AUTO_INCREMENT NOT NULL,
    nt_matiere INTEGER NOT NULL,
    nt_idEleve INTEGER NOT NULL,
    nt_resultat int(4) NOT NULL,
    PRIMARY KEY (nt_id)
);

create table Eleves (
    el_id INTEGER AUTO_INCREMENT NOT NULL,
    el_nom varchar(35) NOT NULL,
    el_prenom varchar(35) NOT NULL,
    el_idClasse INTEGER NOT NULL,
    el_motdepasse varchar(25) NOT NULL,
    PRIMARY KEY (el_id)
);

ALTER TABLE Notes

ADD CONSTRAINT FK_NoteEleve 
FOREIGN KEY(nt_idEleve) REFERENCES Eleves(el_id),

ADD CONSTRAINT FK_NoteMatiere 
FOREIGN KEY(nt_matiere) REFERENCES Matieres(mt_id);

ALTER TABLE Eleves

ADD CONSTRAINT FK_ClasseEleve
FOREIGN KEY(el_idClasse) REFERENCES Classes(cl_id);

ALTER TABLE PersonnelScolaires

ADD CONSTRAINT FK_MatiereProf
FOREIGN KEY(ps_idMatiere) REFERENCES Matieres(mt_id);

ALTER TABLE Classes

ADD CONSTRAINT FK_ClasseProfesseurPrincipal
FOREIGN KEY(cl_IdProf) REFERENCES PersonnelScolaires(ps_id);

INSERT INTO Eleves (el_nom, el_prenom, el_idClasse, el_motdepasse) VALUES ('Covarel', 'Dylan', '1', 'testDylan');
INSERT INTO Eleves (el_nom, el_prenom, el_idClasse, el_motdepasse) VALUES ('Gondre', 'Macéo', '1', 'testMaceo');
INSERT INTO Eleves (el_nom, el_prenom, el_idClasse, el_motdepasse) VALUES ('Zidi', 'Kamil', '2', 'testKamil');
INSERT INTO PersonnelScolaires (ps_nom, ps_prenom, ps_motdepasse, ps_statut, ps_idMatiere) VALUES ('Cardona', 'Laurent', 'testLaurent', 'Professeur', 2);
INSERT INTO PersonnelScolaires (ps_nom, ps_prenom, ps_motdepasse, ps_statut, ps_idMatiere) VALUES ('Braka', 'Raphael', 'testRaphael', 'Professeur', 1);
INSERT INTO PersonnelScolaires (ps_nom, ps_prenom, ps_motdepasse, ps_statut, ps_idMatiere) VALUES ('Buer', 'Micheline', 'testMicheline', 'Principal', NULL);
INSERT INTO Matieres (mt_nom) VALUES ('Mathématiques');
INSERT INTO Matieres (mt_nom) VALUES ('Informatique');
INSERT INTO Classes (cl_nom, cl_IdProf) VALUES ('Terminale', 1);
INSERT INTO Classes (cl_nom, cl_IdProf) VALUES ('1ère', 2);
INSERT INTO Notes (nt_matiere, nt_idEleve, nt_resultat) VALUES (1, 1, 11);
INSERT INTO Notes (nt_matiere, nt_idEleve, nt_resultat) VALUES (1, 2, 15);
INSERT INTO Notes (nt_matiere, nt_idEleve, nt_resultat) VALUES (2, 3, 5);




