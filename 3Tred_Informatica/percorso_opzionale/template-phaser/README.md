# Template di base con Phaser.js

Questo è il punto di partenza del vostro progetto. Il gioco **funziona già**:
aprite `index.html` con **Live Server** e giocateci prima di leggere oltre.

> Aprite il gioco con **Live Server** di VS Code (tasto destro su `index.html` →
> *Open with Live Server*), **non** con il doppio click: il browser non permette di
> leggere mappe e immagini da file locali. Se lo fate comparirà una schermata rossa che lo spiega.

Il template è pensato per lavorare insieme al **Quaderno di progettazione**: ogni scheda del
quaderno ha un posto preciso nel template (vedi la tabella più sotto).

---

## Cosa fa già questo template

- Due scene: il **Villaggio** (mappa Tiled 40×40 tile) e la **Foresta** (mappa Tiled 40×25 tile).
  Le mappe sono **più grandi della finestra**: la camera segue il giocatore.
- Un personaggio giocabile con **sprite animati** (atlas) in 4 direzioni.
- **Personaggi** con cui parlare (tasto **E**), con **dialoghi a scelta multipla**:
  la risposta del giocatore cambia la conversazione e a volte anche il finale della storia.
- Dialoghi che **cambiano a seconda di ciò che è già successo** (flag e oggetti).
- **Porte condizionate**: si aprono solo se una condizione è vera (aver parlato con qualcuno,
  avere un oggetto...). Se sono chiuse mostrano un messaggio.
- Un **oggetto da raccogliere** (il Cristallo) e un **inventario** a schermo.
- Un **obiettivo** che cambia durante la storia, in alto a destra.
- Una piccola **missione completa**: parla con Luna → vai nella Foresta → trova il Cristallo →
  torna da Luna → missione compiuta. Se hai consolato Bruto, Luna lo sa e il finale cambia!

**Comandi:** frecce o WASD = muoversi · **E** = parlare / avanti · **↑ ↓** (o W S) oppure **1 2 3** =
scegliere · **E** o **INVIO** = confermare.

---

## Struttura dei file

```
template-phaser/
├── index.html              ← aprite questo con Live Server
├── README.md
├── assets/
│   ├── tilemaps/           ← le MAPPE (.json, si aprono con Tiled)
│   ├── tilesets/           ← le immagini con le "tessere" delle mappe
│   ├── atlas/              ← il personaggio: immagine + file con i nomi dei fotogrammi
│   ├── sprites/            ← altre vostre immagini (oggetti, personaggi...)
│   ├── audio/              ← musica ed effetti sonori
│   └── CREDITS.md          ← crediti e licenze delle risorse
└── js/
    ├── dialoghi.js         ← ✏️ TUTTI I DIALOGHI (Scheda 6)   ← lavorerete soprattutto qui
    ├── GameState.js        ← ✏️ inventario e FLAG della storia (Scheda 7)
    ├── obiettivi.js        ← ✏️ i testi dell'obiettivo a schermo (Scheda 7)
    ├── config.js           ← impostazioni del personaggio (atlas, velocità)
    ├── DialogManager.js    ← il sistema che mostra dialoghi e scelte
    ├── main.js             ← configurazione di Phaser e elenco delle scene
    └── scenes/
        ├── PreloadScene.js     ← carica mappe, tileset, atlas
        ├── TitleScene.js       ← ✏️ schermata iniziale (titolo del gioco)
        ├── MappaBaseScene.js   ← il "motore" comune a tutte le mappe (si legge, non si modifica)
        ├── Mappa1Scene.js      ← il Villaggio
        ├── Mappa2Scene.js      ← la Foresta
        └── UIScene.js          ← inventario e obiettivo a schermo
```

Non serve installare nulla: Phaser si carica da internet (CDN) in `index.html`.

---

## Quaderno di progettazione ↔ Template

