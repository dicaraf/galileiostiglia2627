---
marp: true
theme: default
paginate: true
footer: 'Sistemi e Reti – Classe 4ª · Lo switching e le VLAN'
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

# Lo switching
## e le VLAN

**Sistemi e Reti – Classe 4ª**
La tecnica di switching, la MAC Table, lo Spanning Tree Protocol, le VLAN e gli switch multilivello

---

<!-- _class: lead -->

# La tecnica di switching
## nelle LAN

---

## Reti locali "segmentate"

Le reti LAN moderne sono **segmentate** per migliorare le prestazioni e ridurre le collisioni.

**Segmentazione tramite switch:**
- suddivide la rete in segmenti più piccoli;
- assegna a ciascun computer una maggiore banda disponibile;
- crea **domini di collisione** più piccoli (l'area in cui si può creare una collisione);
- opera al **Livello 2** (Data Link);
- usa gli **indirizzi MAC** per inoltrare i frame solo verso la porta corretta.

**Segmentazione tramite router:**
- opera al **Livello 3** (Network);
- usa gli **indirizzi IP** per collegare reti diverse;
- implementa algoritmi per trovare il percorso migliore → richiede più tempo di elaborazione, più adatto a **MAN e WAN**.

> 💡 In ambito LAN, lo **switch** è lo strumento principale per segmentare la rete: è più veloce del router perché non deve "pensare" al percorso, guarda solo l'indirizzo MAC.

---

## Gli switch

- Con gli switch, il **dominio di collisione non coincide più** col dominio di broadcast (come invece avviene per gli hub):
  - riduce il traffico sulla rete;
  - **non elimina** le collisioni in canali half-duplex.
- A partire dallo standard **802.3x** viene introdotto il **full-duplex**:
  - si usa lo stesso cavo in modo bidirezionale, dimezzando la banda disponibile per ogni singola trasmissione;
  - sono dispositivi **plug-and-play**, che non richiedono configurazione;
  - **supera** la tecnica CSMA/CD (non serve più: non ci sono collisioni da rilevare).
- Lo switch gestisce attivamente il traffico Ethernet, **bufferizzando e inoltrando** i frame in modo trasparente per gli host.

> 🔎 Ricorda la unit precedente: full-duplex + switch è proprio il motivo per cui CSMA/CD è ormai "storia" nelle reti Ethernet moderne.

---

## Gli switch – un esempio pratico

Nello schema:
- l'**host A** e l'**host B** comunicano tramite lo switch **full-duplex simultaneamente**;
- se l'**host C** tenta di comunicare **con B mentre A e B stanno già parlando**, i suoi frame vengono **ritardati o scartati** dallo switch.

```
   A  ────┐                      ┌──── B
          │      ┌─────────┐     │
          ├──────┤  SWITCH  ├────┤
          │      └────┬────┘     │
   C  ────┘            │
                (frame in coda o scartati
                 se la porta verso B è occupata)
```

> 💡 A differenza dell'hub (dove tutti "sentono" tutti), lo switch instrada ogni frame **solo verso la porta di destinazione**: per questo A↔B e un eventuale traffico C↔D potrebbero avvenire **in parallelo**, senza interferenza reciproca.

---

## La MAC Table

La **MAC Table** (o *Switch Table*) mette in corrispondenza il **MAC Address** con la **porta fisica** corrispondente:

- ogni switch costruisce **automaticamente** la propria MAC Table;
- lo switch aggiorna la tabella e **impara la topologia** della rete ogni volta che riceve un frame da un nuovo dispositivo;
- lo switch invia i frame **solo dove necessario**, riducendo il traffico e migliorando l'efficienza;
- in reti con più switch, **ciascuno** mantiene e aggiorna la propria MAC Table in modo **indipendente**.

**Esempio di MAC Table:**

| MAC Address | Porta |
|---|---|
| `08-00-2B-C4-BE-F3` | 1 |
| `AC-DE-48-00-11-22` | 3 |
| `FF-FF-FF-FF-FF-FF` | tutte (broadcast) |

> 🔎 Se lo switch riceve un frame per un MAC **non ancora presente** in tabella, lo inoltra su **tutte** le porte (*flooding*), esattamente come farebbe un hub — ma solo per quella singola volta, finché non "impara" dove si trova.

---

## Le modalità di switching

Lo switch elabora i dati **via hardware**, quindi non rallenta il traffico tra i segmenti. **Tre modalità principali:**

**Store-and-Forward**
- memorizza l'**intero frame** in un buffer, verifica il **CRC**, poi lo inoltra;
- tecnica più **affidabile**, adatta a reti con velocità diverse, ma introduce un **ritardo leggero** (deve ricevere tutto il frame prima di inoltrare).

**Cut-Through**
- inizia a inoltrare il frame **appena letto l'indirizzo di destinazione** (i primi 6 byte);
- non attende la ricezione completa → riduce il ritardo **fino a 20 volte**, ma non controllando errori può trasmettere frame **danneggiati**.

**Fragment-Free**
- controlla solo i **primi 64 byte** del frame (dove si concentra la maggior parte degli errori, il "collision window") prima di inoltrarlo;
- unisce velocità e affidabilità in modo **bilanciato**.

> 🧮 Se ricordi la Unit 2: 64 byte è anche la lunghezza **minima** del frame Ethernet — non è un caso: sotto quella soglia un frame è quasi certamente il risultato di una collisione.

---

## La vulnerabilità degli switch

Per proteggere una LAN è utile attivare la **protezione delle porte** (*port security*):

- impedisce ai dispositivi **non autorizzati** di accedere alla rete attraverso una porta non assegnata;
- ogni porta accetta solo i frame provenienti da **indirizzi MAC autorizzati**;
- i frame con MAC non previsto vengono **bloccati** e non possono attraversare lo switch.

- Ogni porta può gestire di norma fino a **1.024 indirizzi MAC** (alcuni modelli solo 64), più uno predefinito per porta.

**Dopo aver allocato gli indirizzi MAC, si possono configurare in tre modi:**
1. **manualmente** da un amministratore;
2. **appresi automaticamente** dallo switch;
3. in modo **ibrido** (parte manuale, parte automatica).

---

## La NVRAM

- Gli indirizzi MAC configurati vengono salvati in **NVRAM** (*Non-Volatile Random Access Memory*):
  - non perde i dati caricati, anche in caso di interruzione di corrente (grazie a una batteria tampone);
  - garantisce la protezione anche **dopo un riavvio**.
- Per ogni porta si può definire una **durata della protezione**: allo scadere, gli indirizzi perdono validità.

**Quando una porta riceve un frame, confronta il MAC del mittente con la lista in memoria:**
- se l'indirizzo è **autorizzato** → il frame viene accettato;
- se l'indirizzo **non è riconosciuto**, la porta può reagire in due modi:

| Situazione | Reazione |
|---|---|
| indirizzo non nell'elenco | **disattivazione**: blocco completo del traffico sulla porta (temporaneo o permanente) |
| tentativo di violazione | **modalità restrittiva**: la porta resta attiva, ma accetta solo i MAC autorizzati, scartando gli altri |

---

<!-- _class: lead -->

# STP
## il protocollo di comunicazione tra gli switch

---

## Spanning Tree Protocol (STP)

- Le reti con switch vengono spesso progettate con **percorsi fisici ridondanti**, per garantire affidabilità e *fault tolerance*.
- Le ridondanze possono causare effetti indesiderati (*side effects*), come i **loop di rete**, che portano al fenomeno del **broadcast storm**:
  - i frame broadcast **in loop** occupano tutta la banda disponibile e **bloccano la rete**.
- **STP** (*Spanning Tree Protocol*) è uno standard **IEEE 802.1** per gestire i collegamenti ed **evitare i loop**.

> ⚠️ Il broadcast storm è particolarmente pericoloso perché **si auto-alimenta**: un frame broadcast che gira in loop tra due switch collegati due volte viene continuamente ricopiato su tutte le porte, moltiplicandosi esponenzialmente finché la rete non collassa. A differenza di un pacchetto IP, il frame Ethernet **non ha un TTL** che ne limiti la vita.

---

## Spanning Tree Protocol – come funziona

STP crea una **struttura logica ad albero** (*Spanning Tree*) che:
- mantiene **tutti** i collegamenti fisici;
- pone i percorsi ridondanti in stato **standby** (*blocked*).

I percorsi ridondanti restano come **alternative**: se il percorso primario non è disponibile, l'algoritmo di STP **ristabilisce il collegamento** attivando il percorso in standby.

```
        Switch 1
        /      \
   (attivo)   (bloccato — standby)
      /            \
Switch 2 ──────── Switch 3
        (collegamento diretto)
```

> 🔎 È lo stesso principio di un impianto elettrico con doppia linea di alimentazione: la linea di riserva c'è fisicamente, ma resta "spenta" finché quella primaria funziona — si attiva solo in caso di guasto.

---

## Funzionamento dello STP e BPDU

Gli switch comunicano tramite messaggi **BPDU** (*Bridge Protocol Data Unit*), inviati a tutte le porte, per conoscere l'esistenza di altri switch e creare un **root bridge** (la radice dell'albero logico).

