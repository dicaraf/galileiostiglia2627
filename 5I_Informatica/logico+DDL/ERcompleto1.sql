-- =========================================================
--  Schema logico e DDL di ERcompleto1 (prenotazioni sistema sanitario)
-- ========================================================= 

-- Presidi      (_IdPresidio_, Nome, Indirizzo, Citta)

--Ambulatori   (_IdAmbulatorio_, Codice, Piano, Stanza,
--               FKIdPresidio)
--
--Branche       (_IdBranca_, Descrizione)
--
--Medici       (_IdMedico_, Nome, Cognome, CodiceFiscale, NumeroAlbo,
--               Telefono, Email,
--               FKIdBranca)
--
--TipiVisita    (_CodVisita_, Descrizione, DurataMinuti, Ticket,
--               FKIdBranca)
--
--FasceOrarie  (_IdFascia_, Data, OraInizio,
--               FKIdMedico,
--               FKIdAmbulatorio,
--               FKCodVisita)
--
--Pazienti      (_CodiceFiscale_, Nome, Cognome, DataNascita, Sesso,
--               Indirizzo, Comune, Telefono, Email, CodEsenzione)
--
--Operatori     (_Matricola_, Nome, Cognome, Sportello)
--
--Prenotazioni  (_IdPrenotazione_, NRE, Priorita, DataOraPrenotazione, Stato,
--               FKCFPaziente,
--               FKIdFascia,
--               FKMatrOperatore)

-- =========================================================
--  DDL schema "Prenotazioni visite"
-- =========================================================

CREATE TABLE Presidio (
  IdPresidio  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Nome        VARCHAR(100) NOT NULL,
  Indirizzo   VARCHAR(150) NOT NULL,
  Citta       VARCHAR(100) NOT NULL
);

CREATE TABLE Ambulatorio (
  IdAmbulatorio  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Codice         VARCHAR(10)  NOT NULL,
  Piano          TINYINT      NOT NULL,
  Stanza         VARCHAR(10)  NOT NULL,
  IdPresidio     INT UNSIGNED NOT NULL,
  UNIQUE (IdPresidio, Codice),
  FOREIGN KEY (IdPresidio) REFERENCES Presidio (IdPresidio)
);

CREATE TABLE Branca (
  IdBranca     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Descrizione  VARCHAR(100) NOT NULL
);

CREATE TABLE Medico (
  IdMedico       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Nome           VARCHAR(50)  NOT NULL,
  Cognome        VARCHAR(50)  NOT NULL,
  CodiceFiscale  CHAR(16)     NOT NULL UNIQUE,
  NumeroAlbo     VARCHAR(20)  NOT NULL UNIQUE,
  Telefono       VARCHAR(20),
  Email          VARCHAR(100),
  IdBranca       INT UNSIGNED NOT NULL,
  FOREIGN KEY (IdBranca) REFERENCES Branca (IdBranca)
);

CREATE TABLE TipoVisita (
  CodVisita     VARCHAR(10)       PRIMARY KEY,
  Descrizione   VARCHAR(150)      NOT NULL,
  DurataMinuti  SMALLINT UNSIGNED NOT NULL CHECK (DurataMinuti > 0),
  Ticket        DECIMAL(6,2)      NOT NULL DEFAULT 0.00 CHECK (Ticket >= 0),
  IdBranca      INT UNSIGNED      NOT NULL,
  FOREIGN KEY (IdBranca) REFERENCES Branca (IdBranca)
);

CREATE TABLE FasciaOraria (
  IdFascia       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Data           DATE         NOT NULL,
  OraInizio      TIME         NOT NULL,
  IdMedico       INT UNSIGNED NOT NULL,
  IdAmbulatorio  INT UNSIGNED NOT NULL,
  CodVisita      VARCHAR(10)  NOT NULL,
  UNIQUE (IdMedico, Data, OraInizio),
  UNIQUE (IdAmbulatorio, Data, OraInizio),
  FOREIGN KEY (IdMedico)      REFERENCES Medico (IdMedico),
  FOREIGN KEY (IdAmbulatorio) REFERENCES Ambulatorio (IdAmbulatorio),
  FOREIGN KEY (CodVisita)     REFERENCES TipoVisita (CodVisita)
);

CREATE TABLE Paziente (
  CodiceFiscale  CHAR(16)       PRIMARY KEY,
  Nome           VARCHAR(50)    NOT NULL,
  Cognome        VARCHAR(50)    NOT NULL,
  DataNascita    DATE           NOT NULL,
  Sesso          ENUM('M', 'F') NOT NULL,
  Indirizzo      VARCHAR(150),
  Comune         VARCHAR(100),
  Telefono       VARCHAR(20),
  Email          VARCHAR(100),
  CodEsenzione   VARCHAR(10)    NULL
);

CREATE TABLE Operatore (
  Matricola  VARCHAR(10) PRIMARY KEY,
  Nome       VARCHAR(50) NOT NULL,
  Cognome    VARCHAR(50) NOT NULL,
  Sportello  VARCHAR(10)
);

CREATE TABLE Prenotazione (
  IdPrenotazione       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  NRE                  CHAR(15)     NOT NULL,  -- Numero Ricetta Elettronica
  Priorita             ENUM('U', 'B', 'D', 'P') NOT NULL,
  DataOraPrenotazione  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Stato                ENUM('prenotata', 'erogata', 'annullata')
                                    NOT NULL DEFAULT 'prenotata',
  CFPaziente           CHAR(16)     NOT NULL,
  IdFascia             INT UNSIGNED NOT NULL,
  MatrOperatore        VARCHAR(10)  NOT NULL,
  FOREIGN KEY (CFPaziente)    REFERENCES Paziente (CodiceFiscale),
  FOREIGN KEY (IdFascia)      REFERENCES FasciaOraria (IdFascia),
  FOREIGN KEY (MatrOperatore) REFERENCES Operatore (Matricola)
);