| Scheda del quaderno | Dove va a finire nel template |
|---|---|
| 1 – Titolo e sottotitolo | `TITOLO` e `SOTTOTITOLO` in `TitleScene.js`; `<title>` in `index.html` |
| 2 – Personaggi | Un oggetto **npc** nel livello *Objects* della mappa (con la proprietà `dialogo`) + il suo dialogo in `dialoghi.js` |
| 3 – Scene e collegamenti | Una classe `MappaNScene` per ogni scena + una **porta** in Tiled per ogni collegamento |
| 4 – Scheda scena | La mappa Tiled e la sua scena (`MappaNScene.js`) |
| 5 – Mappe | Il file `.json` in `assets/tilemaps/` disegnato con **Tiled** |
| 6 – Dialoghi | `dialoghi.js` (punti di ingresso, nodi, scelte, effetti) |
| 7 – Oggetti | Oggetti **oggetto** in Tiled; nomi nell'inventario |
| 7 – Flag | `FLAG_INIZIALI` in `GameState.js` |
| 7 – Porte | Oggetti **porta** in Tiled (proprietà `destinazione`, `condizione`, `messaggio`, `arrivo`) |
| 7 – Obiettivi | `obiettivi.js` |
| 8 – Risorse | File in `assets/` e righe `this.load...` in `PreloadScene.js` |

**Dalle coordinate del quaderno a Tiled:** la cella dello schizzo (colonna, riga) diventa la tile
`colonna × scala`, `riga × scala`. La posizione in pixel di un oggetto in Tiled è
`x = colonna_tile × 32 + 16` e `y = riga_tile × 32 + 16` (il centro della tile). Per i personaggi,
la posizione indica dove **poggiano i piedi**.

---

## Le mappe con Tiled

Aprite `assets/tilemaps/tuxemon-town.json` con **Tiled** (gratuito, mapeditor.org): vedrete
la mappa del villaggio con i suoi livelli.

| Livello (nome esatto) | A cosa serve |
|---|---|
| `Below Player` | Il terreno: erba, sentieri. Si cammina sopra. |
| `World` | Gli ostacoli: alberi, muri, case. Le tile con la proprietà `collides = true` **bloccano il passaggio** (nel tileset sono già impostate). |
| `Above Player` | Cose che passano **sopra** il giocatore (es. i tetti). |
| `Objects` | I punti e le zone speciali: personaggi, porte, oggetti, partenza. |

I nomi dei livelli devono coincidere con quelli in `MappaBaseScene.js` (altrimenti la mappa non si vede
e nella console compare un avviso).

### Gli oggetti del livello `Objects`

Per ogni oggetto in Tiled si imposta il **Nome**, il **Tipo** (campo *Class* o *Type*) e le **proprietà
personalizzate** (pulsante **+** nel pannello Proprietà). Si usano gli strumenti *Inserisci punto* e
*Inserisci rettangolo*.

