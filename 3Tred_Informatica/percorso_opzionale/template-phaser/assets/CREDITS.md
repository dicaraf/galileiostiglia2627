# Crediti delle risorse

Le risorse grafiche di questo template provengono dagli esempi del tutorial
*"Creating a Phaser 3 Tilemap"* di Mike Hadley:
https://github.com/mikewesthad/phaser-3-tilemap-blog-posts (cartella `examples/post-1`)

| Risorsa | File | Origine |
|---|---|---|
| Tileset e mappa del villaggio | `tilesets/tuxmon-sample-32px-extruded.png`, `tilemaps/tuxemon-town.json` | Progetto Tuxemon (https://github.com/Tuxemon/Tuxemon) |
| Personaggio "Misa" (atlas) | `atlas/atlas.png`, `atlas/atlas.json` | Progetto Tuxemon |
| Mappa della foresta | `tilemaps/foresta.json` | Realizzata per questo template riusando lo stesso tileset |
| Luna, Bruto, Mago, Pip (sprite fermi) | `sprites/luna.png`, `bruto.png`, `mago.png`, `pip.png` | Immagine fornita dal docente (ritagliata e ridotta). ⚠️ **Provvisoria**: vedi sotto |
| Cristallo | disegnato con il codice in `PreloadScene.js` | — |

La mappa del villaggio è stata modificata aggiungendo gli oggetti del livello
"Objects" (personaggi, porta, punto di arrivo) e allargando di un albero
l'apertura sul lato ovest.

⚠️ **Licenze:** prima di pubblicare o distribuire il vostro gioco fuori dalla
scuola, controllate la licenza esatta delle risorse del progetto Tuxemon
(nel loro repository) e citate gli autori come richiesto. Se usate risorse
vostre o di altri autori, aggiungete qui una riga con autore e licenza
(la Scheda 8 del Quaderno di progettazione serve proprio a questo).

⚠️ **I quattro sprite dei personaggi sono provvisori.** L'immagine originale è un'anteprima
con filigrana (marchio d'acqua) di un sito di immagini a pagamento: la filigrana si intravede
ancora, molto sbiadita, attorno e sopra ai personaggi. Prima di usare il gioco fuori dalla classe
serve la versione con licenza (acquistata o gratuita) oppure sprite disegnati dagli studenti.
Per sostituirli basta mettere nuovi file con **lo stesso nome** in `assets/sprites/`, sempre PNG con
sfondo trasparente: il resto non cambia.
