/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  MAPPABASESCENE.JS — Il "motore" comune a tutte le mappe     ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Ogni mappa del gioco (Mappa1Scene, Mappa2Scene...) estende  ║
 * ║  questa classe. Qui è scritto UNA SOLA VOLTA tutto ciò che   ║
 * ║  serve a una mappa:                                          ║
 * ║                                                              ║
 * ║   • costruisce la mappa Tiled (terreno, ostacoli, ...)       ║
 * ║   • crea il giocatore, con animazioni e collisioni           ║
 * ║   • la camera che lo segue (la mappa è più grande dello      ║
 * ║     schermo)                                                 ║
 * ║   • crea personaggi, porte e oggetti leggendo il livello     ║
 * ║     "Objects" della mappa Tiled                              ║
 * ║   • gestisce dialoghi, porte condizionate e raccolta oggetti ║
 * ║                                                              ║
 * ║  Per questo NON serve riscrivere il codice per ogni mappa:   ║
 * ║  si disegna la mappa in Tiled e si piazzano gli oggetti.     ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  GLI OGGETTI DEL LIVELLO "Objects" IN TILED
 *  ──────────────────────────────────────────
 *  Ogni oggetto ha un Nome e un Tipo (campo "Class"/"Type"), più le
 *  Proprietà personalizzate qui sotto. La posizione indica dove si
 *  appoggiano i PIEDI del personaggio (centro della tile).
 *
 *  Tipo "partenza"  (punto)   Dove appare il giocatore all'inizio.
 *                             Nome:  Spawn Point
 *
 *  Tipo "arrivo"    (punto)   Dove appare il giocatore quando arriva
 *                             da un'altra mappa. Nome libero (es. da_foresta):
 *                             è il nome scritto nella proprietà "arrivo" di una porta.
 *
 *  Tipo "npc"       (punto)   Un personaggio che parla.
 *      dialogo   (testo)      chiave del dialogo in dialoghi.js, es. luna
 *      sprite    (testo)      facoltativo: nome dell'immagine PNG del personaggio, tra quelli
 *                             elencati in SPRITE_PERSONAGGI (config.js), es. luna
 *      tinta     (testo)      facoltativo: colore, es. #ffb0dc  (per distinguere i personaggi
 *                             che usano lo stesso sprite di Misa)
 *      raggio    (numero)     facoltativo: distanza di interazione (default 64)
 *      atlas, frame (testo)   facoltativo: per usare uno sprite diverso da quello del giocatore
 *
 *  Tipo "porta"     (rettangolo)  Passaggio verso un'altra scena.
 *      destinazione (testo)   nome della scena, es. Mappa2Scene
 *      condizione   (testo)   facoltativo: quando si apre (sintassi in GameState.js),
 *                             es. flag:haParlatoConLuna   oppure   ha:chiave
 *      messaggio    (testo)   cosa dice il gioco se la porta è chiusa
 *      arrivo       (testo)   nome del punto "arrivo" nella mappa di destinazione
 *      etichetta    (testo)   facoltativo: scritta mostrata vicino alla porta
 *      visibile     (sì/no)   facoltativo: "no" nasconde il rettangolo grigio/verde
 *                             (utile per la porta di una casa). Default: sì
 *      tasto        (sì/no)   facoltativo: "sì" = la porta si apre premendo E mentre
 *                             ci si sta sopra, invece di scattare camminandoci. Default: no
 *
 *  Tipo "oggetto"   (punto)   Un oggetto che si raccoglie camminandoci sopra.
 *      oggetto   (testo)      nome nell'inventario, es. cristallo
 *      texture   (testo)      immagine da mostrare (chiave caricata in PreloadScene)
 *      messaggio (testo)      facoltativo: frase mostrata alla raccolta
 */

class MappaBaseScene extends Phaser.Scene {

  /**
   * @param {string} chiaveScena  - Nome della scena (es. 'Mappa1Scene')
   * @param {object} impostazioni - chiaveMappa (obbligatoria) + eventuali nomi di tileset e layer
   */
  constructor(chiaveScena, impostazioni) {
    super(chiaveScena);
    this.imp = Object.assign({
      chiaveMappa:  null,                              // chiave caricata in PreloadScene
      nomeTileset:  'tuxmon-sample-32px-extruded',     // nome del tileset DENTRO Tiled
      chiaveTileset: 'tiles',                          // chiave dell'immagine caricata in PreloadScene
      layerSotto:   'Below Player',                    // terreno (si cammina sopra)
      layerMondo:   'World',                           // ostacoli: tile con proprietà collides = true
      layerSopra:   'Above Player',                    // decorazioni che coprono il giocatore
      layerOggetti: 'Objects'                          // personaggi, porte, oggetti, partenza
    }, impostazioni);
  }


