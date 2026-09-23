---
marp: true
theme: default
paginate: true
footer: 'Sistemi e Reti – Classe 4ª · Apparati di rete'
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
# Apparati di rete

## Ripasso di Switch, Hub, Router e Access Point


---

# Prima distinzione: cosa "vede" un apparato?

Durante la comunicazione, i dati vengono incapsulati:

**Dati applicativi**

↓

**Segmento TCP / Datagramma UDP**

↓

**Pacchetto IP**

↓

**Frame Ethernet / Wi-Fi**

↓

**Bit trasmessi sul mezzo fisico**

---

## Le informazioni più importanti

| Livello | Informazione caratteristica |
|---|---|
| Applicazione | HTTP, DNS, DHCP, TLS... |
| Trasporto | TCP/UDP + porte |
| Internet | IP sorgente/destinazione |
| Accesso alla rete | MAC sorgente/destinazione |
| Fisico | segnali elettrici, ottici o radio |

> Un apparato può utilizzare le informazioni di un determinato livello per prendere decisioni di inoltro.

---

# Apparati principali

| Apparato | Funzione principale | Livello TCP/IP prevalente |
|---|---|---|
| **Hub** | ripetere il segnale | Accesso alla rete / fisico |
| **Switch** | inoltrare frame nella LAN | Accesso alla rete |
| **Router** | inoltrare pacchetti tra reti | Internet |
| **Access Point** | collegare Wi-Fi ed Ethernet | Accesso alla rete |

> Attenzione: gli apparati moderni possono integrare funzionalità appartenenti a più livelli.

---

# Hub

## Cos'è?

Un **hub** è un dispositivo di rete che opera come **ripetitore multiporta**.

Riceve un segnale su una porta e lo **ripete sulle altre porte**.

Non interpreta:

- indirizzi MAC
- indirizzi IP
- porte TCP/UDP
- protocolli applicativi

---

# Hub: funzionamento

Supponiamo che:

```text
PC A ───┐
PC B ───┼── HUB
PC C ───┤
PC D ───┘
```

A invia un frame destinato a B.

L'hub:

```text
riceve il segnale
       ↓
lo rigenera
       ↓
lo invia su tutte le altre porte
```

Sono i dispositivi finali a verificare se il frame è destinato a loro.

---

# Hub: caratteristiche

### Porte / interfacce

Tipicamente:

- porte **RJ-45 Ethernet**
- velocità storiche: 10 Mbps, 100 Mbps
- collegamento tramite doppino in rame


---

# Hub e modello TCP/IP

L'hub non prende decisioni basate sugli indirizzi.
Non costruisce una tabella MAC.
Non analizza il pacchetto IP.

### Livello interessato:
**Accesso alla rete / livello fisico**

Opera principalmente sul **segnale e sui bit**.

```text
Applicazione     ✗
Trasporto        ✗
Rete             ✗
Accesso rete     ✓
```

### Protocolli?
Non utilizza protocolli di livello superiore per decidere dove inoltrare i dati.

---

# Collisioni e dominio di collisione

Con un hub:

```text
       HUB
   ┌────┼────┐
  PC1  PC2  PC3
```

tutti i dispositivi condividono lo stesso **dominio di collisione**.

Nelle vecchie Ethernet half-duplex si utilizzava:

**CSMA/CD**

Carrier Sense Multiple Access / Collision Detection

Gli host verificavano il mezzo prima di trasmettere e rilevavano eventuali collisioni.

---

# Switch

## Cos'è?

Uno **switch Ethernet** è un dispositivo che inoltra i **frame** all'interno di una rete locale.

A differenza dell'hub:

> non invia necessariamente il frame a tutte le porte.

Utilizza principalmente gli **indirizzi MAC**.

---

# Switch: esempio

```text
PC A ─────┐
          │
PC B ── SWITCH ── PC C
          │
PC D ─────┘
```

Supponiamo:

```text
PC A con MAC = AA:AA:AA:AA:AA:AA

PC B con MAC = BB:BB:BB:BB:BB:BB
```

A invia un frame destinato a B.
Lo switch consulta la propria:
### MAC Address Table
e inoltra il frame sulla porta associata a B.

---

# MAC Address Table

Una tabella può contenere:

| MAC address | Porta |
|---|---|
| AA:AA:AA:AA:AA:AA | 1 |
| BB:BB:BB:BB:BB:BB | 4 |
| CC:CC:CC:CC:CC:CC | 7 |

Lo switch costruisce e aggiorna dinamicamente questa tabella osservando:

> **MAC sorgente dei frame ricevuti + porta di ingresso**

---

# Cosa succede se il MAC è sconosciuto?

Se arriva un frame con:

```text
Destinazione:
DD:DD:DD:DD:DD:DD
```

ma il MAC non è presente nella tabella:

lo switch effettua un **flooding**.

Il frame viene inviato sulle altre porte appartenenti alla stessa LAN/VLAN, ad eccezione della porta di ingresso.

Quando il destinatario risponde, lo switch può imparare il suo MAC.

