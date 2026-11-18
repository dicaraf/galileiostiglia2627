-- =========================================================
--  Schema logico e DDL di ERcompleto2 (magazzino ricambi auto)
-- =========================================================
--
--Categoria       (_CodCategoria_, Descrizione)
--
--Articolo        (_CodArticolo_, CodiceOE, Descrizione, Marca, PrezzoVendita,
--                 Giacenza, ScortaMinima, Scaffale, Ripiano,
--                 FK_CodCategoria)
--
--ModelloVeicolo  (_CasaCostruttrice_, _NomeModello_, _AnnoInizio_, AnnoFine)
--
--Compatibilita   (_FKCodArticolo_,
--                 _FKCasaCostruttriceVeicolo_, _FKNomeModelloVeicolo_, _FKAnnoInizioVeicolo_)
--
--Fornitore       (_PartitaIVA_, RagioneSociale, Indirizzo, Telefono, Email)
--
--Fornitura       (_FKPartitaIVAFornitore_, _FKCodArticolo_,
--                 PrezzoAcquisto, GiorniConsegna)
--
--Ordine          (_NumOrdine_, DataEmissione, Stato,
--                 FKPartitaIVAFornitore)
--
--RigaOrdine      (_FKNumOrdine_, _FKCodArticolo_,
--                 Quantita, PrezzoUnitario)
--
--Cliente         (_CodCliente_, Nominativo, CF_PIVA, Tipo, Indirizzo,
--                 Telefono, Email, PercSconto)
--
--Fattura         (_NumFattura_, _Anno_, DataFattura,
--                 FKCodCliente)
--
--RigaFattura     (_FKNumFattura_, _FKAnnoFattura_, _FKCodArticolo_,
--                 Quantita, PrezzoApplicato)
--

-- =========================================================
--  DDL schema "Ricambi auto"
-- =========================================================

DROP DATABASE IF EXISTS ricambi;
CREATE DATABASE ricambi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE ricambi;

CREATE TABLE Categoria (
  CodCategoria  VARCHAR(10)  PRIMARY KEY,
  Descrizione   VARCHAR(100) NOT NULL
);

CREATE TABLE Articolo (
  CodArticolo    VARCHAR(20)       PRIMARY KEY,
  CodiceOE       VARCHAR(30),
  Descrizione    VARCHAR(150)      NOT NULL,
  Marca          VARCHAR(50),
  PrezzoVendita  DECIMAL(8,2)      NOT NULL,
  Giacenza       INT               NOT NULL DEFAULT 0 CHECK (Giacenza >= 0),
  ScortaMinima   INT               NOT NULL DEFAULT 0 CHECK (ScortaMinima >= 0),
  Scaffale       VARCHAR(10),
  Ripiano        VARCHAR(10),
  CodCategoria   VARCHAR(10)       NOT NULL,
  FOREIGN KEY (CodCategoria) REFERENCES Categoria (CodCategoria)
);

CREATE TABLE ModelloVeicolo (
  CasaCostruttrice  VARCHAR(50) NOT NULL,
  NomeModello       VARCHAR(50) NOT NULL,
  AnnoInizio        YEAR        NOT NULL,
  AnnoFine          YEAR        NULL,       -- NULL = ancora in produzione
  PRIMARY KEY (CasaCostruttrice, NomeModello, AnnoInizio),
  CHECK (AnnoFine IS NULL OR AnnoFine >= AnnoInizio)
);

CREATE TABLE Compatibilita (
  CodArticolo       VARCHAR(20) NOT NULL,
  CasaCostruttrice  VARCHAR(50) NOT NULL,
  NomeModello       VARCHAR(50) NOT NULL,
  AnnoInizio        YEAR        NOT NULL,
  PRIMARY KEY (CodArticolo, CasaCostruttrice, NomeModello, AnnoInizio),
  FOREIGN KEY (CodArticolo) REFERENCES Articolo (CodArticolo),
  FOREIGN KEY (CasaCostruttrice, NomeModello, AnnoInizio)
    REFERENCES ModelloVeicolo (CasaCostruttrice, NomeModello, AnnoInizio)
);

CREATE TABLE Fornitore (
  PartitaIVA      CHAR(11)     PRIMARY KEY,
  RagioneSociale  VARCHAR(100) NOT NULL,
  Indirizzo       VARCHAR(150),
  Telefono        VARCHAR(20),
  Email           VARCHAR(100)
);

CREATE TABLE Fornitura (
  PartitaIVA      CHAR(11)          NOT NULL,
  CodArticolo     VARCHAR(20)       NOT NULL,
  PrezzoAcquisto  DECIMAL(8,2)      NOT NULL,
  GiorniConsegna  SMALLINT UNSIGNED,
  PRIMARY KEY (PartitaIVA, CodArticolo),
  FOREIGN KEY (PartitaIVA)  REFERENCES Fornitore (PartitaIVA),
  FOREIGN KEY (CodArticolo) REFERENCES Articolo (CodArticolo)
);

CREATE TABLE Ordine (
  NumOrdine      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  DataEmissione  DATE         NOT NULL,
  Stato          ENUM('emesso', 'consegnato') NOT NULL DEFAULT 'emesso',
  PartitaIVA     CHAR(11)     NOT NULL,
  FOREIGN KEY (PartitaIVA) REFERENCES Fornitore (PartitaIVA)
);

CREATE TABLE RigaOrdine (
  NumOrdine       INT UNSIGNED NOT NULL,
  CodArticolo     VARCHAR(20)  NOT NULL,
  Quantita        INT          NOT NULL CHECK (Quantita > 0),
  PrezzoUnitario  DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (NumOrdine, CodArticolo),
  FOREIGN KEY (NumOrdine)   REFERENCES Ordine (NumOrdine),
  FOREIGN KEY (CodArticolo) REFERENCES Articolo (CodArticolo)
);

CREATE TABLE Cliente (
  CodCliente  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Nominativo  VARCHAR(100) NOT NULL,
  CF_PIVA     VARCHAR(16)  NOT NULL UNIQUE,
  Tipo        ENUM('privato', 'officina') NOT NULL,
  Indirizzo   VARCHAR(150),
  Telefono    VARCHAR(20),
  Email       VARCHAR(100),
  PercSconto  DECIMAL(5,2) NULL CHECK (PercSconto BETWEEN 0 AND 100),
  CHECK (PercSconto IS NULL OR Tipo = 'officina')
);

CREATE TABLE Fattura (
  NumFattura   INT UNSIGNED NOT NULL,
  Anno         YEAR         NOT NULL,
  DataFattura  DATE         NOT NULL,
  CodCliente   INT UNSIGNED NOT NULL,
  PRIMARY KEY (NumFattura, Anno),
  FOREIGN KEY (CodCliente) REFERENCES Cliente (CodCliente)
);

CREATE TABLE RigaFattura (
  NumFattura       INT UNSIGNED NOT NULL,
  Anno             YEAR         NOT NULL,
  CodArticolo      VARCHAR(20)  NOT NULL,
  Quantita         INT          NOT NULL CHECK (Quantita > 0),
  PrezzoApplicato  DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (NumFattura, Anno, CodArticolo),
  FOREIGN KEY (NumFattura, Anno) REFERENCES Fattura (NumFattura, Anno),
  FOREIGN KEY (CodArticolo)      REFERENCES Articolo (CodArticolo)
);