  // ═════════════════════════════════════════════════════════
  //  CREAZIONE DELLA SCENA
  // ═════════════════════════════════════════════════════════
  create() {
    this.inTransizione = false;
    this.npcs  = [];
    this.porte = [];

    this._costruisciMappa();
    this._creaGiocatore();
    this._configuraCamera();
    this._configuraControlli();

    this.dialogo = new DialogManager(this);

    this._creaOggettiDiMappa();

    this.cameras.main.fadeIn(300);
    this.onCreate();
  }

  // ───────────────────────────────────────────
  //  1. La mappa Tiled
  // ───────────────────────────────────────────
  _costruisciMappa() {
    const imp = this.imp;
    this.mappa = this.make.tilemap({ key: imp.chiaveMappa });

    // Il primo parametro è il nome del tileset in Tiled, il secondo è la chiave dell'immagine
    const tileset = this.mappa.addTilesetImage(imp.nomeTileset, imp.chiaveTileset);
    if (!tileset) {
      console.error(`[${this.scene.key}] ❌ Tileset "${imp.nomeTileset}" non trovato nella mappa "${imp.chiaveMappa}". ` +
                    `Controlla il nome del tileset in Tiled.`);
    }

    this.layerSotto = this._creaLayer(imp.layerSotto, tileset);
    this.layerMondo = this._creaLayer(imp.layerMondo, tileset);
    this.layerSopra = this._creaLayer(imp.layerSopra, tileset);

    // Le tile con la proprietà personalizzata  collides = true  fanno da ostacolo
    if (this.layerMondo) this.layerMondo.setCollisionByProperty({ collides: true });
    // "Above Player" deve stare SOPRA il giocatore (profondità maggiore)
    if (this.layerSopra) this.layerSopra.setDepth(10);

    this.larghezzaMondo = this.mappa.widthInPixels;
    this.altezzaMondo   = this.mappa.heightInPixels;
    this.physics.world.setBounds(0, 0, this.larghezzaMondo, this.altezzaMondo);

    // Leggo gli oggetti del livello "Objects" direttamente dal file JSON di Tiled
    const dati = this.cache.tilemap.get(imp.chiaveMappa).data;
    const livelloOggetti = (dati.layers || []).find(l => l.type === 'objectgroup' && l.name === imp.layerOggetti);
    this.oggettiTiled = livelloOggetti ? livelloOggetti.objects : [];
    if (!livelloOggetti) {
      console.warn(`[${this.scene.key}] ⚠️ Nella mappa non c'è il livello di oggetti "${imp.layerOggetti}".`);
    }
  }

  _creaLayer(nome, tileset) {
    if (!this.mappa.layers.some(l => l.name === nome)) {
      console.warn(`[${this.scene.key}] ⚠️ Il layer "${nome}" non esiste nella mappa (i nomi devono coincidere con quelli di Tiled).`);
      return null;
    }
    return this.mappa.createLayer(nome, tileset, 0, 0);
  }

  // ───────────────────────────────────────────
  //  2. Il giocatore
  // ───────────────────────────────────────────
  _creaGiocatore() {
    const partenza = this._trovaPartenza();
    const c = PLAYER.corpo;

    // origine in basso al centro: (x, y) = dove poggiano i piedi
    this.player = this.physics.add.sprite(partenza.x, partenza.y, PLAYER.atlas, `${PLAYER.prefisso}-front`)
      .setOrigin(0.5, 1)
      .setDepth(5);
    this.player.body.setSize(c.larghezza, c.altezza).setOffset(c.offsetX, c.offsetY);
    this.player.setCollideWorldBounds(true);
    this.direzione = 'front';

    if (this.layerMondo) this.physics.add.collider(this.player, this.layerMondo);
  }