| Tipo | Forma | Proprietà |
|---|---|---|
| `partenza` | punto | — (nome: `Spawn Point`: dove appare il giocatore all'inizio) |
| `arrivo` | punto | — (nome libero, es. `da_foresta`: dove appare chi arriva da un'altra mappa) |
| `npc` | punto | `dialogo` (chiave in `dialoghi.js`, es. `luna`) · `tinta` *(facoltativa, colore es. `#ffb0dc`)* · `raggio` *(facoltativa)* |
| `porta` | rettangolo | `destinazione` (es. `Mappa2Scene`) · `condizione` *(facoltativa)* · `messaggio` (se chiusa) · `arrivo` (nome del punto nella mappa di destinazione) · `etichetta` *(facoltativa, scritta vicino alla porta)* |
| `oggetto` | punto | `oggetto` (nome nell'inventario) · `texture` (immagine) · `messaggio` *(facoltativa)* |

### Prima di salvare da Tiled
- Salvate in formato **JSON** nella stessa cartella `assets/tilemaps/`.
- Se cambiate il nome del tileset in Tiled, cambiate anche `nomeTileset` nel costruttore della scena.
- Se **cambiate tileset**, copiate l'immagine in `assets/tilesets/` e aggiornate la riga
  `this.load.image('tiles', ...)` in `PreloadScene.js`. Il tileset di esempio è "extruded"
  (margine 1, spaziatura 2): è un trucco che evita linee sottili tra le tessere.

---

## I dialoghi (`dialoghi.js`)

Un dialogo è fatto di **nodi** collegati tra loro. Ogni personaggio ha dei **punti di ingresso**:
condizioni che decidono da quale nodo parte la conversazione.

```javascript
bruto: {
  nome: 'Bruto il Fabbro',

  ingressi: [                                   // si legge dall'alto: vale il primo vero
    { se: 'flag:haConsolatoBruto', nodo: 'B_GRATO' },
    { nodo: 'B1' }                              // ← caso "normale", senza condizione
  ],

  nodi: {
    B1: {
      testo: "Mah... Ho rovinato l'ultima spada.",
      scelte: [                                 // il giocatore sceglie (2-3 opzioni)
        { testo: 'Non preoccuparti, capita a tutti.', vai: 'B2' },
        { testo: 'Scusa, devo andare.',               vai: 'FINE' }
      ]
    },
    B2: {
      testo: '...Grazie. Mi hai tirato su di morale.',
      effetti: ['flag:haConsolatoBruto'],       // ← cambia lo stato del gioco
      vai: 'FINE'
    },
    B_GRATO: { testo: 'Grazie ancora per prima!' }
  }
}
```

- `vai: 'FINE'` (o niente) chiude il dialogo.
- Una scelta può ricollegarsi a un nodo precedente (vedi Luna e lo Spirito della Foresta).
- Una scelta può comparire solo a certe condizioni: `{ testo: '...', vai: '...', se: 'ha:chiave' }`.
- Le battute stanno in 2-3 righe di schermo (max ~200 caratteri); le scelte max ~60.
- Un nodo con `testo: ['Pagina 1', 'Pagina 2']` mostra più pagine.
- Il personaggio in Tiled è collegato al dialogo con la proprietà `dialogo = bruto`.

### Condizioni ed effetti (si scrivono come testo)

| Condizione | Significa |
|---|---|
| `flag:haParlatoConLuna` (o solo `haParlatoConLuna`) | la flag è vera |
| `ha:cristallo` | il giocatore ha l'oggetto |
| `!flag:questCompletata` | NON è vera (il `!` nega) |
| `ha:chiave && flag:faroAcceso` | tutte e due vere (`&&` = E) |
| `ha:chiave \|\| ha:lampadina` | almeno una vera (`\|\|` = O) |

| Effetto | Cosa fa |
|---|---|
| `flag:nome` / `-flag:nome` | la flag diventa vera / falsa |
| `oggetto:nome` / `-oggetto:nome` | il giocatore riceve / perde l'oggetto |

Le **flag** si elencano in `FLAG_INIZIALI` (in `GameState.js`): se ne usate una non elencata,
nella console del browser compare un avviso.

---

## Come si fa...

**...ad aggiungere un personaggio?**
1. Scrivete il suo dialogo in `dialoghi.js` (chiave, ingressi, nodi).
2. In Tiled, nel livello `Objects`, inserite un **punto**: Tipo `npc`, proprietà `dialogo` = la chiave scelta.
   Se usa lo stesso sprite del giocatore, date una `tinta` per distinguerlo.
3. Salvate: ricaricate il gioco.

**...a bloccare un passaggio finché non succede qualcosa?**
Inserite un **rettangolo** di tipo `porta` e scrivete `destinazione`, `condizione`, `messaggio` e `arrivo`.
Se la condizione è vera la porta diventa verde e si attraversa; altrimenti compare il messaggio.

**...a far raccogliere un oggetto?**
Inserite un **punto** di tipo `oggetto` con `oggetto` (nome nell'inventario) e `messaggio`.
Per usarlo, scrivete una condizione `ha:nome` in una porta o in un dialogo; per consumarlo, un effetto `-oggetto:nome`.

**...ad aggiungere una nuova scena (mappa)?**
1. Disegnate la mappa in Tiled e salvatela in `assets/tilemaps/`.
2. `PreloadScene.js`: aggiungete `this.load.tilemapTiledJSON('caverna', 'assets/tilemaps/caverna.json')`.
3. Copiate `Mappa2Scene.js` in `Mappa3Scene.js` e cambiate i nomi (`Mappa3Scene` e la chiave `'caverna'`).
4. Registratela in **due punti**: un tag `<script>` in `index.html` e l'array `scene: [...]` in `main.js`.
5. Collegatela con una **porta** nella mappa precedente (`destinazione` = `Mappa3Scene`)
   e prevedete in `caverna.json` un punto di tipo `arrivo` con il nome scritto nella porta.

**...a usare il vostro personaggio?**
Create un atlas (immagine PNG + file JSON, ad esempio con *TexturePacker* o *free-tex-packer*) con
questi nomi di fotogrammi, dove `eroe` è il vostro prefisso: `eroe-front`, `eroe-back`, `eroe-left`,
`eroe-right` (fermo) e `eroe-front-walk.000` … `.003` (e lo stesso per back, left, right). Mettete i file in `assets/atlas/`,
caricateli in `PreloadScene.js` e cambiate `prefisso` (e `corpo`, se serve) in `config.js`.

**...a cambiare il testo dell'obiettivo?** In `obiettivi.js`: elenco di condizione + testo, vale il primo vero.

**...ad aggiungere una vostra funzione speciale?**
Nella vostra scena (`Mappa1Scene.js`) usate `onCreate()` (quando la scena parte) e `onUpdate()` (a ogni
fotogramma). Vedete l'esempio del messaggio di benvenuto in `Mappa1Scene.js`.

---

## Il percorso di lavoro

1. **Gioca e leggi.** Completa la missione del template. Poi apri `dialoghi.js`, `GameState.js` e
   i file in `scenes/` e leggi i commenti. Apri le mappe con Tiled e guarda il livello `Objects`.
2. **Progetta con il Quaderno** (carta e penna, non codice): storia, personaggi, scene, mappe, dialoghi,
   oggetti, flag. Fai la *simulazione a mano* della Scheda 9.
3. **Personalizza i testi.** Titolo, dialoghi, flag, obiettivi.
4. **Disegna le tue mappe** con Tiled (o modifica quelle del template) e piazza gli oggetti.
5. **Collega le scene** con le porte e aggiungi gli oggetti.
6. **Sostituisci la grafica** (tileset, sprite, personaggio) e aggiungi l'audio.
7. **Rifinisci e gioca al gioco di un compagno**: segnala bug e cose poco chiare.

---

## Se ti blocchi

- **Schermata rossa "Impossibile caricare…"** → usa Live Server, non il doppio click. Controlla anche i nomi dei file.
- **La mappa non si vede** → i nomi dei livelli in Tiled devono coincidere esattamente con quelli del codice;
  guarda la console del browser (F12) per gli avvisi.
- **Il personaggio attraversa i muri** → le tile degli ostacoli devono stare nel livello `World` ed essere
  `collides = true`. Per vedere le hitbox metti `debug: true` in `main.js`.
- **Il personaggio non riesce a passare in un varco** → l'area "fisica" è di 30×40 pixel (circa 1×1,25 tile) e sta
  sui piedi: i varchi devono essere larghi almeno 2 tile.
- **Il dialogo non parte** → controlla che l'oggetto in Tiled sia di tipo `npc`, che abbia la proprietà `dialogo`
  e che la chiave esista in `dialoghi.js`. Avvicinati: deve comparire `[E]` sopra il personaggio.
- **La porta non si apre** → leggi la `condizione` e controlla in console (`GameState.flags`, `GameState.inventario`)
  se è vera. Attenzione alle maiuscole nei nomi delle flag!
- **Un avviso "Flag sconosciuta"** → aggiungi la flag a `FLAG_INIZIALI` o correggi l'ortografia.

Buon lavoro, e soprattutto: **divertite chi giocherà al vostro gioco**. 🎮
