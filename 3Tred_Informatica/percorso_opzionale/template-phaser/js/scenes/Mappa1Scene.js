/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  MAPPA1SCENE.JS — Il Villaggio (prima scena)                 ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  La mappa è in  assets/tilemaps/tuxemon-town.json  (Tiled).  ║
 * ║  Personaggi, porte e punti di partenza sono oggetti del      ║
 * ║  livello "Objects" della mappa: aprite il file con Tiled     ║
 * ║  per vederli e spostarli.                                    ║
 * ║                                                              ║
 * ║  In questa scena:                                            ║
 * ║   • Luna e Bruto, con dialoghi a scelta (dialoghi.js)        ║
 * ║   • una porta verso la Foresta che si apre SOLO dopo aver    ║
 * ║     accettato la missione di Luna                            ║
 * ║                                                              ║
 * ║  Tutto il funzionamento è in MappaBaseScene.js: qui resta    ║
 * ║  solo ciò che è specifico di questa mappa.                   ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class Mappa1Scene extends MappaBaseScene {

  constructor() {
    // 'villaggio' è la chiave della mappa caricata in PreloadScene
    super('Mappa1Scene', { chiaveMappa: 'villaggio' });
  }

  // ✏️ Codice vostro, eseguito quando la scena si crea.
  //    Qui: un messaggio di benvenuto, mostrato una sola volta all'inizio.
  onCreate() {
    if (!GameState.flags.introVista) {
      GameState.flags.introVista = true;
      this.dialogo.apri([
        'Sei arrivato al Villaggio dopo un lungo viaggio.',
        'Parla con le persone che incontri: premi E vicino a loro.'
      ], 'Narratore');
    }
  }

}