  _trovaPartenza() {
    let o = null;
    if (GameState.arrivo) {
      o = this.oggettiTiled.find(x => x.name === GameState.arrivo);
      if (!o) console.warn(`[${this.scene.key}] ⚠️ Punto di arrivo "${GameState.arrivo}" non trovato: uso la partenza normale.`);
    }
    if (!o) o = this.oggettiTiled.find(x => this._tipo(x) === 'partenza' || x.name === 'Spawn Point');
    GameState.arrivo = null;

    if (!o) {
      console.warn(`[${this.scene.key}] ⚠️ Nessun punto di partenza ("Spawn Point") nella mappa: parto dal centro.`);
      return { x: this.larghezzaMondo / 2, y: this.altezzaMondo / 2 };
    }
    return { x: o.x, y: o.y };
  }

  // ───────────────────────────────────────────
  //  3. Camera e controlli
  // ───────────────────────────────────────────
  _configuraCamera() {
    const cam = this.cameras.main;
    cam.setBounds(0, 0, this.larghezzaMondo, this.altezzaMondo);
    cam.centerOn(this.player.x, this.player.y - 32);   // parte già centrata sul giocatore
    cam.startFollow(this.player, true, 0.12, 0.12);
  }

  _configuraControlli() {
    this.cursori = this.input.keyboard.createCursorKeys();
    this.tastiWASD = this.input.keyboard.addKeys('W,A,S,D');
    this.tastoInterazione = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }

  // ───────────────────────────────────────────
  //  4. Personaggi, porte, oggetti dal livello "Objects"
  // ───────────────────────────────────────────
  _creaOggettiDiMappa() {
    this.oggettiTiled.forEach(o => {
      switch (this._tipo(o)) {
        case 'npc':     this._creaNPC(o);     break;
        case 'porta':   this._creaPorta(o);   break;
        case 'oggetto': this._creaOggetto(o); break;
        // 'partenza' e 'arrivo' sono già stati usati per posizionare il giocatore
      }
    });
  }

  _tipo(o) {
    return String(o.type || o.class || '').toLowerCase();
  }

  /** Converte le proprietà personalizzate di Tiled in un semplice oggetto { nome: valore }. */
  _prop(o) {
    const p = {};
    if (Array.isArray(o.properties)) o.properties.forEach(x => { p[x.name] = x.value; });
    else Object.assign(p, o.properties || {});
    return p;
  }

  // ----- PERSONAGGI -----
  _creaNPC(o) {
    const p = this._prop(o);
    let sprite;
    if (p.sprite) {
      // Personaggio con la sua immagine PNG (proprietà "sprite" = nome in SPRITE_PERSONAGGI)
      if (!this.textures.exists(p.sprite)) {
        console.warn(`[${this.scene.key}] ⚠️ Lo sprite "${p.sprite}" non è stato caricato: scrivilo in SPRITE_PERSONAGGI (config.js) e controlla assets/sprites/.`);
      }
      sprite = this.physics.add.sprite(o.x, o.y, p.sprite).setOrigin(0.5, 1).setDepth(5 + o.y / 10000);
      // Area fisica = i piedi: tutta la larghezza (un po' ridotta) e la metà bassa dell'immagine
      const bw = Math.round(sprite.width * 0.8), bh = Math.round(sprite.height * 0.45);
      sprite.body.setSize(bw, bh).setOffset((sprite.width - bw) / 2, sprite.height - bh);
    } else {
      const atlas = p.atlas || PLAYER.atlas;
      const frame = p.frame || `${PLAYER.prefisso}-front`;
      const c = PLAYER.corpo;
      sprite = this.physics.add.sprite(o.x, o.y, atlas, frame)
        .setOrigin(0.5, 1)
        .setDepth(5 + o.y / 10000);
      sprite.body.setSize(c.larghezza, c.altezza).setOffset(c.offsetX, c.offsetY);
    }
    sprite.setImmovable(true);
    sprite.body.moves = false;
    if (p.tinta) sprite.setTint(Phaser.Display.Color.HexStringToColor(p.tinta).color);

    this.physics.add.collider(this.player, sprite);

    if (!p.dialogo) console.warn(`[${this.scene.key}] ⚠️ Il personaggio "${o.name}" non ha la proprietà "dialogo".`);

    const label = this.add.text(o.x, o.y - sprite.displayHeight - 4, '[E]', {
      fontSize: '11px', fontFamily: 'monospace', color: '#f5c842',
      backgroundColor: '#000000aa', padding: { x: 3, y: 1 }
    }).setOrigin(0.5, 1).setDepth(6).setVisible(false);

    this.npcs.push({
      nome: o.name, dialogo: p.dialogo, sprite, label,
      raggio: Number(p.raggio) || 64,
      puoGirarsi: !p.sprite && !p.atlas && !p.frame   // si volta verso il giocatore solo se usa l'atlas standard
    });
  }

