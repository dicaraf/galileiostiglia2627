/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  DIALOGMANAGER.JS — Sistema di dialoghi con scelte           ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Mostra i dialoghi scritti in dialoghi.js: testo che appare  ║
 * ║  a lettere, nodi collegati tra loro, scelte per il           ║
 * ║  giocatore, effetti sullo stato del gioco.                   ║
 * ║                                                              ║
 * ║  USO (dentro una scena — le scene "Mappa" lo fanno già):     ║
 * ║                                                              ║
 * ║    this.dialogo = new DialogManager(this);     // in create  ║
 * ║    this.dialogo.avvia('luna');                 // dialogo da ║
 * ║                                                // dialoghi.js║
 * ║    this.dialogo.apri(['Testo 1', 'Testo 2'],   // messaggio  ║
 * ║                      'Chi parla');             // semplice   ║
 * ║    this.dialogo.aggiorna();                    // in update  ║
 * ║    if (this.dialogo.inCorso) { ... }  // blocca il movimento║
 * ║                                                              ║
 * ║  COMANDI: E (o INVIO) = avanti / conferma                    ║
 * ║           ↑ ↓ (o W S) oppure 1 2 3 = scegliere               ║
 * ║                                                              ║
 * ║  ✏️  STUDENTI: potete cambiare colori e dimensioni qui sotto ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class DialogManager {

  constructor(scene) {
    this.scene  = scene;
    this.attivo = false;
    this.stato  = 'chiuso';   // 'scrivendo' | 'attesa' | 'scelta' | 'chiuso'
    this.onFine = null;

    this.dialogo = null;      // i dati del dialogo in corso
    this.nodo    = null;      // il nodo mostrato ora
    this.pagine  = [];
    this.indicePagina = 0;
    this.scelteDisp   = [];   // scelte visibili del nodo corrente
    this.indiceScelta = 0;

    // Tasti (se la scena ha già creato lo stesso tasto, Phaser riusa quello)
    const kb = scene.input.keyboard;
    const K  = Phaser.Input.Keyboard.KeyCodes;
    this.tastoAvanza = kb.addKey(K.E);
    this.tastoInvio  = kb.addKey(K.ENTER);
    this.cursori     = kb.createCursorKeys();
    this.tastiWS     = kb.addKeys('W,S');
    this.tastiNumeri = kb.addKeys('ONE,TWO,THREE,FOUR');

    this._costruisciBox();
    this._nascondi();
  }


  // ───────────────────────────────────────────
  //  ASPETTO DEL BOX
  // ───────────────────────────────────────────

  _costruisciBox() {
    const W = this.scene.scale.width;
    const H = this.scene.scale.height;

    // ✏️ STUDENTI: personalizzate colori e velocità
    this.COL_SFONDO = 0x0d0d2a;
    this.COL_BORDO  = 0xe0c060;
    this.COL_NOME   = '#f5c842';
    this.COL_TESTO  = '#e8e8e8';
    this.COL_SCELTA = '#a8a8c8';
    this.COL_SCELTA_SEL = '#f5c842';
    this.MS_PER_CARATTERE = 18;          // più basso = testo più veloce

    const BOX_H   = 170;
    const MARGINE = 14;
    const top     = H - MARGINE - BOX_H;
    this.areaTesto = { x: MARGINE + 14, y: top + 34, larghezza: W - MARGINE * 2 - 28 };

    this.sfondo = this.scene.add.rectangle(W / 2, top + BOX_H / 2, W - MARGINE * 2, BOX_H, this.COL_SFONDO, 0.94)
      .setScrollFactor(0).setDepth(200);

    this.bordo = this.scene.add.rectangle(W / 2, top + BOX_H / 2, W - MARGINE * 2 + 4, BOX_H + 4)
      .setStrokeStyle(2, this.COL_BORDO).setFillStyle(0x000000, 0)
      .setScrollFactor(0).setDepth(201);

    this.labelNome = this.scene.add.text(MARGINE + 14, top + 10, '', {
      fontSize: '13px', fontFamily: 'monospace', color: this.COL_NOME, fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(202);

    this.testo = this.scene.add.text(this.areaTesto.x, this.areaTesto.y, '', {
      fontSize: '14px', fontFamily: 'monospace', color: this.COL_TESTO,
      wordWrap: { width: this.areaTesto.larghezza }, lineSpacing: 5
    }).setScrollFactor(0).setDepth(202);

    // Le scelte (al massimo 4)
    this.testiScelta = [];
    for (let i = 0; i < 4; i++) {
      const t = this.scene.add.text(this.areaTesto.x, 0, '', {
        fontSize: '13px', fontFamily: 'monospace', color: this.COL_SCELTA
      }).setScrollFactor(0).setDepth(202).setInteractive({ useHandCursor: true });
      t.on('pointerover', () => { if (this.stato === 'scelta') this._seleziona(i, true); });
      t.on('pointerdown', () => { if (this.stato === 'scelta') { this._seleziona(i, true); this._conferma(); } });
      this.testiScelta.push(t);
    }

    this.indicatore = this.scene.add.text(W - MARGINE - 12, H - MARGINE - 8, '', {
      fontSize: '12px', fontFamily: 'monospace', color: this.COL_NOME
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(202);
    this.scene.tweens.add({ targets: this.indicatore, alpha: 0.25, duration: 600, yoyo: true, repeat: -1 });

    this.elementiBox = [this.sfondo, this.bordo, this.labelNome, this.testo, this.indicatore];
  }

  _nascondi() {
    this.elementiBox.forEach(el => el.setVisible(false));
    this.testiScelta.forEach(t => t.setVisible(false));
  }


  // ───────────────────────────────────────────
  //  API PUBBLICA
  // ───────────────────────────────────────────

  /** Avvia un dialogo definito in dialoghi.js. Es: avvia('luna') */
  avvia(idDialogo, onFine = null) {
    if (this.attivo) return false;

    const dati = (typeof DIALOGHI !== 'undefined') ? DIALOGHI[idDialogo] : null;
    if (!dati) {
      console.warn(`[DialogManager] ⚠️ Dialogo "${idDialogo}" non trovato in dialoghi.js`);
      return false;
    }
    const ingresso = (dati.ingressi || []).find(i => GameState.valuta(i.se));
    if (!ingresso) {
      console.warn(`[DialogManager] ⚠️ Il dialogo "${idDialogo}" non ha un punto di ingresso valido: ` +
                   `aggiungi in fondo a "ingressi" un ingresso senza condizione.`);
      return false;
    }
    return this._inizia(dati, ingresso.nodo, onFine);
  }

  /** Mostra un messaggio semplice (una o più pagine di testo). */
  apri(pagine, nome = '', onFine = null) {
    if (this.attivo) return false;
    const dati = { nome, nodi: { messaggio: { testo: Array.isArray(pagine) ? pagine : [pagine] } } };
    return this._inizia(dati, 'messaggio', onFine);
  }

  /** Da chiamare in update() della scena. */
  aggiorna() {
    if (!this.attivo) return;
    const J = Phaser.Input.Keyboard.JustDown;
    const premuto = J(this.tastoAvanza) || J(this.tastoInvio);

    if (this.stato === 'scrivendo') {
      const caratteri = Math.floor((this.scene.time.now - this.t0) / this.MS_PER_CARATTERE) + 1;
      if (premuto || caratteri >= this.paginaCorrente.length) {
        this.testo.setText(this.paginaCorrente);
        this._fineScrittura();
      } else {
        this.testo.setText(this.paginaCorrente.slice(0, caratteri));
      }
      return;
    }

    if (this.stato === 'attesa') {
      if (premuto) this._avanza();
      return;
    }

    if (this.stato === 'scelta') {
      if (J(this.cursori.up) || J(this.tastiWS.W))   this._seleziona(this.indiceScelta - 1);
      if (J(this.cursori.down) || J(this.tastiWS.S)) this._seleziona(this.indiceScelta + 1);
      ['ONE', 'TWO', 'THREE', 'FOUR'].forEach((k, i) => {
        if (J(this.tastiNumeri[k]) && i < this.scelteDisp.length) { this._seleziona(i, true); this._conferma(); }
      });
      if (premuto && this.stato === 'scelta') this._conferma();
    }
  }

  /** True se un dialogo è in corso (per bloccare il movimento). */
  get inCorso() {
    return this.attivo;
  }


  // ───────────────────────────────────────────
  //  METODI INTERNI
  // ───────────────────────────────────────────

  _inizia(dati, idNodo, onFine) {
    this.attivo = true;
    this.dialogo = dati;
    this.onFine = onFine;
    this.elementiBox.forEach(el => el.setVisible(true));
    this.indicatore.setText('');
    this._mostraNodo(idNodo);
    return true;
  }

  _mostraNodo(id) {
    if (id === undefined || id === null || id === 'FINE') return this._chiudi();
    const nodo = this.dialogo.nodi[id];
    if (!nodo) {
      console.warn(`[DialogManager] ⚠️ Nodo "${id}" non trovato: il dialogo viene chiuso. Controlla i codici in dialoghi.js.`);
      return this._chiudi();
    }

    this.nodo = nodo;
    GameState.applica(nodo.effetti);            // gli effetti scattano quando il nodo viene mostrato

    this.pagine = Array.isArray(nodo.testo) ? nodo.testo : [nodo.testo || ''];
    this.indicePagina = 0;
    this.scelteDisp = (nodo.scelte || []).filter(s => GameState.valuta(s.se)).slice(0, 4);
    this.labelNome.setText('◆ ' + (nodo.chi || this.dialogo.nome || ''));
    this._mostraPagina();
  }

  _mostraPagina() {
    this.paginaCorrente = this.pagine[this.indicePagina];
    this.testiScelta.forEach(t => t.setVisible(false));

    // Misuro il testo completo per sapere dove mettere le scelte
    this.testo.setText(this.paginaCorrente);
    this.altezzaTesto = this.testo.height;
    this.testo.setText('');

    this.stato = 'scrivendo';
    this.t0 = this.scene.time.now;
    this.indicatore.setText('');
  }

  _fineScrittura() {
    const ultima = this.indicePagina >= this.pagine.length - 1;

    if (ultima && this.scelteDisp.length > 0) {
      this.stato = 'scelta';
      this.indiceScelta = 0;
      this._disegnaScelte();
      this.indicatore.setText('[ ↑↓ ] scegli   [ E ] conferma');
    } else {
      this.stato = 'attesa';
      const finisce = ultima && (!this.nodo.vai || this.nodo.vai === 'FINE');
      this.indicatore.setText(finisce ? '[ E ] chiudi ■' : '[ E ] avanti ▼');
    }
  }

  _disegnaScelte() {
    const y0 = this.areaTesto.y + this.altezzaTesto + 10;
    this.testiScelta.forEach((t, i) => {
      if (i < this.scelteDisp.length) {
        const sel = i === this.indiceScelta;
        t.setPosition(this.areaTesto.x, y0 + i * 19)
         .setText(`${sel ? '▶' : ' '} ${i + 1}) ${this.scelteDisp[i].testo}`)
         .setColor(sel ? this.COL_SCELTA_SEL : this.COL_SCELTA)
         .setVisible(true);
      } else {
        t.setVisible(false);
      }
    });
  }

  _seleziona(indice, senzaGiro = false) {
    const n = this.scelteDisp.length;
    this.indiceScelta = senzaGiro ? indice : (indice + n) % n;
    this._disegnaScelte();
  }

  _conferma() {
    const scelta = this.scelteDisp[this.indiceScelta];
    this.testiScelta.forEach(t => t.setVisible(false));
    this._mostraNodo(scelta.vai || 'FINE');
  }

  _avanza() {
    if (this.indicePagina < this.pagine.length - 1) {
      this.indicePagina++;
      this._mostraPagina();
    } else {
      this._mostraNodo(this.nodo.vai || 'FINE');
    }
  }

  _chiudi() {
    this.attivo = false;
    this.stato = 'chiuso';
    this._nascondi();
    const cb = this.onFine;
    this.onFine = null;
    if (cb) cb();
  }

}
