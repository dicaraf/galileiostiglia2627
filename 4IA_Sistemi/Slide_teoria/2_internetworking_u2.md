---
marp: true
theme: default
paginate: true
footer: 'Sistemi e Reti – Classe 4ª · Il Physical Layer del TCP/IP'
style: |
  section {
    font-size: 26px;
    padding: 50px 60px;
  }
  h1 {
    color: #1a3c6e;
    font-size: 44px;
  }
  h2 {
    color: #1a3c6e;
    font-size: 32px;
    border-bottom: 2px solid #dbe4f0;
    padding-bottom: 6px;
  }
  section.lead {
    background: #1a3c6e;
    color: white;
    text-align: center;
  }
  section.lead h1, section.lead h2 {
    color: white;
    border: none;
  }
  table {
    font-size: 22px;
    margin: 0 auto;
  }
  code {
    background: #eef2f8;
    color: #1a3c6e;
  }
  blockquote {
    border-left: 5px solid #1a3c6e;
    background: #f4f7fb;
    padding: 10px 20px;
    font-size: 22px;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  .small {
    font-size: 20px;
  }
---

<!-- _class: lead -->

# Il Physical Layer
## del TCP/IP

**Sistemi e Reti – Classe 4ª**
Il progetto IEEE 802, il livello Data Link (LLC/MAC), il controllo di flusso, Ethernet e Wi-Fi

---

<!-- _class: lead -->

# Il progetto IEEE 802

---

## Il progetto IEEE 802

- Nato nel **febbraio 1980**, sviluppato da **IEEE, ISO e ANSI**.
- Definisce servizi e protocolli delle reti **LAN** ai primi due livelli del modello ISO/OSI:
  - **Physical**
  - **Data Link**
- Ha identificato **20 categorie** (802.1, 802.3, 802.11, ...), una per ogni tecnologia di accesso al canale.
- È in continuo aggiornamento (es. 802.3 Ethernet, 802.11 Wi-Fi).
- Ha definito le regole per passare da una tecnologia all'altra.
- Ha delegato ad altri enti (**EIA, TIA**...) la standardizzazione di cavi e connettori del livello Physical.

> 💡 **Perché "802"?** È semplicemente il numero del comitato: la sigla nasce dal mese e anno di fondazione (febbraio 1980 → 80-2, il secondo comitato aperto quel mese).

---

## Il livello Physical

Si occupa delle tecniche di **accesso alla rete di comunicazione**:

- verifica che il canale sia libero prima di trasmettere (le trasmissioni broadcast condividono un unico canale);
- risolve i conflitti quando più stazioni vogliono accedere **contemporaneamente** al canale (**collisioni**).

L'**algoritmo di accesso** regola il diritto a trasmettere ed evita le collisioni. Due famiglie di tecniche:

| Tecnica | Caratteristica |
|---|---|
| **A contesa** | non si può prevedere quando/per quanto avverrà la trasmissione |
| **Deterministica** | è possibile prevedere la durata di occupazione del canale |

> 🔎 Analogia: in una stanza affollata, "a contesa" è come parlare quando capita e magari sovrapporsi a qualcun altro; "deterministica" è come alzare la mano e parlare solo quando viene dato il turno.

---

## Le tecniche a contesa

**CSMA/CD** (*Carrier Sense Multiple Access with Collision **Detection***)
- **rileva** e risolve le collisioni dopo che sono avvenute;
- usata nelle reti **Ethernet** (IEEE 802.3) con hub, tipicamente a 10 Mbps.

**CSMA/CA** (*Carrier Sense Multiple Access with Collision **Avoidance***)
- **previene** le collisioni prima che avvengano;
- usata nelle reti **Wi-Fi** (IEEE 802.11) — la vedremo in dettaglio più avanti.

## Le tecniche deterministiche

- Si basano su un **token** (gettone) che autorizza la trasmissione a chi lo possiede.
- Standard di riferimento: **Token Ring** (IEEE 802.5).

> ⚠️ Nel wireless non si possono "rilevare" le collisioni come nel cavo (per questo servono CD nel cablato e CA nel wireless): lo vedremo nella parte su Wi-Fi.

---

## Il livello Data Link

Il Progetto 802 lo suddivide in **due sottolivelli**:

| Sottolivello | Significato | Ruolo |
|---|---|---|
| **LLC** | Logical Link Control | controllo logico del collegamento |
| **MAC** | Media Access Control | controllo dell'accesso al mezzo |

```
        ┌───────────────────────┐
        │      Network (IP)     │
        ├───────────────────────┤
        │   LLC  (802.2)        │  ← sottolivello superiore
Data    ├───────────────────────┤
Link    │   MAC  (802.3/802.11) │  ← sottolivello inferiore
        ├───────────────────────┤
        │      Physical         │
        └───────────────────────┘
```

Questa suddivisione permette allo **stesso LLC** di funzionare sopra **MAC diversi** (Ethernet, Wi-Fi, ...): è ciò che rende i livelli superiori "indipendenti" dalla tecnologia fisica usata.

---

<!-- _class: lead -->

# I sottolivelli
# LLC e MAC

---

## Il sottolivello LLC (Logical Link Control)

- È il sottolivello **superiore** del Data Link.
- Fornisce un'interfaccia **unificata** al livello Network, indipendentemente dal tipo di rete o mezzo fisico.
- Può gestire il **controllo di flusso** dei dati.
- Identifica quale protocollo di livello superiore (es. IP) è in uso.

**Il frame LLC contiene:**
- **DSAP** (Destination Service Access Point): protocollo superiore **destinatario**;
- **SSAP** (Source Service Access Point): protocollo superiore **sorgente**;
- **Control** (1 o 2 byte);
- **Network PDU**.

| HEADER LLC | | | | |
|---|---|---|---|---|
| DSAP (1 byte) | SSAP (1 byte) | Control (1-2 byte) | … | NETWORK PDU |

---

## Il Campo Control

Lunghezza: **1 o 2 byte**. Ha **tre formati** diversi:

**I-frame** (*information*)
- trasporta dati in modalità **connessa**;
- trasporta anche un **ACK** per la direzione inversa, tecnica di **piggybacking** (il destinatario "aggancia" l'ACK al messaggio successivo invece di inviarlo a parte, risparmiando banda).

**S-frame** (*supervisor*)
- trasporta **solo informazioni di controllo** (ACK, controllo di flusso...).

**U-frame** (*unnumbered*)
- trasporta dati in modalità **non connessa**;
- messaggi di controllo del collegamento (inizializzazione, diagnostica...).

---

## Il Campo Network PDU

- Può avere **0 o più byte**: la lunghezza **non è stabilita a priori**.
- Il sottolivello **MAC potrebbe frammentare** PDU troppo grandi per adattarle al frame fisico.
- Contiene la **PDU**:
  - che il livello **Network** si aspetta di ricevere dal MAC in ricezione;
  - che il livello Network **invia** al MAC in trasmissione.

```
 Network (IP)
      │  PDU (pacchetto IP)
      ▼
 ┌─────────────────────────┐
 │  LLC header │ Network PDU│   ← il "Network PDU" qui è il pacchetto IP,
 └─────────────────────────┘      trattato come dato opaco dal LLC
```

> 💡 È lo stesso principio dell'**incapsulamento**: ogni livello vede il livello superiore come un semplice "carico" (payload) da trasportare, senza doverlo interpretare.

---

## Modalità di funzionamento dell'LLC

**Unacknowledged Connectionless Service**
- solo primitive di trasmissione dati (datagrammi indipendenti);
- **nessun ACK**, né controllo di errore o di flusso;
- servizio **non affidabile**, non orientato alla connessione, nessuna fase preliminare.

**Connection Oriented Service**
- primitive di trasferimento **+** apertura/chiusura connessione;
- controllo di errore, di flusso, e ordine dei pacchetti;
- servizio **affidabile** e orientato alla connessione, con ACK.

**Semireliable Connectionless Service**
- solo primitive di trasmissione dati;
- **non** connesso, ma **con ACK**;
- garantisce consegna ordinata, nessuna fase preliminare.

> 🔗 Ricorda qualcosa? È lo stesso schema concettuale di **UDP vs TCP** al livello Trasporto: qui però si applica al Data Link.

---

## Il sottolivello MAC (Media Access Control)

- È il sottolivello **inferiore** del Data Link.
- Si occupa dell'accesso al **mezzo trasmissivo condiviso**, arbitrando l'uso del canale tra più stazioni.
- Ogni tipo di rete/mezzo fisico (Ethernet, Wi-Fi...) ha un proprio **standard MAC specifico**.

**Il frame MAC contiene:**
- **Indirizzo MAC** del destinatario e del sorgente (indirizzi fisici delle schede di rete);
- **Campo LLC PDU**: contiene il frame LLC proveniente dal sottolivello superiore (**incapsulamento**);
- **FCS** (Frame Check Sequence): controllo errori tramite **CRC** (Cyclic Redundancy Check).

| HEADER MAC | | | | |
|---|---|---|---|---|
| Dest. (6 byte) | Sorg. (6 byte) | … | LLC PDU | FCS (4 byte) |

---

## Gli Indirizzi MAC

- Composto da **6 byte (48 bit)**, rappresentati con **12 cifre esadecimali**.
- Esempio: `08-00-2B-C4-BE-F3`

**Tre tipologie:**

| Tipo | Descrizione | Esempio |
|---|---|---|
| **Unicast** | identifica **una singola** stazione | `08-00-2B-C4-BE-F3` |
| **Multicast** | identifica **un gruppo** di stazioni (bit meno significativo del 1° byte = 1) | `FF-FF-FF-[0:F]X-XX-XX` |
| **Broadcast** | individua **tutti** gli host della rete | `FF-FF-FF-FF-FF-FF` |

**In Windows**, l'indirizzo MAC si visualizza con:
```
ipconfig /all
```
mostra, per ogni scheda di rete (Ethernet o wireless), il relativo indirizzo fisico. *(In Linux/macOS: `ip link` oppure `ifconfig`.)*

> 💡 Il MAC è "di fabbrica" e (di norma) univoco al mondo: i primi 3 byte (OUI) identificano il produttore della scheda, gli ultimi 3 il numero seriale.

---

## Incapsulamento nei modelli a strati

- Ogni livello/sottolivello **incapsula** la PDU ricevuta aggiungendo il proprio **header**.
- L'host destinatario **legge solo gli header** dei livelli corrispondenti, ignorando i dettagli degli altri.
- L'incapsulamento:
  - assicura che ogni livello gestisca **solo le proprie informazioni**;
  - garantisce **modularità e indipendenza** tra i livelli.

```
┌──────────────────────────────────────────────┐
│ MAC hdr │ LLC hdr │ IP hdr │ TCP hdr │  Dati  │ FCS
└──────────────────────────────────────────────┘
   802.3     802.2     IP        TCP     Applicazione
```

Ogni "scatola dentro la scatola" viene aperta un livello alla volta, salendo verso l'alto, esattamente come una lettera con più buste imbustate una dentro l'altra.

---
<!-- 
<!-- _class: lead -->

# Il controllo di flusso
## sliding window

---

## Il controllo di flusso

- Serve a evitare che il **mittente trasmetta troppo velocemente** rispetto al destinatario, con il rischio di perdere informazioni (il buffer di ricezione si riempie).
- I protocolli di controllo di flusso prevedono che il destinatario invii un **ACK** (acknowledge) per ogni ricezione corretta.

**Tecniche principali** (in ordine di evoluzione ed efficienza crescente):

1. **Stop and Wait**
2. Tecnica **a finestra** (window)
3. Tecnica **a finestra scorrevole** (sliding window) — la più usata oggi

> 🔎 Pensa a un dettato: se leggi troppo veloce rispetto a chi scrive, chi scrive perde delle parole. Il controllo di flusso è il meccanismo che regola "il ritmo di lettura" in base a quanto il destinatario riesce a tenere il passo.

---

## Tecnica Stop and Wait

- Il mittente invia un messaggio e **attende l'ACK** prima di inviare il successivo.
- Se l'ACK non arriva entro un **timeout**, il messaggio viene **ritrasmesso**.
- Usa un **numero di sequenza (0 o 1)** per distinguere i messaggi duplicati.

**Tre casi possibili:**

| Caso | Cosa succede |
|---|---|
| (a) trasferimento corretto | ACK ricevuto, si procede |
| (b) dati non arrivati | timeout → ritrasmissione |
| (c) ACK perso | il ricevitore riconosce il duplicato dal numero di sequenza |

**Criticità:** la scelta del timeout —
- troppo **breve** → duplicati inutili;
- troppo **lungo** → lentezza.

> ⚠️ Limite principale: il canale resta "fermo" mentre si aspetta l'ACK → **bassissima efficienza** su link con RTT alto.

---

## Tecnica a finestra (Window)

- Permette di inviare **più messaggi** (burst, raffica) prima di ricevere l'ACK.
- La **dimensione della finestra** (*w*, window size) indica il numero massimo di invii consecutivi prima di dover ricevere l'ACK.
- L'ACK riguarda **l'intera finestra**, non il singolo pacchetto.
- Prima di aprire una nuova finestra, il mittente deve attendere la conferma che **azzera** la finestra.

**Due meccanismi per gestire un messaggio errato:**

- **Go-Back-N**
- **Selective Repeat**

> 💡 Rispetto a Stop and Wait: invece di "un messaggio, un ACK, aspetta", si passa a "*w* messaggi, poi un ACK cumulativo" — molto più efficiente sui link veloci o a lunga distanza (satellitari, fibra intercontinentale).

---

## Go-Back-N vs Selective Repeat

**Go-Back-N**
- Il mittente invia fino a *N* messaggi, ne fa una copia e attiva un timer per ciascuno.
- Se scade un timeout prima dell'ACK, **ritrasmette tutti** i messaggi non confermati.
- Il ricevitore accetta **solo messaggi in sequenza** (scarta quelli fuori ordine).

**Selective Repeat**
- Si ritrasmettono **solo** i messaggi arrivati errati o mancanti.
- Il ricevitore può accettare e **memorizzare messaggi fuori sequenza**, finché non arrivano tutti.
- Richiede **più memoria** (buffer) per conservare i "buchi".

**Efficienza:**

| Tecnica | Efficienza |
|---|---|
| Stop and Wait | bassa |
| Go-Back-N | media |
| Selective Repeat | alta (ma più costosa in memoria e rielaborazione) |

---

## Tecnica a finestra scorrevole (Sliding Window)

- È l'**evoluzione** della finestra semplice: si muove **dinamicamente**.
- **Non impedisce** l'apertura di una nuova finestra mentre quella precedente è ancora aperta.

**Due buffer:**

**Buffer di trasmissione**
- sposta il lato **inferiore** (restringimento) di tante posizioni quanti sono gli invii fatti in quel burst;
- sposta il lato **superiore** (allargamento) di tante posizioni quante ne ha confermate con ACK, senza superare la dimensione della finestra.

**Buffer di ricezione**
- sposta il lato **inferiore** di tante posizioni quanti sono gli invii ricevuti in quel burst;
- sposta il lato **superiore** di tante posizioni quante ne ha confermate con ACK, senza mai superare il limite.

---

## Sliding Window – la numerazione

La dimensione della finestra (*w*) segue la regola:

$$w \le 2^n - 1$$

dove *n* è il numero di **bit** usati per numerare i pacchetti.

**Esempio pratico:** con *w = 7* → *n = 3* bit, si numera da 0 a 7 (`000, 001, … 111`); arrivati a 7 la sequenza **riparte da 0** (anche per la finestra del ricevitore).

- Se il trasmettitore fa un burst di **4 invii** e il ricevitore conferma (per ora) **solo il primo**, le finestre di trasmettitore e ricevitore restano **disallineate**.
- Se le finestre si azzerano completamente, la trasmissione si **blocca** finché non arrivano i riscontri.

**Protocollo "costoso" in risorse:**
- buffer di trasmissione: memorizza i messaggi in attesa di ACK;
- buffer di ricezione: conserva i messaggi fuori sequenza;
- a ogni ACK ricevuto: si liberano i buffer e si aggiorna la finestra.

> 🧮 Perché $2^n-1$ e non $2^n$? Con $n$ bit si hanno $2^n$ numeri di sequenza distinti: se la finestra fosse grande quanto l'intero spazio dei numeri, un vecchio pacchetto ritrasmesso potrebbe avere lo stesso numero di uno nuovo, creando ambiguità. Si "risparmia" quindi almeno un numero.

---

<!-- _class: lead -->

# IEEE 802.3
## la rete Ethernet

---

## Evoluzione dello standard IEEE 802.3

- **Ethernet** è il tipo di rete locale più diffuso al mondo.
- Nasce come LAN e nel **1985** diventa **IEEE 802.3** (ISO 8802).

**Evoluzione nel tempo:**

| Aspetto | Da | A |
|---|---|---|
| Mezzo fisico | cavo coassiale | doppino → fibra ottica |
| Velocità | 10 Mbps | decine di Gbps |
| Topologia | bus | stella / stella estesa |
| Duplex | half-duplex | full-duplex (niente collisioni!) |
| Dispositivo centrale | hub | switch (CSMA/CD → switching) |

**Nuove esigenze:** maggiore banda, ridondanza, determinismo → introduzione di **VLAN**, **link aggregation** e tecniche come le sliding window.

> 💡 Con lo **switch** ogni porta è un dominio di collisione a sé: in full-duplex non serve più CSMA/CD, perché trasmissione e ricezione viaggiano su coppie di fili separate.

---

## PoE (Power over Ethernet) – IEEE 802.3af

- Nato a inizio anni 2000, con l'affermarsi del **VoIP**, per **telealimentare i telefoni** senza alimentatori esterni.
- Permette di alimentare i dispositivi usando lo **stesso cavo** che li collega alla rete Ethernet, a condizione che sia di tipo **twisted-pair**.
- Usato soprattutto per dispositivi a **bassa potenza** (poche decine di watt): telecamere industriali, telefoni VoIP, webcam...

**Vantaggi:**
- un solo cavo per **dati e alimentazione**;
- alimenta apparati dove **non c'è una presa elettrica** (es. telecamere su un palo esterno);
- riduce cavi e prese elettriche richieste.

---

## PoE – Dispositivi coinvolti

- **PSE** (*Power Sourcing Equipment*): fornisce l'alimentazione — es. switch PoE o power injector.
- **PD** (*Powered Device*): viene alimentato — es. telefoni VoIP, AP Wi-Fi, webcam IP.
- **Splitter PoE**: ripartisce la potenza di un segnale in ingresso tra due o più collegamenti in uscita.

**Due configurazioni tipiche:**

| Configurazione | Uso |
|---|---|
| Switch **non-PoE** + Power Injector | invio dati e alimentazione al PD tramite iniettore separato |
| **Switch PoE** | invio dati e alimentazione al PD direttamente dalla porta |

---

## PoE+ (IEEE 802.3at)

Evoluzione del PoE:
- standard **IEEE 802.3at**;
- alimentazione fornita **quasi doppia** sul medesimo cavo (~30 W contro i ~15,4 W del PoE originale).

**Compatibilità:**

| PSE | Può alimentare |
|---|---|
| **PoE+** | dispositivi PoE **e** PoE+ |
| **PoE** | solo dispositivi PoE |

> 💡 La compatibilità è retroattiva (un PSE più potente può sempre alimentare un PD più "semplice"), ma non il contrario: un PD PoE+ collegato a un PSE PoE potrebbe non ricevere potenza sufficiente.

---

## Il frame Ethernet – I formati

- Lunghezza **variabile tra 64 e 1518 ottetti (byte)**, preceduti da un **preambolo** e un **byte di start**.
- **Due formati** convivono ancora oggi sulle reti Ethernet:
  - **Ethernet v2.0**
  - **IEEE 802.3**

**Reti miste, oggi molto comuni:**
- hardware conforme allo standard **IEEE 802.3**, in continua evoluzione di velocità;
- ma frame con formato **Ethernet v2.0**;
- le schede di rete, in ricezione, sono in grado di **distinguere e trattare entrambi** i tipi di frame.

---

## Il frame Ethernet – I campi

| Campo | Descrizione |
|---|---|
| **Preamble** | 7 byte uguali (`10101010`), per la sincronizzazione del destinatario |
| **SFD** (Start Frame Delimiter) | 1 byte (`11010101`), indica l'inizio del frame |
| **Destination Address** | indirizzo fisico del destinatario |
| **Source Address** | indirizzo fisico del sorgente |
| **Type** | codice del protocollo di livello superiore che ha generato il campo Data |
| **Data** | dati da trasmettere |
| **FCS** | bit di controllo CRC per la rilevazione degli errori |

---

## Il frame Ethernet – differenze IEEE 802.3

Rispetto al frame Ethernet v2.0, il frame **IEEE 802.3** ha due campi diversi:

**Length** al posto del campo **Type**:
- contiene la **lunghezza in byte** del campo Data successivo;
- il campo Length assume valori **0-1500**, mentre le codifiche di Type sono tutte **≥ 1536** — è così che la scheda distingue i due formati!

**PAD**:
- contiene una sequenza riempitiva;
- garantisce che la **lunghezza minima del frame sia 64 byte** (anche a campo dati vuoto), per distinguerlo da un frammento di frame dovuto a una collisione.

> 📦 I campi **Data + PAD** sono chiamati insieme **Payload** (carico utile).

---

## Il frame Ethernet – Wire speed

- In entrambi i formati manca un segnalatore di **fine frame**: il termine è determinato dall'**Inter-Frame Spacing (IFS)**.
- L'IFS definisce lo spazio temporale minimo tra due frame consecutivi:
  - valore standard minimo: **96 bit time**;
  - durata in base alla velocità: **10 Mbps → 9,6 μs**; **100 Mbps → 960 ns**...

**Wire speed:** trasmissione alla massima efficienza possibile, con IFS minimo e pacchetti minimi (64 byte). Si esprime in **pps** (*packets per second*).

**Esempio numerico** (100 Mbps, frame minimo):
- frame di 64 byte = 512 bit → tempo di trasmissione = 512 bit / 100 Mbps = **5,12 μs**
- + IFS di 960 ns = 0,96 μs → tempo totale per frame ≈ **6,08 μs**
- pps ≈ 1 / 6,08 μs ≈ **164 500 pacchetti al secondo**

---

<!-- _class: lead -->

# IEEE 802.11
## la rete Wi-Fi

---

## Gli standard wireless

Lo standard **802.11** (1997) ebbe successo solo dopo il **1999**, con due nuovi standard:

**802.11a**
- velocità: **54 Mbps** a **5,2 GHz**;
- tecniche di modulazione più versatili (**QAM-64**).

**802.11b**
- velocità: solo **11 Mbps**;
- banda **2,4 GHz**, nota come **ISM** (Industrial, Scientific and Medical);
- primo standard noto commercialmente come **"Wi-Fi"** (Wireless Fidelity).

**802.11g** (2003), evoluzione di 802.11b:
- **54 Mbps** a **2,4 GHz** (stessa banda ISM);
- **retrocompatibile** con i dispositivi 802.11b, operando nella stessa rete.

> 💡 Da qui in poi la famiglia continua con 802.11n, ac, ax (Wi-Fi 6)... ma il programma si concentra su questi standard fondativi.

---

## Canali e la "regola del 5"

Gli standard **802.11b** e **802.11g** dividono lo spettro in **14 sottocanali** (13 utilizzabili in Europa):
- larghezza di banda: **22 MHz** (802.11b) o **20 MHz** (802.11g);
- intervallo: **2.412 – 2.484 MHz**.

- I canali sono **parzialmente sovrapposti** → tra due canali consecutivi c'è forte **interferenza**.
- In presenza di più reti wireless nella banda 2,4 GHz, per evitare sovrapposizioni si usa la **regola del 5**: si usano due gruppi di canali distanti cinque: **1-6-11** e **2-7-12**.

> 🔎 È il motivo per cui, configurando un router Wi-Fi in banda 2,4 GHz, conviene impostare manualmente il canale su 1, 6 o 11: sono gli unici tra loro completamente non sovrapposti.

---

## LAN wireless e wired

Le reti wireless si realizzano con **due dispositivi**:

- **Wireless Terminal (WT)**: dispositivi mobili (notebook, tablet, smartphone...) o fissi (PC, stampanti di rete);
- **Access Point (AP)**:
  - sono dei **bridge** che collegano la parte cablata (wired) con la parte wireless;
  - consentono ai WT di collegarsi alla rete wireless (agiscono quindi da **gateway** verso la LAN cablata).

Le reti LAN attuali sono **tutte** realizzate combinando gli standard **Ethernet** e **Wi-Fi**: la rete "core" resta cablata (per affidabilità e velocità), mentre l'accesso agli utenti è spesso wireless.

---

## Problematiche delle LAN wireless

- Nelle trasmissioni wireless **non è possibile rilevare le collisioni** (Collision Detection) come nel cavo.
- Tecniche come **CSMA/CD** delle reti Ethernet **non sono applicabili** ai dispositivi **half-duplex** (tipico delle trasmissioni via etere: non si può ascoltare e trasmettere sulla stessa frequenza contemporaneamente).
- Le collisioni vanno quindi **evitate a priori**.

**Ascolto del canale** (metodo più semplice, non sempre sufficiente):
- ogni stazione ascolta il canale prima di trasmettere;
- se il canale è libero, può trasmettere.

**Due scenari in cui l'ascolto del canale non basta:**
- la **stazione esposta**;
- la **stazione nascosta**.

---

## Problema della stazione esposta

Quattro stazioni **A, B, C, D**, con i raggi d'azione di B e C mostrati in figura.

**Supponiamo:**
- B trasmette ad A;
- C vuole trasmettere a D.

**Ascoltando il canale:**
- C sente la trasmissione di B → crede che il canale sia occupato;
- C **non trasmette**.

**In realtà:** D è fuori della portata di B e A è fuori della portata di C → le trasmissioni **potrebbero coesistere** senza interferenza! Si perde quindi un'opportunità di trasmissione (inefficienza per "eccesso di prudenza").

**Soluzione:** progettazione fisica accurata (posizionamento delle stazioni nei rispettivi raggi d'azione).

---

## Problema della stazione nascosta

Tre stazioni **A, B, C**, con i raggi d'azione di A e C mostrati in figura.

**Supponiamo:**
- A trasmette a B.

**Ascoltando il canale:**
- C **non sente** la trasmissione di A → crede che il canale sia libero;
- C trasmette → **collisione su B**.

**In realtà:** C trasmette ma disturba la trasmissione di A, impedendo a B di riceverla correttamente. A e C devono **ritrasmettere** (inefficienza per **mancata rilevazione** del pericolo).

**Soluzione per ridurre le collisioni:** **CSMA/CA** (Carrier Sense Multiple Access with Collision **Avoidance**).

> ⚖️ Nota il contrasto con la stazione esposta: lì il problema è "vedere un ostacolo che non c'è davvero", qui è l'opposto — "non vedere un ostacolo che c'è".

---

## Carrier Sensing Virtuale (RTS/CTS)

- Il mittente invia un **RTS** (*Request To Send*) con la durata prevista della trasmissione.
- Il destinatario risponde con **CTS** (*Clear To Send*), confermando l'informazione sulla durata.
- **Tutte** le stazioni che ricevono RTS o CTS **sospendono** le proprie trasmissioni per quel tempo (anche quelle "nascoste" rispetto al mittente, ma che sentono il CTS del destinatario!).

Riduce le collisioni, ma **non garantisce** la mutua esclusione (RTS/CTS non sono istantanei: può comunque verificarsi una collisione tra due RTS inviati nello stesso istante).

> 🔎 RTS/CTS risolve proprio il problema della stazione nascosta: anche se C non sente A, sente il CTS di B e si tiene in silenzio.

---

## CSMA/CA (Collision Avoidance)

Tecnica di accesso al canale usata nelle **WLAN** (IEEE 802.11).

**Passaggi principali:**

1. **Ascolto del canale**;
2. Intervallo di tempo **AIFS** (*Arbitration Inter-Frame Space*): il trasmettitore attende, per verificare che sul canale non ci siano altri frame RTS o CTS;
3. Se il **CTS non arriva**, significa che un'altra stazione sta tentando di trasmettere (collisione rilevata **indirettamente**, non "vista" come nel cavo) → viene avviato un **algoritmo di backoff esponenziale binario**.

---

## Algoritmo di Backoff Esponenziale Binario

- Si basa su una **finestra di contesa** (*slotted backoff window*): una finestra composta da un certo numero di **Slot Time**, indicata con **CW** (Contention Window):
  - CW minimo = **7**, CW massimo = **255**.
- L'algoritmo sceglie **casualmente** uno degli slot entro il limite CW e attende (AIFS).

**Se la collisione persiste:**
- prima di ritentare, il mittente **raddoppia** la dimensione della finestra di contesa, poi ripete l'algoritmo di backoff.

**Dopo una trasmissione corretta:**
- CW torna a **7**.

**Scopo:** ridurre la probabilità che **due stazioni scelgano lo stesso Slot Time**, minimizzando le collisioni.

> 🧮 Esempio: 1° tentativo fallito → CW passa da 7 a 15; 2° fallimento → da 15 a 31; e così via fino al massimo di 255. È lo stesso principio usato da TCP per il controllo della congestione (backoff esponenziale).

---

<!-- _class: lead -->

# Riepilogo

---

## Mappa concettuale della lezione

```
Livello Data Link (Progetto IEEE 802)
│
├── LLC (802.2) ── interfaccia unificata verso Network
│     └── Control: I-frame / S-frame / U-frame
│     └── 3 servizi: Unack. Connectionless | Connection Oriented | Semireliable
│
├── MAC ── accesso al mezzo condiviso, indirizzi fisici a 48 bit
│     ├── 802.3 Ethernet ── CSMA/CD, switch, PoE/PoE+, frame v2.0 vs 802.3
│     └── 802.11 Wi-Fi   ── CSMA/CA, RTS/CTS, backoff esponenziale
│
└── Controllo di flusso ── Stop&Wait → Window → Sliding Window
      (Go-Back-N / Selective Repeat, regola w ≤ 2ⁿ-1)
```

**Parole chiave da ricordare:** LLC/MAC · DSAP/SSAP · indirizzo MAC (unicast/multicast/broadcast) · sliding window · CSMA/CD vs CSMA/CA · frame Ethernet (Type vs Length) · stazione nascosta/esposta · RTS/CTS · backoff esponenziale.

---

<!-- _class: lead -->

# Domande?
