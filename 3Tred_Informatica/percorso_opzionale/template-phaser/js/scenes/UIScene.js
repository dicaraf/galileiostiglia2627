/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  UISCENE.JS — Interfaccia sovrapposta (HUD)                  ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Questa scena "vive" sopra le mappe (è lanciata in parallelo ║
 * ║  da TitleScene). Mostra l'inventario e l'obiettivo           ║
 * ║  corrente, sempre fissi sullo schermo.                       ║
 * ║                                                              ║
 * ║  L'obiettivo si sceglie in base alle condizioni scritte in   ║
 * ║  obiettivi.js: qui non serve modificare nulla!               ║
 * ║                                                              ║
 * ║  ✏️  STUDENTI: se volete altri elementi (vita, punteggio,   ║
 * ║      timer...) aggiungeteli in create() e aggiornateli in    ║
 * ║      _aggiorna().                                            ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class UIScene extends Phaser.Scene {

  constructor() {
    super({ key: 'UIScene', active: false });
  }

  create() {
    const W = this.scale.width;

    // 📦 Inventario (in alto a sinistra)
    this.add.rectangle(8, 8, 250, 30, 0x0d0d2a, 0.85)
      .setOrigin(0, 0).setScrollFactor(0).setDepth(300).setStrokeStyle(1, 0xe0c060);
    this.testoInventario = this.add.text(16, 16, '', {
      fontSize: '12px', fontFamily: 'monospace', color: '#e8e8e8'
    }).setScrollFactor(0).setDepth(301);

    // 🎯 Obiettivo (in alto a destra)
    this.add.rectangle(W - 8, 8, 270, 30, 0x0d0d2a, 0.85)
      .setOrigin(1, 0).setScrollFactor(0).setDepth(300).setStrokeStyle(1, 0xe0c060);
    this.testoObiettivo = this.add.text(W - 16, 16, '', {
      fontSize: '12px', fontFamily: 'monospace', color: '#f5c842'
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(301);

    this._aggiorna();
  }

  update() {
    this._aggiorna();
  }

  _aggiorna() {
    const inv = GameState.inventario.length > 0 ? GameState.inventario.join(', ') : '(vuoto)';
    this.testoInventario.setText(`📦 ${inv}`);

    // Il primo obiettivo con condizione vera (vedi obiettivi.js)
    const obiettivo = OBIETTIVI.find(o => GameState.valuta(o.se));
    this.testoObiettivo.setText(obiettivo ? `🎯 ${obiettivo.testo}` : '');
  }

}
