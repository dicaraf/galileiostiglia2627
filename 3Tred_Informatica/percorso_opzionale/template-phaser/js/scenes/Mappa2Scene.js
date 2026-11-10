/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  MAPPA2SCENE.JS — La Foresta (seconda scena)                 ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  La mappa è in  assets/tilemaps/foresta.json  (Tiled).       ║
 * ║                                                              ║
 * ║  In questa scena (tutto nel livello "Objects" della mappa):  ║
 * ║   • lo Spirito della Foresta, con un dialogo a domande       ║
 * ║   • il Cristallo, un OGGETTO RACCOGLIBILE                    ║
 * ║   • la porta di ritorno verso il Villaggio, che si apre solo ║
 * ║     se si ha il Cristallo (condizione: ha:cristallo)         ║
 * ║                                                              ║
 * ║  ✏️  PER AGGIUNGERE UNA TERZA MAPPA:                        ║
 * ║   1. Disegnatela in Tiled e salvatela in assets/tilemaps/    ║
 * ║   2. In PreloadScene.js caricatela con tilemapTiledJSON(...) ║
 * ║   3. Copiate questo file in Mappa3Scene.js e cambiate i nomi ║
 * ║      ('Mappa3Scene' e la chiave della mappa)                 ║
 * ║   4. Registratela in index.html (tag <script>) e nell'array  ║
 * ║      scene: [...] di main.js                                 ║
 * ║   5. In Tiled aggiungete una porta (tipo "porta") nella      ║
 * ║      mappa precedente con destinazione = Mappa3Scene         ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class Mappa2Scene extends MappaBaseScene {

  constructor() {
    super('Mappa2Scene', { chiaveMappa: 'foresta' });
  }

}
