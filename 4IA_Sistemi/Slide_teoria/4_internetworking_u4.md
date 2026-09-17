---
marp: true
theme: default
paginate: true
footer: 'Sistemi e Reti – Classe 4ª · Il Network Layer del TCP/IP'
style: |
  section {
    font-size: 25px;
    padding: 50px 60px;
  }
  h1 {
    color: #1a3c6e;
    font-size: 44px;
  }
  h2 {
    color: #1a3c6e;
    font-size: 30px;
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
    font-size: 21px;
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
    font-size: 21px;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  .small {
    font-size: 19px;
  }
---

<!-- _class: lead -->

# Il Network Layer
## del TCP/IP

**Sistemi e Reti – Classe 4ª**
Routing e forwarding, il protocollo IPv4, gli indirizzi IP, CIDR, subnetting FLSM/VLSM e supernetting

---

<!-- _class: lead -->

# Le funzionalità
## del livello Network

---

## Le funzionalità del livello Network

Il **Network Layer** garantisce che i pacchetti viaggino correttamente dal computer mittente al destinatario, sfruttando i servizi del livello Physical. Svolge **due funzioni essenziali**:

**Routing**
- decide **quale percorso** debbano seguire i dati, scegliendo il percorso (*route*) migliore tramite appositi algoritmi, con alternative in caso di guasti;
- coinvolge gli **altri router** della rete per determinare un percorso; implementato a livello **software**.

**Forwarding**
- una volta definito il percorso, ogni router instrada i pacchetti dalla linea in ingresso (*input link*) verso la linea di trasmissione corretta (*output link*) per raggiungere il router successivo (*next hop*);
- è un'azione **"locale"** al router, spesso svolta a livello **hardware**.

> 🔎 Analogia: il **routing** è come studiare la cartina e scegliere il percorso migliore per un viaggio; il **forwarding** è come, arrivati a ogni incrocio, decidere semplicemente "giro a destra o a sinistra" seguendo il cartello — una decisione rapida e locale.

---

## Le reti SDN

- Le reti **SDN** (*Software-Defined Networking*) centralizzano il controllo su **server dedicati**, ma non sono applicabili a **Internet** per limiti di **scalabilità** (capacità della rete di crescere/diminuire in base alle necessità) e **autonomia decisionale**.

**Internet, a differenza di una rete SDN, è un insieme di reti interconnesse:**
- **non** può essere gestita come una rete SDN, ma come una rete tradizionale a **controllo distribuito**, in cui i router stabiliscono i percorsi e inoltrano i pacchetti;
- è composta da molti **Autonomous System (AS)**, come le reti di ISP o cloud provider. Gli AS comunicano tramite protocolli di routing come **BGP**, per costruire la "rete delle reti";
- ogni router crea una **routing table**, usata per definire i percorsi; da questa deriva la **forwarding table**, progettata per essere consultata **rapidamente** durante l'inoltro.

---

## Le funzioni del Control plane e del Data plane

**Control plane**
- implementa le funzioni di **routing**;
- costruisce dinamicamente la **routing table**, che fornisce una visione globale della rete (come una mappa);
- gestisce molti dati e calcoli complessi.

**Data plane**
- implementa il **forwarding**;
- usa la routing table per generare la **forwarding table**, più piccola e ottimizzata per decisioni rapide;
- determina tramite quale interfaccia inoltrare ogni pacchetto ricevuto.

```
        CONTROL PLANE                 DATA PLANE
   (routing, "il cervello")      (forwarding, "i riflessi")
   Routing Table  ───calcola───▶  Forwarding Table
   (globale, complessa)          (locale, rapida da consultare)
```

> 💡 È la stessa distinzione tra **routing** e **forwarding** vista prima, ma applicata all'architettura hardware/software del router.

---

## Servizi e protocolli

**I servizi del Network Layer:**
- può offrire servizi **connessi** (*connection-oriented*) tramite **circuiti virtuali** (stesso percorso per tutti i pacchetti — es. X.25, Frame Relay, ATM);
- può offrire servizi **non connessi** (*connectionless*), tipici delle reti TCP/IP, dove ogni pacchetto può seguire un cammino diverso;
- **IP** (Internet Protocol) è il protocollo principale, responsabile del trasferimento nelle reti WAN;
- **ARP, ICMP** e i protocolli di routing sono protocolli di **controllo**.

**Il Network Layer:**
- è il primo livello dello stack TCP/IP che garantisce la **connettività WAN**, permettendo la comunicazione tra reti geograficamente distanti;
- identifica ogni host in modo univoco tramite **indirizzi logici**: in IP, l'identificatore è l'**IP address**.

**I protocolli del Network Layer** devono conoscere la **topologia della rete**, per scegliere dinamicamente il percorso migliore e gestire reti eterogenee a livello Physical.

---

<!-- _class: lead -->

# Il protocollo IPv4

---

## L'Internet Protocol (IP)

- Il protocollo IP è stato specificato nel **1981**, pubblicato in **RFC 791**, poi aggiornato dagli RFC 1349, 2474, 6864.
- IP gestisce **indirizzamento**, **suddivisione in pacchetti** e **trasferimento** dei dati ricevuti dal Transport Layer.

**È un protocollo *connectionless*:**
- gli host possono scambiarsi PDU **senza stabilire una connessione**;
- la consegna **non è garantita**;
- se un'applicazione richiede affidabilità, interviene un protocollo di livello **Transport** (es. TCP);
- la PDU di IP è chiamata **IP datagram** (nell'RFC), comunemente detta **packet**.

> 🔗 Ricorda l'analogia già vista con LLC (Unit 2): "connectionless, nessuna garanzia di consegna" è esattamente lo stesso schema di **UDP** — e infatti IP fa da base sia a TCP che a UDP.

---

## L'header IPv4

Un pacchetto IPv4 è formato da:
- un **header** (intestazione) di lunghezza minima **20 byte**;
- un **payload** (carico utile) che contiene:
  - i dati dal livello Transport (TCP o UDP) da consegnare al destinatario;
  - altri dati, come pacchetti di controllo rete o dati da protocolli di routing/diagnostica.

**Dimensione massima teorica** di un pacchetto IP (header + payload): **65.535 byte**
(il campo Total Length dell'header è **16 bit** → $2^{16}$ valori rappresentabili → interi da 0 a 65.535).

```
┌───────────────────────────────┬─────────────────────────────┐
│   HEADER (min. 20 byte)        │   PAYLOAD (dati TCP/UDP...)  │
└───────────────────────────────┴─────────────────────────────┘
        max totale: 65.535 byte (2¹⁶ − 1... in realtà 2¹⁶ = 65.536 valori, da 0 a 65.535)
```

---

## L'header IPv4 – Version, IHL, DSCP, ECN, Total Length

| Campo | Bit | Descrizione |
|---|---|---|
| **Version** | 4 | versione del protocollo IP; se l'host destinatario non gestisce quella versione, il pacchetto viene **scartato** |
| **IHL** (Internet Header Length) | 4 | lunghezza dell'header IP, espressa in **word** (gruppi di 32 bit = 4 byte) |
| **DSCP** (Differentiated Services Code Point) | 6 | indica agli apparati di rete come **trattare** il pacchetto (priorità/QoS) |
| **ECN** (Explicit Congestion Notification) | 2 | notifica *end-to-end* della congestione di rete, per evitare la perdita di pacchetti |
| **Total Length** | 16 | lunghezza totale (header + payload) del datagram, in byte |

> 🧮 Esempio: se IHL = 5, la lunghezza dell'header è $5 \times 4 = 20$ byte, cioè il minimo standard (nessuna opzione presente).

---

## L'header IPv4 – i campi per la frammentazione

A volte serve dividere un datagram in pacchetti più piccoli, per attraversare una rete diversa da quella di provenienza (Ethernet, Wi-Fi, ecc.).

| Campo | Bit | Descrizione |
|---|---|---|
| **Identification (ID)** | 16 | identifica univocamente i frammenti dello stesso datagram, assegnando loro lo **stesso ID** |
| **Flags** | 3 | gestisce la frammentazione (vedi sotto) |
| **Fragment Offset** | 13 | offset del frammento, calcolato rispetto all'**inizio** del datagram originale |

**I 3 bit del campo Flags:**
- **Reserved** (1° bit): riservato, deve essere **0**;
- **Don't Fragment (DF)** (2° bit): se = 1, il datagram **non può** essere frammentato;
- **More Fragment (MF)** (3° bit): se = 1, il frammento è seguito da altri; solo **l'ultimo** frammento ha MF = 0.

---

## L'header IPv4 – TTL, Protocol, Header Checksum

| Campo | Bit | Descrizione |
|---|---|---|
| **TTL** (Time To Live) | 8 | numero massimo di **hop** (passaggi da router a router); decrementato a ogni passaggio; evita che un pacchetto circoli **all'infinito** |
| **Protocol** | 8 | protocollo di livello superiore usato per creare il payload (es. TCP=6, UDP=17); codice detto **Assigned Internet Protocol** (IANA) |
| **Header Checksum** | 16 | valore di controllo calcolato **solo sull'header**, per verificarne l'integrità |

> ⚠️ La **Header Checksum** viene **ricalcolata a ogni router** attraversato: l'header cambia sempre (il TTL viene decrementato a ogni hop!), quindi anche la checksum, che dipende dal contenuto dell'header, deve essere aggiornata di conseguenza.

---

## L'header IPv4 – indirizzi, Options e Padding

| Campo | Bit | Descrizione |
|---|---|---|
| **Source IP Address** | 32 | indirizzo IP del mittente |
| **Destination IP Address** | 32 | indirizzo IP del destinatario |
| **Options** | variabile | campo opzionale, non sempre presente |
| **Padding** | variabile | riempitivo, per rendere l'header multiplo di 32 bit |

**Formato Options, struttura TLV (Type-Length-Value):**
- **Option-type** (8 bit): Copy Flag (1 bit) + Option Class (2 bit) + Option Number (5 bit);
- **Option-length** (8 bit): lunghezza totale dell'opzione (incluso questo byte);
- **Option-data** (variabile): dati specifici dell'opzione (la parte *Value*); le opzioni sono registrate su **IANA**.

---

## Frammentazione e MTU

- L'**MTU** (*Maximum Transmission Unit*) definisce quanti byte possono viaggiare in un singolo frame **senza** dover frammentare il datagram (tipicamente **1500 byte** su Ethernet).

**La frammentazione presenta problemi in termini di:**
- **prestazioni**: frammentare e riassemblare richiede elaborazione, con rischio di perdere frammenti;
- **sicurezza**: può essere sfruttata in alcuni attacchi informatici.

**Strategie per evitarla:**
- **Path MTU Discovery**: stabilisce la dimensione massima del datagram per attraversare una rete senza essere frammentato;
- **negoziazione** tra host mittente e ricevente: definisce la massima dimensione del segmento TCP.

**Esempio di frammentazione:** un datagram di 4000 byte su una rete con MTU 1500 byte viene diviso in **3 frammenti** (≈1480 byte di dati utili ciascuno, per lasciare spazio all'header di 20 byte), tutti con lo stesso **ID**, e con **Fragment Offset** crescente per permettere il riassemblaggio corretto a destinazione.

---

<!-- _class: lead -->

# Gli indirizzi IPv4

---

## Gli indirizzi IPv4

- Il protocollo IP fornisce gli **indirizzi logici** degli host di una rete TCP/IP.
- Ad ogni host viene assegnato un indirizzo IP **univoco** nella rete in cui opera.
- Un indirizzo IP **non identifica un host**, ma una sua **interfaccia di rete**: se un host ha più interfacce, ognuna avrà un indirizzo diverso.

> 💡 Esempio: un computer può avere **due** interfacce di rete — una **wired** (802.3) e una **wireless** (802.11) — ciascuna con un proprio indirizzo IP distinto. È lo stesso motivo per cui uno smartphone ha un IP diverso quando è connesso al Wi-Fi rispetto a quando usa i dati mobili (4G/5G).

---

## La struttura degli indirizzi IP e la metodologia CIDR

**Gli indirizzi IPv4:**
- sono numeri a **32 bit**, divisi in **4 ottetti** (8 bit ciascuno);
- nelle raccomandazioni IETF si preferisce il termine **octet** (ottetto) anziché "byte", perché più preciso: un tempo esistevano architetture con byte non a 8 bit;
- sono espressi in **notazione decimale puntata**: quattro numeri da 0 a 255 (es. `192.168.1.12`);
- ogni ottetto corrisponde a un valore binario (es. `192` → `11000000`), separato da un punto.

**Esempio di conversione:**

```
   192      .    168      .     1      .     12
11000000    . 10101000    . 00000001   . 00001100
```

---

## Subnet e metodologia CIDR

I computer della stessa LAN hanno i **primi 3 ottetti** (i primi 24 bit) dell'indirizzo IP uguali:

| LAN | Prefisso |
|---|---|
| LAN1 | `192.168.1.x` |
| LAN2 | `192.168.2.x` |
| LAN3 | `192.168.3.x` |

- Anche l'indirizzo dell'interfaccia del **router** segue la numerazione della specifica LAN.
- La rete che interconnette l'interfaccia del router e i computer si chiama **subnet**: una porzione isolata (più semplice da gestire) di una rete IP.
- Dato che i primi 24 bit indicano la subnet, il valore (24) si scrive in fondo all'indirizzo separato da uno **slash** (*slash notation*): es. `192.168.1.0/24`.

```
              [Router]
           /      |      \
      LAN1 .1   LAN2 .1   LAN3 .1
   192.168.1.0/24  192.168.2.0/24  192.168.3.0/24
```

---

## Network ID e Host ID

Ogni indirizzo IPv4 è composto da **due parti**:
- **Network ID**: identifica la rete (es. `192.168.1`);
- **Host ID**: identifica l'host nella rete (es. `12`).

La pianificazione del confine tra Network ID e Host ID è **fondamentale**:
- più bit al Network ID → **piccole subnet** (pochi host ciascuna);
- meno bit al Network ID → **grandi subnet** (molti host ciascuna).

**Lo standard CIDR** (*Classless Inter-Domain Routing*):
- del **1993** (RFC 1519, aggiornato con RFC 4632);
- supera il vecchio indirizzamento **a classi** (*classful*);
- permette di allocare **blocchi contigui** di indirizzi (es. `192.168.1.0–192.168.1.255`);
- usa la *slash notation* per indicare la dimensione (**prefix**, *network prefix* o *prefix length*) del Network ID: es. `192.168.1.0/24` → prefix = 24 bit, i primi 24 bit identificano la rete.

---

## Subnet mask

- Sinonimo di **prefix**, a volte chiamata anche *netmask* o *mask* (termini ereditati dal classful).
- È una sequenza di **32 bit**: `1` = parte Network ID; `0` = parte Host ID.
- Copre la parte host e lascia visibile la parte rete; scritta in notazione decimale puntata (es. `255.255.255.0`).

**Esempio con prefix /24:**

```
Subnet mask (binario): 11111111.11111111.11111111.00000000
Subnet mask (decimale):     255  .    255  .    255   .   0
```

La subnet mask permette di ottenere l'**indirizzo di rete** applicando l'operatore logico **AND bit per bit** (*AND bitwise*) tra IP e subnet mask. Svolta in **hardware**, questa operazione permette ai router di instradare i pacchetti verso la rete corretta in modo velocissimo.

---

## Limite massimo di host per una subnet

**Calcolo dei bit disponibili** (esempio con prefix /24):
- n° bit totali IPv4: **32**
- n° bit subnet (prefix): **24**
- bit per gli host: $32 - 24 = 8$ bit

**Possibili combinazioni:**
- con 8 bit → $2^8 = 256$ indirizzi;
- **ma 2 indirizzi sono riservati**: `0` (indirizzo della subnet) e `255` (broadcast, es. `192.168.1.255`).

**Numero massimo di host utilizzabili:** $256 - 2 = \mathbf{254}$ host per subnet.

**La gerarchia degli indirizzi — Route summarization** (o *IP aggregation*/*supernetting*):
- meccanismo fondamentale del CIDR;
- organizza Internet in **blocchi gerarchici**: ogni blocco prende gli indirizzi da un blocco superiore più ampio;
- le reti più piccole possono essere viste come un'**unica rete più grande** ai fini del routing → riduce il numero di rotte da gestire, per un routing più semplice ed efficiente.

---

## La carenza degli indirizzi IPv4

- Numero massimo teorico: $2^{32} = \mathbf{4.294.967.296}$ indirizzi — ma non tutti sono utilizzabili, e lo spazio è diventato presto insufficiente con la crescita di Internet.

**Soluzioni intermedie — Indirizzi privati e Subnetting:**
- **FLSM** (maschera fissa);
- **VLSM** (maschera variabile);
- soluzioni nate negli anni '80 per ottimizzare l'uso degli indirizzi IP, poi rivelatesi insufficienti (le vedremo in dettaglio più avanti).

**La soluzione definitiva — IPv6:**
- nuovo protocollo per sostituire IPv4;
- indirizzi lunghi **128 bit**, espressi in esadecimale;
- $2^{128} \approx 3,4 \times 10^{38}$ indirizzi: uno spazio di indirizzamento vastissimo, con nuove funzionalità.

> 🧮 Per farsi un'idea della differenza: $2^{128}$ indirizzi equivalgono a più di **50 miliardi di miliardi** di indirizzi per ogni granello di sabbia sulla Terra.

---

## Gli esordi delle reti IP con l'indirizzamento classful

**Il classful addressing:**
- vecchia modalità di indirizzamento IP, con divisione **fissa** tra Network ID e Host ID;
- gli indirizzi di subnet con 8, 16 e 24 bit erano chiamati **classe A, classe B e classe C**;
- le classi **D** ed **E** erano riservate per altri scopi.

> ⚠️ Poco flessibile → oggi **superato** dal CIDR, ma resta utile per capire l'evoluzione dell'IP e perché certi range di indirizzi hanno un significato "storico" ancora oggi (es. il range privato `10.0.0.0/8` corrisponde esattamente all'intera vecchia classe A).

---

## Le cinque classi IPv4

| Classe | Primi bit | Range | Bit rete | Bit host | N° reti | N° host |
|---|---|---|---|---|---|---|
| **A** | `0` | `0.0.0.0` – `127.255.255.255` | 7 | 24 | 126 | 16.777.214 |
| **B** | `10` | `128.0.0.0` – `191.255.255.255` | 14 | 16 | 16.384 | 65.534 |
| **C** | `110` | `192.0.0.0` – `223.255.255.255` | 21 | 8 | 2.097.152 | 254 |
| **D** | `1110` | — | — | — | *multicast* | — |
| **E** | `1111` | — | — | — | *sperimentale* | — |

- Classe **A**: adatta a reti di **grandi dimensioni**.
- Classe **B**: adatta a reti di **medie dimensioni**.
- Classe **C**: adatta a reti di **piccole dimensioni**.
- Classi **D** ed **E** non sono usate per singoli host: D per il **multicasting** (indirizza gruppi di host), E riservata per usi futuri/sperimentali.

---

## Gli indirizzi riservati o speciali

| Tipo | Caratteristica | Esempio |
|---|---|---|
| **Indirizzo di rete** | tutti `0` nella parte host | `200.10.5.0/24` |
| **Host sulla rete corrente** | tutti `0` nella parte rete | `0.0.0.5/24` |
| **Broadcast limitato** | tutti `1` nella parte host → invio a tutti gli host della rete | `200.10.5.255/24` |
| **Default route** | tutti `0` → routing o bootstrap | `0.0.0.0` |
| **Broadcast di default** | tutti `1` → invio a tutta la rete locale | `255.255.255.255` |
| **Loopback** | rete `127.0.0.0/8` → *localhost*, test host | `127.0.0.1` |
| **APIPA** (Automatic Private IP Addressing) | autoconfigurazione se DHCP non assegna IP | `169.254.0.0/16` |

> 💡 Se il tuo PC ha un indirizzo che inizia con `169.254.x.x`, significa che **non è riuscito a contattare un server DHCP** ed è un buon primo indizio per diagnosticare un problema di rete.

---

## Indirizzi pubblici e privati

**Indirizzi pubblici**
- **unici e globali**, assegnati da **ICANN** (Internet Corporation for Assigned Names and Numbers);
- necessari per comunicare **direttamente** su Internet.

**Indirizzi privati** (RFC 1918)
- usati solo in reti locali, **non** direttamente su Internet.

| Range | N° indirizzi |
|---|---|
| `10.0.0.0/8` | $2^{24}$ |
| `172.16.0.0/16` – `172.31.255.255/16` | $2^{20}$ |
| `192.168.0.0/16` | $2^{16}$ |

Consentono il **riutilizzo** degli stessi indirizzi in LAN diverse, senza conflitti. Se la trasmissione deve uscire dalla rete locale, l'host viene identificato tramite un **IP pubblico**, gestito tramite **NAT** o **proxy**.

---

## Indirizzi statici e dinamici

**Chi assegna gli indirizzi IP pubblici?**

**Indirizzi dinamici**
- cambiano a ogni connessione: gli ISP possono riutilizzare indirizzi pubblici;
- tipico per gli **utenti residenziali**.

**Indirizzi statici**
- fissi, usati per **server, router**;
- tipicamente usati dalle aziende; possono essere pubblici o privati, anche condivisi tramite NAT.

**Gerarchia di gestione:**
- **ICANN**: autorità mondiale che supervisiona l'assegnazione degli IP pubblici;
- **RIR** (*Regional Internet Registry*): ICANN delega la gestione di blocchi di indirizzi ai RIR locali, ognuno responsabile di una specifica regione del mondo — attualmente **5 RIR attivi** (es. RIPE NCC per Europa/Medio Oriente).

---

<!-- _class: lead -->

# Pianificazione di reti IP
## il subnetting statico (FLSM)

---

## Il subnetting

**Spreco di indirizzi con il classful addressing:**
- l'uso di classi fisse semplificava il routing, ma causava un **notevole spreco**: intere classi B (65.536 indirizzi) venivano assegnate ad aziende o università che spesso ne usavano solo una piccola frazione.
- La crescita di Internet ha reso necessario un uso più efficiente dello spazio IPv4 → nasce il **subnetting**.

**Il subnetting:**
- introdotto nel **1985** con la pubblicazione dello standard **RFC 950**;
- permette di suddividere un blocco IP in **sottoreti più piccole**;
- consente a un'organizzazione di allocare **solo gli indirizzi necessari** a ciascun dipartimento o segmento di rete.

---

## CIDR e FLSM

**CIDR**
- nella metodologia CIDR, il subnetting **supera** la suddivisione in classi (classful);
- estende la lunghezza del prefisso di rete (`/n`) per creare sottoreti più piccole;
- esempio: `192.168.0.0/24` → `/25`, `/26`, ... → subnet progressivamente più piccole.

**FLSM** (*Fixed Length Subnet Mask*) o **subnetting statico**
- usa una subnet mask di **lunghezza fissa** per tutte le subnet della rete;
- **stesso numero** di indirizzi IP per ciascuna subnet, indipendentemente dalle necessità reali.

**Applicazione:**
- gli ottetti della subnet mask devono avere bit a `1` **consecutivi da sinistra**;
- alcuni valori decimali "nascondono" parte dell'ottetto che è subnet e parte host (es. `255.255.255.192` = /26: gli ultimi due bit dell'ultimo ottetto sono host, i primi sei sono subnet).

---

## Il processo di messa in AND

- Operazione **AND bitwise** per ottenere l'indirizzo di rete, sovrapponendo la subnet mask all'indirizzo IP — effettuata dal router in **hardware**.

**Proprietà dell'AND:**
- se entrambi i valori sono `1` → risultato `1`;
- se **almeno uno** dei due valori è `0` → risultato `0`.

**Esempio pratico:**

```
      IP:        192.168.1.  77   = 01001101
Subnet mask:      255.255.255.192 = 11000000
      AND:                          01000000  →  64

Indirizzo di rete risultante: 192.168.1.64
```

**Processo di verifica (*ANDing process*):**
- AND tra IP mittente e sua subnet mask → indirizzo di rete mittente;
- AND tra IP destinatario e la stessa subnet mask (del mittente) → indirizzo di rete da verificare;
- **uguali** → stessa subnet → forwarding **diretto**, senza router; **diversi** → subnet differenti → forwarding **indiretto** tramite router.

---

## Il piano di indirizzamento della rete

Per segmentare una rete servono il **numero di subnet** e il **numero massimo di host per subnet**. I passaggi principali:

1. **Analisi dei requisiti**: numero di subnet e host per subnet; prevedere espansioni future.
2. **Ottenere spazio IP**: rete privata (`10.0.0.0/8` per grandi reti, `172.16.0.0/12` per medie, `192.168.0.0/16` per piccole) o rete pubblica (blocco da ISP/RIR).
3. **Suddivisione in subnet**:
   - numero di subnet: $2^N \ge$ numero di subnet richiesto (*N* = bit per Subnet ID);
   - host per subnet: $2^H - 2 \ge$ numero di host richiesto (*H* = bit per Host ID);
   - definizione delle netmask.
4. **Allocazione**: subnet a clienti/zone/dipartimenti, con indirizzamento gerarchico (*route summarization*).
5. **Assegnazione IP agli host**: `.1` → router (default gateway); `.2–.10` → server; successivi → computer, stampanti...; ultimo → broadcast.
6. **Documentazione**: tabella degli IP assegnati, diagramma della rete.

---

## Sovrapposizione di indirizzi IP in CIDR

**Cause della sovrapposizione (*overlapping*) tra indirizzi IP:**
- **errore nei prefissi**: due subnet con prefissi che si sovrappongono (stessi indirizzi);
- **mancata verifica ufficiale**: creare subnet senza consultare RIR o ISP → conflitti.

**Strumenti di IP Address Management (IPAM):**

| Strumento | Caratteristica |
|---|---|
| **SolarWinds IPAM** | dashboard per monitorare disponibilità e utilizzo degli IP |
| **phpIPAM** | open source, gestisce IPv4/IPv6, subnet e VLAN (Linux/CentOS/Debian) |
| **BlueCAT IPAM** | gestione centralizzata di IP, DNS, DHCP con report e analisi dati |

**Strumenti complementari:** *IP scanner* (verifica l'utilizzo effettivo degli IP) e **Whois Lookup** (controlla a chi appartiene un blocco IP e rileva eventuali sovrapposizioni).

---

<!-- _class: lead -->

# Pianificazione di reti IP
## il subnetting variabile (VLSM)

---

## I limiti del subnetting statico (FLSM)

**Caratteristiche:**
- approccio **uniforme**: tutte le subnet hanno la stessa dimensione;
- semplice da implementare e gestire.

**Limiti principali:**
- **spreco di indirizzi**: subnet grandi e piccole consumano lo stesso spazio;
- **rigidità**: numero di subnet e host fissati in fase di progettazione;
- **bassa scalabilità**: modifiche future richiedono il rifacimento del piano.

**Domande chiave per pianificare la rete:**
1. Quante subnet servono **oggi**?
2. Quante subnet serviranno **in futuro**?
3. Quanti host nella subnet **più grande oggi**?
4. Quanti host nella subnet **più grande in futuro**?

> ⚠️ In conclusione, il subnetting statico **non ottimizza** l'uso degli indirizzi e limita flessibilità e scalabilità della rete — da qui la necessità del VLSM.

---

## La tecnica VLSM (Variable Length Subnet Mask)

**Caratteristiche:**
- consente subnet di **dimensioni variabili** all'interno della stessa rete principale;
- subnet mask **lunga** → pochi host; subnet mask **breve** → molti host.

**Vantaggi:**
- **ottimizzazione** dello spazio IP → evita sprechi;
- **flessibilità**: si adatta alle esigenze reali di ciascuna subnet;
- soluzione moderna per **reti complesse**.

**Confronto:**

| Tecnica | Caratteristica |
|---|---|
| **FLSM** | subnet uniformi → semplice ma **inefficiente** |
| **VLSM** | subnet variabili → più complesso ma **ottimale ed efficiente** |

> 🧮 Esempio pratico: da una rete `192.168.1.0/24` si può ritagliare una subnet `/27` (30 host) per l'ufficio grande, una `/29` (6 host) per la sala server, e una `/30` (2 host) per il collegamento punto-punto tra due router — ognuna della dimensione giusta, senza sprechi.

---

## La tecnica del supernetting

**Subnetting:**
- divide una rete più grande in **sottoreti più piccole**;
- scopo: organizzazione interna e uso efficiente degli indirizzi IP;
- applicato **all'interno** di un'organizzazione.

**Supernetting** (*Route Summarization*):
- **combina** più reti contigue in una rete più grande;
- scopo: ridurre il numero di **rotte annunciate**, semplificando le tabelle di forwarding;
- applicato principalmente dagli **ISP**.

**Un confronto immobiliare:**
- **Subnetting** = suddividere una grande proprietà in lotti più piccoli;
- **Supernetting** = aggregare proprietà adiacenti in un unico grande lotto.

---

<!-- _class: lead -->

# Riepilogo

---

## Mappa concettuale della lezione

```
Network Layer (TCP/IP)
│
├── Funzioni ── Routing (software, globale) + Forwarding (hardware, locale)
│     └── Control plane (routing table) vs Data plane (forwarding table)
│
├── IPv4 ── protocollo connectionless, header min. 20 byte
│     ├── Campi: Version, IHL, TTL, Protocol, Checksum...
│     └── Frammentazione: ID, Flags (DF/MF), Fragment Offset, MTU
│
└── Indirizzamento IPv4
      ├── Struttura: 32 bit, Network ID + Host ID, subnet mask, AND bitwise
      ├── CIDR (slash notation) vs classful (classi A/B/C/D/E)
      ├── Pubblici (ICANN/RIR) vs Privati (RFC 1918) vs speciali (loopback, APIPA...)
      └── FLSM (subnet fisse) vs VLSM (subnet variabili) vs Supernetting
```

**Parole chiave da ricordare:** routing vs forwarding · control/data plane · IP datagram · TTL · frammentazione/MTU · CIDR · subnet mask · AND bitwise · classful (A/B/C) · NAT · FLSM/VLSM · route summarization.

---

<!-- _class: lead -->

# Domande?
