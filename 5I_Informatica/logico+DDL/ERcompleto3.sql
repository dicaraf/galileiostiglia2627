-- =========================================================
--  Schema logico e DDL di ERcompleto3 (riviste e articoli scientifici)
-- =========================================================

--Rivista    (_ISSN_, Titolo, Editore, Periodicita, Formato, SitoWeb)
--
--
--Numero     (_FKISSN_, _Anno_, _NumProgressivo_, DataUscita)
--
--
--Articolo   (_IdArticolo_, Titolo, Abstract, PaginaIniziale, PaginaFinale,
--            DOI, Link,
--            FKISSNNumero, FKAnnoNumero, FKNumProgressivoNumero,
--            FKCodArgomentoPrincipale)
--
--
--Autore     (_IdAutore_, Nome, Cognome, Email, Ente)
--
--
--Firma      (_FKIdArticolo_, _FKIdAutore_, Posizione)
--
--
--Argomento  (_CodArgomento_, Descrizione)
--
--
--Tratta     (_IdArticolo_ FK_Articolo, _FKCodArgomento_)
--

-- =========================================================
--  DDL schema "Riviste scientifiche"
-- =========================================================

DROP DATABASE IF EXISTS riviste;
CREATE DATABASE riviste
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE riviste;

CREATE TABLE Rivista (
  ISSN         CHAR(9)      PRIMARY KEY,  
  Titolo       VARCHAR(200) NOT NULL,
  Editore      VARCHAR(100),
  Periodicita  VARCHAR(30),
  Formato      ENUM('cartacea', 'online', 'entrambi') NOT NULL,
  SitoWeb      VARCHAR(255)
);

CREATE TABLE Numero (
  ISSN            CHAR(9)           NOT NULL,
  Anno            YEAR              NOT NULL,
  NumProgressivo  SMALLINT UNSIGNED NOT NULL,
  DataUscita      DATE              NOT NULL,
  PRIMARY KEY (ISSN, Anno, NumProgressivo),
  CHECK (YEAR(DataUscita) = Anno),
  FOREIGN KEY (ISSN) REFERENCES Rivista (ISSN)
);

CREATE TABLE Argomento (
  CodArgomento  VARCHAR(10)  PRIMARY KEY,
  Descrizione   VARCHAR(100) NOT NULL
);

CREATE TABLE Articolo (
  IdArticolo              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Titolo                  VARCHAR(300)      NOT NULL,
  Abstract                TEXT,
  PaginaIniziale          SMALLINT UNSIGNED,
  PaginaFinale            SMALLINT UNSIGNED,
  DOI                     VARCHAR(100)      NULL UNIQUE,
  Link                    VARCHAR(255),
  ISSN                    CHAR(9)           NOT NULL,
  Anno                    YEAR              NOT NULL,
  NumProgressivo          SMALLINT UNSIGNED NOT NULL,
  CodArgomentoPrincipale  VARCHAR(10)       NOT NULL,
  CHECK (PaginaFinale >= PaginaIniziale),
  FOREIGN KEY (ISSN, Anno, NumProgressivo)
    REFERENCES Numero (ISSN, Anno, NumProgressivo),
  FOREIGN KEY (CodArgomentoPrincipale) REFERENCES Argomento (CodArgomento)
);

CREATE TABLE Autore (
  IdAutore  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Nome      VARCHAR(50)  NOT NULL,
  Cognome   VARCHAR(50)  NOT NULL,
  Email     VARCHAR(100),
  Ente      VARCHAR(150)
);

CREATE TABLE Firma (
  IdArticolo  INT UNSIGNED     NOT NULL,
  IdAutore    INT UNSIGNED     NOT NULL,
  Posizione   TINYINT UNSIGNED NOT NULL CHECK (Posizione > 0),
  PRIMARY KEY (IdArticolo, IdAutore),
  UNIQUE (IdArticolo, Posizione),
  FOREIGN KEY (IdArticolo) REFERENCES Articolo (IdArticolo),
  FOREIGN KEY (IdAutore)   REFERENCES Autore (IdAutore)
);

CREATE TABLE Tratta (
  IdArticolo    INT UNSIGNED NOT NULL,
  CodArgomento  VARCHAR(10)  NOT NULL,
  PRIMARY KEY (IdArticolo, CodArgomento),
  FOREIGN KEY (IdArticolo)   REFERENCES Articolo (IdArticolo),
  FOREIGN KEY (CodArgomento) REFERENCES Argomento (CodArgomento)
);