/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  MAIN.JS — Configurazione principale del gioco              ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Qui si definiscono le impostazioni globali di Phaser:      ║
 * ║  dimensione della finestra, fisica, elenco delle scene.     ║
 * ║                                                              ║
 * ║  ✏️  STUDENTI: se aggiungete una scena (es. Mappa3Scene)    ║
 * ║      ricordatevi di metterla nell'array "scene" qui sotto   ║
 * ║      e di aggiungere il suo <script> in index.html!         ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const config = {
  type: Phaser.AUTO,         // sceglie automaticamente WebGL o Canvas

  // Dimensione della finestra di gioco (in pixel): 25 x 15,6 tile da 32 px.
  // La mappa è più grande: la camera segue il giocatore.
  width:  800,
  height: 500,

  backgroundColor: '#0d0d1a',

  // pixelArt: immagini nitide (senza sfocatura) quando si ingrandisce: serve per la grafica a pixel
  pixelArt: true,

  // Fisica arcade: movimento e collisioni "dall'alto" (nessuna gravità)
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false           // ← metti true per vedere le hitbox (utile per il debug!)
    }
  },

  // Elenco delle scene. Parte la prima (PreloadScene), le altre si avviano con
  // this.scene.start('NomeScena'). MappaBaseScene NON va elencata: non è una scena
  // vera e propria, ma la "base" che Mappa1Scene e Mappa2Scene estendono.
  scene: [
    PreloadScene,   // 1. Carica mappe, tileset e personaggio
    TitleScene,     // 2. Schermata del titolo
    Mappa1Scene,    // 3. Il Villaggio
    Mappa2Scene,    // 4. La Foresta
    UIScene         // 5. HUD sovrapposto (inventario, obiettivo)
  ]
};

const game = new Phaser.Game(config);
