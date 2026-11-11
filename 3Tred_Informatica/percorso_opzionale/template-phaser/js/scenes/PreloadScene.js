/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  PRELOADSCENE.JS — Caricamento degli asset                   ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Carica prima di iniziare tutto ciò che serve al gioco:      ║
 * ║   • le MAPPE disegnate con Tiled (file .json)                ║
 * ║   • il TILESET (l'immagine con le "tessere" delle mappe)     ║
 * ║   • l'ATLAS del personaggio (immagine + file .json)          ║
 * ║   • (facoltativo) musica ed effetti sonori                   ║
 * ║                                                              ║
 * ║  Qui si collega il nome (la "chiave") di ogni asset al suo   ║
 * ║  file: le scene poi usano solo la chiave.                    ║
 * ║                                                              ║
 * ║  ✏️  STUDENTI: per aggiungere una mappa, il vostro tileset  ║
 * ║     o il vostro personaggio, aggiungete/sostituite le righe  ║
 * ║     this.load... qui sotto.                                  ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
    this.erroriCaricamento = [];
  }

  preload() {
    // ─────────────────────────────────────────────
    //  Barra di caricamento
    // ─────────────────────────────────────────────
    const W = this.scale.width, H = this.scale.height;
    this.add.rectangle(W / 2, H / 2, 320, 24, 0x222244).setStrokeStyle(2, 0xe0c060);
    const barra = this.add.rectangle(W / 2 - 156, H / 2, 4, 16, 0xe0c060).setOrigin(0, 0.5);
    this.add.text(W / 2, H / 2 - 30, 'Caricamento...', {
      fontSize: '14px', fontFamily: 'monospace', color: '#e0c060'
    }).setOrigin(0.5);

    this.load.on('progress', v => { barra.width = 312 * v; });
    this.load.on('loaderror', file => this.erroriCaricamento.push(file.src));

    // ═════════════════════════════════════════════════════════
    //  🗺️  MAPPE (file esportati da Tiled in formato JSON)
    //      load.tilemapTiledJSON( chiave, file )
    // ═════════════════════════════════════════════════════════
    this.load.tilemapTiledJSON('villaggio', 'assets/tilemaps/tuxemon-town.json');   // ← Mappa1Scene
    this.load.tilemapTiledJSON('foresta',   'assets/tilemaps/foresta.json');        // ← Mappa2Scene
    // ✏️ Una nuova mappa?  this.load.tilemapTiledJSON('caverna', 'assets/tilemaps/caverna.json');

    // ═════════════════════════════════════════════════════════
    //  🧱  TILESET (l'immagine con tutte le tessere della mappa)
    //      In Tiled il tileset deve avere margin 1 / spacing 2
    //      se è "extruded" come questo. La chiave 'tiles' è
    //      quella usata dalle scene.
    // ═════════════════════════════════════════════════════════
    this.load.image('tiles', 'assets/tilesets/tuxmon-sample-32px-extruded.png');

    // ═════════════════════════════════════════════════════════
    //  🧍  ATLAS DEL PERSONAGGIO (immagine + descrizione JSON)
    //      Contiene tutti i fotogrammi: misa-front, misa-left-walk.000, ...
    //      (i nomi dei fotogrammi sono in assets/atlas/atlas.json)
    // ═════════════════════════════════════════════════════════
    this.load.atlas(PLAYER.atlas, 'assets/atlas/atlas.png', 'assets/atlas/atlas.json');

    // ═════════════════════════════════════════════════════════
    //  🧑‍🤝‍🧑  SPRITE DEI PERSONAGGI FERMI (un'immagine PNG ciascuno)
    //      L'elenco dei nomi è in config.js (SPRITE_PERSONAGGI).
    //      Per aggiungerne uno: mettete il file in assets/sprites/,
    //      scrivete il nome nell'elenco e usate la proprietà
    //      "sprite" nell'oggetto npc in Tiled.
    // ═════════════════════════════════════════════════════════
    SPRITE_PERSONAGGI.forEach(nome => this.load.image(nome, `assets/sprites/${nome}.png`));

    // ═════════════════════════════════════════════════════════
    //  🔊  AUDIO (facoltativo)
    // ═════════════════════════════════════════════════════════
    // this.load.audio('musica_villaggio', 'assets/audio/villaggio.mp3');
  }

  create() {
    // Se un file non si carica quasi sempre è perché la pagina è stata aperta con un
    // doppio click: il browser blocca la lettura dei file locali. Serve Live Server!
    if (this.erroriCaricamento.length > 0) {
      this.cameras.main.setBackgroundColor('#1a0d0d');
      this.add.text(this.scale.width / 2, this.scale.height / 2 + 20,
        'Impossibile caricare:\n' + this.erroriCaricamento.map(s => '• ' + s).join('\n') +
        '\n\nApri il gioco con "Live Server" di VS Code\n(non con il doppio click su index.html).',
        { fontSize: '12px', fontFamily: 'monospace', color: '#ff9d9d', align: 'center', wordWrap: { width: 700 } }
      ).setOrigin(0.5, 0);
      return;
    }

    this._creaAnimazioniGiocatore();
    this._creaTextureOggetti();

    console.log('[PreloadScene] ✅ Asset caricati. Avvio TitleScene.');
    this.scene.start('TitleScene');
  }


  // ═════════════════════════════════════════════════════════
  //  ANIMAZIONI DEL GIOCATORE (sono globali: valgono per tutte le scene)
  //  I nomi dei fotogrammi nell'atlas sono: prefisso-direzione-walk.000 ... .003
  // ═════════════════════════════════════════════════════════
  _creaAnimazioniGiocatore() {
    ['left', 'right', 'front', 'back'].forEach(direzione => {
      this.anims.create({
        key: `${PLAYER.prefisso}-${direzione}-walk`,
        frames: this.anims.generateFrameNames(PLAYER.atlas, {
          prefix: `${PLAYER.prefisso}-${direzione}-walk.`,
          start: 0, end: 3, zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      });
    });
  }

  // ═════════════════════════════════════════════════════════
  //  OGGETTI RACCOGLIBILI "provvisori" (disegnati con il codice).
  //  ✏️ STUDENTI: quando avrete lo sprite del vostro oggetto,
  //     caricatelo sopra con this.load.image('nome', 'assets/sprites/nome.png')
  //     e usate 'nome' come proprietà "texture" dell'oggetto in Tiled.
  // ═════════════════════════════════════════════════════════
  _creaTextureOggetti() {
    const g = this.add.graphics();
    g.fillStyle(0x8e44ad, 1);
    g.fillTriangle(12, 2, 22, 10, 12, 28);
    g.fillTriangle(12, 2, 2, 10, 12, 28);
    g.lineStyle(1, 0xffffff, 0.6);
    g.strokeTriangle(12, 2, 22, 10, 12, 28);
    g.strokeTriangle(12, 2, 2, 10, 12, 28);
    g.generateTexture('obj_cristallo', 24, 30);
    g.destroy();
  }

}
