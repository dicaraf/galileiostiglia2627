/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  TITLESCENE.JS — Schermata iniziale                          ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  La prima cosa che vede il giocatore.                        ║
 * ║                                                              ║
 * ║  ✏️  STUDENTI: cambiate TITOLO e SOTTOTITOLO con quelli     ║
 * ║      scelti nella Scheda 1 del Quaderno di progettazione.    ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class TitleScene extends Phaser.Scene {

  constructor() {
    super('TitleScene');
  }

  create() {
    const W = this.scale.width, H = this.scale.height;

    this.cameras.main.setBackgroundColor('#0d0d1a');

    // ✏️ STUDENTI: il titolo e il sottotitolo del vostro gioco!
    const TITOLO      = 'Il Nome del Tuo Gioco';
    const SOTTOTITOLO = 'una avventura nel Villaggio';

    this.add.text(W / 2, H / 2 - 80, TITOLO, {
      fontSize: '32px', fontFamily: 'monospace', color: '#f5c842', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(W / 2, H / 2 - 40, SOTTOTITOLO, {
      fontSize: '15px', fontFamily: 'monospace', color: '#a0a0c0'
    }).setOrigin(0.5);

    const bottone = this.add.text(W / 2, H / 2 + 40, '▶  PREMI INVIO PER INIZIARE', {
      fontSize: '16px', fontFamily: 'monospace', color: '#e8e8e8',
      backgroundColor: '#2a2a4a', padding: { x: 16, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.tweens.add({ targets: bottone, alpha: 0.5, duration: 700, yoyo: true, repeat: -1 });

    const tastoInvio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    tastoInvio.on('down', () => this._iniziaGioco());
    bottone.on('pointerdown', () => this._iniziaGioco());

    this.add.text(W / 2, H - 38,
      'Frecce / WASD: muoviti   ·   E: parla e interagisci\n↑ ↓ (o 1 2 3): scegli nei dialoghi   ·   E / INVIO: conferma', {
      fontSize: '11px', fontFamily: 'monospace', color: '#6a6a8a', align: 'center', lineSpacing: 4
    }).setOrigin(0.5);
  }

  _iniziaGioco() {
    if (this.partito) return;
    this.partito = true;

    GameState.reset();                  // nuova partita: stato azzerato
    this.scene.start('Mappa1Scene');
    this.scene.launch('UIScene');       // l'HUD resta sovrapposto in parallelo
  }

}