---

# Switch: porte e interfacce

Le interfacce più comuni sono:

### RJ-45

Ethernet su rame:

- 100 Mbps
- 1 Gbps
- 2.5 Gbps
- 10 Gbps e oltre

### SFP / SFP+

Slot per moduli:

- fibra ottica
- collegamenti in rame tramite moduli appropriati

Spesso utilizzati per gli **uplink** (collegare due switch o switch-router).

---

# PoE – Power over Ethernet

Alcuni switch possono alimentare dispositivi attraverso il cavo Ethernet.

Esempi:

- Access Point
- telecamere IP
- telefoni VoIP

Lo stesso cavo può trasportare:

```text
DATI + ALIMENTAZIONE
```

Standard comuni:

- **IEEE 802.3af**
- **IEEE 802.3at**
- **IEEE 802.3bt**

---

# Switch e modello TCP/IP

Uno switch Ethernet tradizionale opera principalmente al:

### Livello Accesso alla rete

Utilizza:

- frame Ethernet
- indirizzi MAC
- VLAN 802.1Q
- STP/RSTP per gestire topologia di rete (evitare che gli switch creino dei circuiti chiusi)

```text
Applicazione     ✗
Trasporto        ✗
Internet         ✗
Accesso rete     ✓
```

Non utilizza l'indirizzo IP per decidere l'inoltro di un normale frame Ethernet.

---

# Switch Layer 2 e Layer 3

Non tutti gli switch sono uguali.

### Layer 2

Utilizza principalmente:

**MAC → porta**

### Layer 3

Può anche effettuare funzioni di routing:

**IP destinazione → interfaccia / next hop**

Uno switch Layer 3 può quindi svolgere alcune funzioni tipiche di un router.

---

# Router

## Cos'è?

Un **router** collega reti IP differenti.

La sua funzione principale è:

> determinare il percorso e inoltrare i pacchetti IP verso la rete di destinazione.

Esempio:

```text
LAN 192.168.1.0/24
          │
       ROUTER
          │
      Internet
```

Il router separa domini IP differenti.

---

# Router: le interfacce

Un router può avere:

### Interfacce Ethernet

- RJ-45, SFP/SFP+, 1 Gbps, 2.5 Gbps, 10 Gbps...

### Interfacce WAN

Dipende dalla tecnologia utilizzata:

- Ethernet, fibra, xDSL

### Interfacce virtuali

Ad esempio:

- VLAN interface, loopback, tunnel

---

# Routing table

Il router utilizza una:

### Tabella di routing

Esempio:

| Rete destinazione | Next hop | Interfaccia |
|---|---|---|
| 192.168.1.0/24 | — | LAN |
| 192.168.2.0/24 | 10.0.0.2 | WAN |
| 0.0.0.0/0 | 10.0.0.1 | WAN |

Quando arriva un pacchetto IP, il router cerca la rotta più specifica compatibile con l'indirizzo di destinazione.

---

# Default Gateway

Quando un host deve comunicare con una rete diversa dalla propria:

```text
PC
192.168.1.10
     │
     ↓
Default Gateway
192.168.1.1
     │
     ↓
Router
     │
     ↓
altra rete
```

Il **default gateway** è normalmente l'indirizzo IP dell'interfaccia del router presente nella LAN.

---

# Router e modello TCP/IP

Il router opera principalmente al:

### Livello rete/network

Utilizza:

- IPv4, IPv6, ICMP, protocolli di routing (quando presenti)

Può inoltre svolgere funzioni appartenenti ad altri livelli.

```text
Applicazione     eventualmente
Trasporto        eventualmente
Internet         ✓
Accesso rete     ✓
```

Il router deve comunque interagire con il livello di accesso alla rete per ricevere e trasmettere i frame.

---

# Access Point

## Cos'è?

Un **Access Point (AP)** permette ai dispositivi Wi-Fi di accedere a una rete locale.

Effettua principalmente un **bridge** tra:

```text
Wi-Fi
  ↕
Ethernet
```

Non va quindi considerato semplicemente come un "router senza fili".

---

# Access Point: interfacce

### Interfaccia wireless

Utilizza una o più radio Wi-Fi.

Standard della famiglia:

**IEEE 802.11**

Esempi:

- Wi-Fi 4 → 802.11n
- Wi-Fi 5 → 802.11ac
- Wi-Fi 6 → 802.11ax
- Wi-Fi 6E → 802.11ax con banda 6 GHz
- Wi-Fi 7 → 802.11be

---

# Access Point: interfaccia Ethernet

L'AP dispone normalmente di una porta Ethernet per collegarsi alla rete cablata.

Può essere:

- 100 Mbps, 1 Gbps, 2.5 Gbps, 5 Gbps

In molti casi l'alimentazione arriva tramite:

### PoE

```text
Switch PoE
     │
     │ Ethernet + alimentazione
     ↓
Access Point
```

---

# SSID

L'**SSID (Service Set Identifier)** identifica la rete Wi-Fi visibile agli utenti.