**I BPDU servono a:**
- selezionare un solo switch come **root bridge** (la radice dell'albero);
- calcolare il **percorso più breve** da ogni switch alla root;
- scegliere il **designated switch**: lo switch più vicino alla root, attraverso cui passano tutte le comunicazioni;
- definire la **root port** per ogni switch: l'interfaccia con il miglior percorso verso la root.

Ogni switch invia BPDU da **tutte le porte** e aggiorna il proprio stato in base alle informazioni ricevute.

---

## Gerarchia creata con STP

Solo le porte dello Spanning Tree (**designated port**) sono attive; le altre sono **bloccate**.

- L'algoritmo impiega da **30 a 50 secondi** prima che la topologia logica della rete **converga**, assegnando a tutte le porte il loro stato.
- Quando la topologia cambia, gli switch **ricalcolano** lo Spanning Tree.

**L'albero gerarchico, una volta creato, presenta:**
- un **root bridge** per LAN;
- una **root port** per ogni non-root bridge;
- una **designated port** per segmento;
- porte **non utilizzate** (bloccate).

**Stati delle porte:**
- **blocked**: stato di blocco;
- **forwarding**: stato di invio/ricezione (operativo).

> ⚠️ 30-50 secondi possono sembrare pochi, ma per una rete aziendale che deve restare sempre attiva sono un tempo enorme — da qui la spinta a sviluppare versioni più rapide (RSTP, che vediamo tra poco).

---

## Ottimizzazioni e Multi-Layer Switch

- Con l'aumento delle velocità di rete, i tempi di convergenza dello STP standard sono risultati **troppo lenti**.
- Sono state sviluppate versioni **proprietarie ottimizzate**: riduzione del tempo di convergenza, configurazione manuale delle porte collegate a PC...
- Oggi, per reti veloci e complesse, gli switch **L2** vengono spesso sostituiti da **Multi-Layer Switch**, che integrano funzioni di livello 3 per una gestione più rapida e sicura della topologia.

**Stati delle porte dello switch STP** (durante creazione/riconfigurazione):

| Stato | Comportamento |
|---|---|
| **Blocking** | riceve solo BPDU, non invia né apprende |
| **Listening** | valuta se esistono percorsi alternativi verso la root |
| **Learning** | costruisce la tabella MAC, ma non trasmette dati |
| **Forwarding** | invia e riceve dati (stato operativo normale) |
| **Disabled** | porta disattivata manualmente |

---

## Evoluzione del protocollo Spanning Tree: RSTP

- Nel **2001**, l'IEEE ha introdotto il **Rapid Spanning Tree Protocol (RSTP)** – **IEEE 802.1w**, per velocizzare la convergenza rispetto al classico STP.
- RSTP può reagire in tempi brevissimi: entro **3 × Hello Time** (Hello Time = 2 secondi → circa **6 secondi**, contro i 30-50 di STP!).
- Dal **2004** RSTP è integrato nello standard **IEEE 802.1Q** ed è diventato il protocollo **standard** di prevenzione dei loop di livello 2, sostituendo lo STP tradizionale.
- RSTP mantiene la stessa struttura logica di STP (root bridge, percorsi ad albero), ma introduce un **calcolo dinamico** dei percorsi alternativi, che consente di attivare **immediatamente** una via secondaria in caso di guasto.

---

## Miglioramenti e funzionamento di RSTP

- Le **porte alternate** rappresentano percorsi alternativi pronti all'uso; eventuali porte con percorsi a costo maggiore vanno in stato **blocking**.
- Quando una porta in *forwarding* smette di ricevere i messaggi di **Hello**, il percorso alternativo viene attivato **subito**, riducendo drasticamente il tempo di riconfigurazione.
- Se uno switch ha due porte nello stesso segmento, quella con costo maggiore è la **porta di backup**: entra in funzione solo se la principale fallisce.
- RSTP è progettato per reti moderne **full-duplex con switch**: non migliora la convergenza su link condivisi con hub.
- Offre **rapidità, stabilità e ridondanza efficiente**, assicurando la continuità delle comunicazioni anche in presenza di guasti.

> 🔎 Confronto rapido: **STP** = affidabile ma lento (30-50s); **RSTP** = stessa logica, ma reattivo (≈6s) grazie al monitoraggio continuo dei messaggi Hello invece dell'attesa passiva.

---

<!-- _class: lead -->

# Le reti locali virtuali
## (VLAN)

---

## Dominio di broadcast

| apparato di rete | dominio di collisione | dominio di broadcast |
|---|---|---|
| **hub** | uno per tutte le porte | uno per tutte le porte |
| **switch** | uno per ogni porta | uno per tutte le porte |
| **router** | uno per ogni porta | uno per ogni porta |

- Gli switch in una LAN consentono di segmentare la rete in diversi **domini di collisione**, migliorando l'efficienza del traffico.
- I **domini di broadcast separati** consentono di implementare tra i diversi segmenti funzioni tipiche del livello Network.
- Il **dominio di broadcast** è l'insieme di computer che riceve un messaggio di broadcast trasmesso da uno di essi.

> ⚠️ Gli switch riducono le collisioni, ma il traffico **broadcast** può diventare eccessivo in reti con molti host — è proprio questo il problema che le VLAN risolvono.

---

## VLAN e Layer 3 Switching

Per gestire meglio i domini di broadcast e introdurre funzioni tipiche del livello Network (sicurezza, qualità del servizio), gli switch moderni offrono **due soluzioni**:

**Layer 3 Switching**
- permette la comunicazione tra VLAN diverse **senza** ricorrere a un router dedicato;
- gli switch Layer-3 integrano funzioni di **routing**, leggendo l'indirizzo IP per instradare i pacchetti;
- riducono al minimo l'attività di routing, seguendo il principio **"route once, switch many"**.

**VLAN** (*Virtual Local Area Network*)
- creano **sottoreti logiche** che esistono solo sugli switch;
- la rete mantiene la stessa **topologia fisica**, mentre cambia la **topologia logica**;
- i messaggi broadcast restano **confinati** solo all'interno della VLAN di appartenenza;
- migliorano gestione, sicurezza e prestazioni.

---

## Vantaggi e svantaggi delle VLAN

L'uso delle VLAN consente di **segmentare e isolare** il traffico all'interno di una rete, riducendo il traffico inutile e migliorando le prestazioni complessive. La configurazione richiede pianificazione e competenza, ma i benefici sono notevoli.

**Con le VLAN:**
- è più semplice **aggiungere, spostare o modificare** gli host nella rete;
- si creano più domini di broadcast **di dimensioni ridotte** → rete più efficiente;
- aumenta la **sicurezza**, limitando l'accesso ai soli dispositivi autorizzati;
- si riducono i **costi** legati agli apparati di rete, grazie a una gestione più flessibile.

> ⚠️ Le VLAN **non sostituiscono** i router: per la comunicazione tra reti diverse (internetworking, cioè tra VLAN differenti o verso Internet) è comunque necessario un livello di **routing** dedicato — o, come vedremo, uno switch L3.

---

## Creazione di una VLAN

Una VLAN è un **gruppo di dispositivi** (PC, server, stampanti...) che comunicano come se fossero nella stessa rete, anche se si trovano su LAN fisiche diverse.

**Caratteristiche principali:**
- ogni host ha un **VLAN ID** che identifica la rete virtuale di appartenenza;
- dispositivi con lo stesso VLAN ID si comportano come se fossero sulla **stessa LAN fisica**.

**Le VLAN possono essere create in più modi:**

| Modalità | Basata su | Diffusione |
|---|---|---|
| **per gruppi di porte** | identificativo della porta | modalità più comune |
| **per utenti (MAC address)** | indirizzo fisico del dispositivo | poco comune (difficile da gestire) |
| **per protocolli** | indirizzi logici (es. IP) | oggi poco usata (per via del DHCP) |

---

## Creazione di una VLAN – esempio

**Due scenari equivalenti dal punto di vista logico:**

```
(a) RETE SEGMENTATA CON 3 SWITCH        (b) UNO SWITCH CON 3 VLAN
                                            (porte raggruppate)
 [Switch VLAN10]  [Switch VLAN20]         ┌──────────────┐
       │                │                 │  1 2 3 4 5 6 │  Switch
     Host A          Host B               │  ▓ ▓ ░ ░ ▓ ░ │
                                            └──────────────┘
                                             VLAN10  VLAN20
```

- Nello scenario **(a)** la separazione è **fisica**: switch diversi per reti diverse.
- Nello scenario **(b)** la separazione è **logica**: un solo switch fisico, ma porte raggruppate in VLAN diverse via software.

> 💡 Il vantaggio delle VLAN è proprio questo: ottenere lo stesso isolamento del traffico dello scenario (a), **senza comprare hardware separato** per ogni rete.

---

## VLAN Trunking

- Per permettere la comunicazione tra VLAN diverse si usa un collegamento comune tra switch e router (o tra switch e switch), chiamato **trunk**.
- Il trunk trasporta il traffico di **più VLAN contemporaneamente** (fino a **4096 VLAN**).
- Si usa di solito la **porta più veloce** dello switch, per gestire l'elevato traffico inter-VLAN.

**Tipi di collegamenti nelle reti VLAN:**

| Tipo | Caratteristiche |
|---|---|
| **Access link** | appartiene a **una sola** VLAN; l'host non "vede" di essere in una VLAN; il traffico resta nel dominio di broadcast della VLAN |
| **Trunk link** | collega apparati di rete e trasporta traffico di **più VLAN**; usato tra switch, o tra switch e router/server |

---

## VLAN Trunking – schema

```
 Host VLAN10        Host VLAN20        Host VLAN30
      │                  │                  │
   [Switch A]────Access link (VLAN10, VLAN20, VLAN30)
      │
   ══════ TRUNK ══════  (trasporta traffico di 3 VLAN)
      │
   [Switch B]
      │                  │                  │
 Host VLAN10        Host VLAN20        Host VLAN30
```

Host su VLAN diverse possono comunicare tramite un canale comune tra switch (o router e switch), detto **trunk**: un unico cavo fisico porta il traffico di più reti logiche, mantenute separate grazie al **tagging** (che vediamo nella prossima slide).

---

## Tagging VLAN: lo standard IEEE 802.1Q

- Gli **Ethernet frame** standard non prevedono un campo per il *tagging* VLAN (il riferimento alla VLAN di appartenenza del computer di destinazione).
- Lo standard **IEEE 802.1Q** (non proprietario) aggiunge un campo di **4 byte** nel frame Ethernet per identificare la VLAN.

**Struttura del campo 802.1Q (4 byte):**

| Sottocampo | Dimensione | Significato |
|---|---|---|
| **TPID** (Tag Protocol ID) | 2 byte | valore fisso `0x8100` |
| **User Priority** | 3 bit | livello di priorità (0–7) |
| **DEI/CFI** | 1 bit | segnala frame da scartare in caso di congestione |
| **VLAN ID** | 12 bit | identifica la VLAN (**1–4094** validi) |

> 🧮 Perché 4094 e non 4096? Con 12 bit si avrebbero $2^{12} = 4096$ valori (0-4095), ma **VLAN ID 0** e **4095** sono riservati per usi speciali dallo standard, quindi restano **4094** VLAN utilizzabili — coerente con il "fino a 4096 VLAN" della slide sul trunking.

---

## Gestione centralizzata: VLAN Trunking Protocol (VTP)

- In reti complesse, la gestione manuale delle VLAN è **difficile, lunga e soggetta a errori**.
- **Cisco** ha sviluppato il protocollo proprietario **VTP** (*VLAN Trunking Protocol*), per propagare automaticamente la configurazione delle VLAN tra switch.
- VTP permette di gestire **centralmente** nomi e membri di una VLAN su uno switch, poi distribuisce la configurazione agli altri switch in modo automatico.

**Ruoli degli switch nel protocollo VTP:**

| Ruolo | Comportamento |
|---|---|
| **VTP Server** | definisce e modifica le VLAN |
| **VTP Client** | riceve automaticamente le configurazioni dai server |
| **VTP Transparent** | inoltra gli aggiornamenti, ma **non li applica** |

---

<!-- _class: lead -->

# Gli switch
## L2/L3

---

## Dalle VLAN agli switch di Livello 3

Gli switch considerati finora sono di tipo **L2** (*Layer 2*):
- operano al livello **Data Link**, usano il MAC address per inoltrare i pacchetti;
- permettono di creare VLAN per segmentare la rete, ridurre il traffico broadcast e migliorare la sicurezza;
- **non** permettono la comunicazione diretta tra VLAN diverse (le VLAN create in azienda **non** possono comunicare tra loro senza aiuto esterno).

**L'evoluzione: gli switch L3** (*Layer 3*):
- operano sia a livello **Network** che **Data Link**;
- sono più versatili: integrano funzioni di **switching e routing**;
- permettono la comunicazione **diretta** tra VLAN diverse.

> 🔗 Ricollegati alla slide sui "Vantaggi e svantaggi delle VLAN": lì avevamo detto che serve un router per l'internetworking tra VLAN. Lo switch L3 è proprio la soluzione che integra quel router **dentro** lo switch stesso.

---

## Caratteristiche degli Switch L3 (Multilayer)

Gli switch L3 operano su **due livelli**:
- **Livello 2** (Data Link) → gestione del MAC address;
- **Livello 3** (Network) → gestione degli indirizzi IP e routing.

Detti anche **switch multilayer**, combinano le funzionalità di switch e router.

**Vantaggi principali:**
- consentono la comunicazione tra VLAN diverse (**inter-VLAN routing**);
- offrono maggiore flessibilità e prestazioni elevate rispetto all'uso di router dedicati;
- ogni VLAN può avere un **IP virtuale** assegnato sull'interfaccia dello switch L3;
- particolarmente convenienti nelle **grandi LAN aziendali** e nei **data center**, dove convivono server, storage, switch, router, firewall, dispositivi virtuali e di monitoraggio.

---

## Architettura e uso combinato

Nelle reti aziendali, la configurazione ottimale prevede:

| Dispositivo | Ruolo |
|---|---|
| **Switch L3** | instradano il traffico interno tra VLAN nella LAN |
| **Router** | gestiscono il collegamento verso reti esterne (MAN, WAN, VPN, MPLS...) |

- Gli switch L3 possono operare **contemporaneamente** come L2 e L3, adattandosi alle esigenze della rete.
- In una LAN complessa possono **coesistere** switch L2 e L3, distribuiti per ottimizzare traffico e costi.
- Gli switch multilayer (L3) sono più convenienti per fornire routing inter-VLAN ad **alta velocità**: uniscono la velocità dello switching con l'intelligenza del routing, rendendo la rete più efficiente, scalabile e gestibile.

```
Internet
   │
[Router] ── collegamento verso WAN/MAN/VPN
   │
[Switch L3] ── instrada tra VLAN10, VLAN20, VLAN30 (LAN interna)
   │      │        │
 VLAN10 VLAN20   VLAN30   (switch L2 di accesso)
```

---

<!-- _class: lead -->

# Riepilogo

---

## Mappa concettuale della lezione

```
Switching e VLAN
│
├── Switching (Livello 2)
│     ├── MAC Table ── impara la topologia automaticamente
│     ├── Modalità: Store-and-Forward | Cut-Through | Fragment-Free
│     └── Port security ── MAC autorizzati, NVRAM
│
├── STP (IEEE 802.1) ── evita i loop e i broadcast storm
│     ├── BPDU, root bridge, root/designated port
│     └── RSTP (802.1w/802.1Q) ── convergenza rapida (~6s vs 30-50s)
│
├── VLAN ── sottoreti logiche su topologia fisica unica
│     ├── Access link (1 VLAN) vs Trunk link (più VLAN)
│     ├── Tagging IEEE 802.1Q (VLAN ID a 12 bit)
│     └── VTP ── gestione centralizzata (Server/Client/Transparent)
│
└── Switch L2/L3
      └── L3 = switching + routing → inter-VLAN routing
```

**Parole chiave da ricordare:** MAC Table · Store-and-Forward/Cut-Through/Fragment-Free · broadcast storm · STP/RSTP · root bridge · VLAN ID · trunk vs access link · 802.1Q · VTP · switch multilayer (L3).

---

<!-- _class: lead -->

# Domande?