  _controllaNPC() {
    let vicino = null, distMin = Infinity;
    this.npcs.forEach(n => {
      const d = Phaser.Math.Distance.BetweenPoints(this.player.body.center, n.sprite.body.center);
      const entro = d <= n.raggio;
      n.label.setVisible(entro);
      if (entro && d < distMin) { vicino = n; distMin = d; }
    });

    if (vicino && Phaser.Input.Keyboard.JustDown(this.tastoInterazione)) {
      this._rivolgiVerso(vicino);
      this.dialogo.avvia(vicino.dialogo);
    }
  }

  /** Il personaggio si gira verso il giocatore (e viceversa) quando iniziano a parlare. */
  _rivolgiVerso(npc) {
    const dx = this.player.body.center.x - npc.sprite.body.center.x;
    const dy = this.player.body.center.y - npc.sprite.body.center.y;
    const orizzontale = Math.abs(dx) > Math.abs(dy);
    const verso = orizzontale ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'back' : 'front');
    const opposto = { left: 'right', right: 'left', back: 'front', front: 'back' };

    if (npc.puoGirarsi) npc.sprite.setFrame(`${PLAYER.prefisso}-${verso}`);
    this.direzione = opposto[verso];
    this._fermaGiocatore();
  }

  // ----- PORTE -----
  /** Legge una proprietà sì/no di Tiled (accetta casella spuntata, sì, si, true, no, false...). */
  _siNo(valore, predefinito) {
    if (valore === undefined || valore === null || valore === '') return predefinito;
    if (typeof valore === 'boolean') return valore;
    return !['no', 'n', 'false', '0'].includes(String(valore).trim().toLowerCase());
  }

  _creaPorta(o) {
    const p = this._prop(o);
    const cx = o.x + o.width / 2, cy = o.y + o.height / 2;
    const visibile = this._siNo(p.visibile, true);
    const conTasto = this._siNo(p.tasto, false);

    const zona = this.add.zone(cx, cy, o.width, o.height);
    this.physics.add.existing(zona, true);            // true = corpo statico

    // Rettangolo che cambia colore: grigio = chiusa, verde = aperta
    const segnale = this.add.rectangle(cx, cy, o.width, o.height, 0x888888, 0.35).setDepth(1).setVisible(visibile);

    if (p.etichetta) {
      this.add.text(Phaser.Math.Clamp(cx, 50, this.larghezzaMondo - 50), o.y - 6, p.etichetta, {
        fontSize: '12px', fontFamily: 'monospace', color: '#ffffff',
        backgroundColor: '#000000aa', padding: { x: 5, y: 2 }
      }).setOrigin(0.5, 1).setDepth(3);
    }

    // Porta con tasto: compare [E] quando il giocatore è sopra la porta
    let suggerimento = null;
    if (conTasto) {
      suggerimento = this.add.text(cx, o.y - 4, '[E]', {
        fontSize: '11px', fontFamily: 'monospace', color: '#f5c842',
        backgroundColor: '#000000aa', padding: { x: 3, y: 1 }
      }).setOrigin(0.5, 1).setDepth(6).setVisible(false);
    }

    // inUso = true all'inizio: se il giocatore appare dentro la zona, la porta non scatta subito
    this.porte.push({ zona, segnale, p, nome: o.name, conTasto, suggerimento, inUso: true });
  }

  _controllaPorte() {
    this.porte.forEach(porta => {
      const dentro = this.physics.overlap(this.player, porta.zona);
      if (porta.suggerimento) porta.suggerimento.setVisible(dentro);
      if (porta.conTasto) {
        // porta con tasto: si prova ad aprire solo premendo E mentre ci si sta sopra
        if (dentro && Phaser.Input.Keyboard.JustDown(this.tastoInterazione)) this._provaPorta(porta);
      } else if (!dentro) porta.inUso = false;
      else if (!porta.inUso) {
        porta.inUso = true;                           // evita di ripetere il messaggio finché si resta nella zona
        this._provaPorta(porta);
      }
      porta.segnale.setFillStyle(GameState.valuta(porta.p.condizione) ? 0x4caf50 : 0x888888, 0.35);
    });
  }

  _provaPorta(porta) {
    const p = porta.p;
    if (!GameState.valuta(p.condizione)) {
      if (p.messaggio) this.dialogo.apri(p.messaggio, '');
      return;
    }
    if (!p.destinazione || !this.scene.manager.keys[p.destinazione]) {
      console.warn(`[${this.scene.key}] ⚠️ La porta "${porta.nome}" porta a una scena che non esiste: "${p.destinazione}". ` +
                   `Controlla la proprietà "destinazione" e che la scena sia in main.js.`);
      return;
    }

    GameState.arrivo = p.arrivo || null;
    this.inTransizione = true;
    this.player.setVelocity(0);
    const cam = this.cameras.main;
    cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(p.destinazione));
    cam.fadeOut(250);
  }

  // ----- OGGETTI RACCOGLIBILI -----
  _creaOggetto(o) {
    const p = this._prop(o);
    const id = `${this.scene.key}:${o.name}`;
    if (GameState.oggettiRaccolti.includes(id)) return;       // già raccolto: non riappare

    const oggetto = this.physics.add.sprite(o.x, o.y, p.texture || 'obj_cristallo')
      .setOrigin(0.5, 1).setDepth(5);
    this.tweens.add({ targets: oggetto, y: o.y - 8, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    this.physics.add.overlap(this.player, oggetto, () => {
      if (oggetto.raccolto) return;
      oggetto.raccolto = true;
      GameState.aggiungiOggetto(p.oggetto || o.name);
      GameState.oggettiRaccolti.push(id);
      oggetto.destroy();
      if (p.messaggio) this.dialogo.apri(p.messaggio, '');
    });
  }


  // ═════════════════════════════════════════════════════════
  //  AGGIORNAMENTO A OGNI FOTOGRAMMA
  // ═════════════════════════════════════════════════════════
  update() {
    if (this.inTransizione) return;

    if (this.dialogo.inCorso) {
      this._fermaGiocatore();
      this.npcs.forEach(n => n.label.setVisible(false));
      this.porte.forEach(pt => pt.suggerimento && pt.suggerimento.setVisible(false));
      this.dialogo.aggiorna();
      return;
    }

    this._muovi();
    this._controllaNPC();
    this._controllaPorte();
    this.player.setDepth(5 + this.player.y / 10000);          // chi sta più in basso sta davanti
    this.onUpdate();
  }

  _muovi() {
    const v = PLAYER.velocita;
    const k = this.cursori, w = this.tastiWASD;
    let vx = 0, vy = 0, dir = null;

    if      (k.left.isDown  || w.A.isDown) { vx = -v; dir = 'left'; }
    else if (k.right.isDown || w.D.isDown) { vx =  v; dir = 'right'; }
    if      (k.up.isDown    || w.W.isDown) { vy = -v; if (!dir) dir = 'back'; }
    else if (k.down.isDown  || w.S.isDown) { vy =  v; if (!dir) dir = 'front'; }

    this.player.setVelocity(vx, vy);
    this.player.body.velocity.normalize().scale(v);           // in diagonale non si va più veloci

    if (dir) {
      this.direzione = dir;
      this.player.anims.play(`${PLAYER.prefisso}-${dir}-walk`, true);
    } else {
      this._fermaGiocatore();
    }
  }

  _fermaGiocatore() {
    this.player.setVelocity(0);
    this.player.anims.stop();
    this.player.setTexture(PLAYER.atlas, `${PLAYER.prefisso}-${this.direzione}`);
  }


  // ═════════════════════════════════════════════════════════
  //  ✏️  PUNTI DI ESTENSIONE per le scene "figlie"
  //  Se vi serve codice vostro (un messaggio all'ingresso, un nemico,
  //  un timer...) scrivetelo in onCreate() e onUpdate() della
  //  vostra scena (vedi Mappa1Scene.js).
  // ═════════════════════════════════════════════════════════
  onCreate() {}
  onUpdate() {}

}