Esempio:

```text
SSID: Scuola-Studenti
SSID: Scuola-Docenti
SSID: Scuola-Ospiti
```

SSID diversi possono essere associati a:

- VLAN diverse
- reti IP diverse
- differenti politiche di sicurezza

---

# Access Point e sicurezza

La rete Wi-Fi utilizza meccanismi di autenticazione e cifratura.

Tecnologie comuni:

- WPA2
- WPA3
- 802.1X
- EAP


---

# Access Point e modello TCP/IP

L'AP opera principalmente nell'ambito del:

### Livello Accesso alla rete

Gestisce frame wireless **802.11** e il collegamento con Ethernet.

```text
Applicazione     ✗
Trasporto        ✗
Internet         ✗
Accesso rete     ✓
```

Può tuttavia essere integrato in dispositivi che svolgono anche funzioni di routing, DHCP, firewall, NAT ecc.

---

# Switch vs Access Point

| Caratteristica | Switch | Access Point |
|---|---|---|
| Mezzo principale | Ethernet | Wi-Fi |
| Standard | 802.3 | 802.11 |
| PDU principale | Frame Ethernet | Frame 802.11 |
| Identificatore | MAC | MAC |
| Funzione | switching | accesso wireless / bridging |
| Livello prevalente | Accesso rete | Accesso rete |
| Collegamento alla LAN | Ethernet | Ethernet |

**Entrambi possono lavorare principalmente a livello Accesso alla rete.**

---

# Switch vs Router

| | Switch | Router |
|---|---|---|
| Unità elaborata | Frame | Pacchetto |
| Indirizzo principale | MAC | IP |
| Tabella | MAC Address Table | Routing Table |
| Funzione | Switching | Routing |
| Collega principalmente | host nella stessa LAN/VLAN | reti IP differenti |
| Livello prevalente | Accesso rete | Internet |

---

# Hub vs Switch

### HUB

```text
Ricevi → ripeti ovunque
```

### SWITCH

```text
Ricevi
  ↓
leggi MAC destinazione
  ↓
consulta MAC table
  ↓
inoltra sulla porta appropriata
```

Lo switch riduce il traffico inutile e, normalmente, ogni porta costituisce un dominio di collisione distinto.

---

# Cosa succede nella LAN?

```text
PC
 │
 │ Wi-Fi
 ↓
ACCESS POINT
 │
 │ Ethernet
 ↓
SWITCH
 │
 │ Ethernet
 ↓
ROUTER
 │
 │ WAN
 ↓
Internet
```

Ogni apparato prende decisioni utilizzando informazioni diverse.

---

# Il percorso del pacchetto

## Nel PC

Il sistema costruisce:

```text
Dati
 ↓
Segmento TCP
 ↓
Pacchetto IP
 ↓
Frame Ethernet/Wi-Fi
```

Il frame arriva allo

### Switch

che guarda **MAC destinazione** e inoltra il frame.

---

# Arrivo al router

Il router riceve il frame.

Rimuove l'incapsulamento di livello collegamento e analizza il:

### Pacchetto IP

Controlla l'IP di destinazione e consulta la:

**Routing Table**

Poi costruisce un nuovo frame per il collegamento successivo.

---

# Punto fondamentale

Il router **non inoltra semplicemente lo stesso frame Ethernet**.

In generale:

```text
Frame Ethernet 1
        ↓
      ROUTER
        ↓
Frame Ethernet 2
```

Il pacchetto IP viene inoltrato, mentre il frame viene ricostruito per il successivo collegamento.

Per questo gli indirizzi MAC possono cambiare da un segmento all'altro, mentre gli indirizzi IP sorgente/destinazione normalmente rimangono invariati durante il routing end-to-end, salvo funzioni come NAT.

---

# Tabella riassuntiva

| Apparato | Cosa guarda principalmente | Tabella / meccanismo | Livello prevalente |
|---|---|---|---|
| **Hub** | segnale/bit | nessuna | Fisico |
| **Switch L2** | MAC | MAC table | Accesso rete |
| **Switch L3** | IP + MAC | MAC + routing | Accesso + Internet |
| **Router** | IP | Routing table | Internet |
| **Access Point** | MAC / frame 802.11 | bridge/associazioni | Accesso rete |

---

# Apparati moderni: attenzione alla classificazione

Nella pratica, un dispositivo domestico chiamato:

**"Router Wi-Fi"**

può contenere contemporaneamente:

```text
Router
+
Switch Ethernet
+
Access Point
+
Firewall/NAT/DHCP Server
```

Quindi:

> il nome commerciale dell'apparato non identifica necessariamente il solo livello TCP/IP a cui opera.


---

# Da ricordare

### HUB
**Ripete.**

### SWITCH
**Decide la porta in base al MAC.**

### ROUTER
**Decide il percorso in base all'IP.**

### ACCESS POINT
**Collega una rete Wi-Fi alla rete cablata.**

> **MAC → rete locale** mentre **IP → comunicazione tra reti**


