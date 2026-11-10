/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  GAMESTATE.JS — Stato globale del gioco                     ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Questo oggetto è condiviso tra TUTTE le scene: ricorda      ║
 * ║  cosa ha raccolto il giocatore (inventario) e cosa è         ║
 * ║  successo nella storia (flag).                               ║
 * ║                                                              ║
 * ║  È il posto dove vivono le informazioni della Scheda 7 del   ║
 * ║  Quaderno di progettazione.                                  ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  CONDIZIONI (si scrivono come testo, nei dialoghi, nelle porte
 *  di Tiled e negli obiettivi):
 *
 *     'flag:haParlatoConLuna'          la flag è vera
 *     'haParlatoConLuna'               (uguale: "flag:" si può omettere)
 *     'ha:cristallo'                   il giocatore ha l'oggetto
 *     '!flag:questCompletata'          NON vera  (il ! nega)
 *     'ha:chiave && flag:faroAcceso'   entrambe vere  (&&  = E)
 *     'ha:chiave || ha:lampadina'      almeno una vera (|| = O)
 *     ''  (vuota)                      sempre vera
 *
 *  EFFETTI (cosa cambia quando si mostra una battuta):
 *
 *     'flag:haConsolatoBruto'          la flag diventa vera
 *     '-flag:haConsolatoBruto'         la flag diventa falsa
 *     'oggetto:chiave'                 il giocatore riceve l'oggetto
 *     '-oggetto:chiave'                l'oggetto viene tolto
 */

// ─────────────────────────────────────────────────────────────
//  🚩  FLAG DELLA STORIA (tutte false all'inizio)
//  ✏️  Aggiungete qui le vostre flag, con nomi che si leggono
//      come una frase (es. ivoConsolato, faroAcceso).
//      Devono essere ELENCATE QUI per poterle usare altrove.
// ─────────────────────────────────────────────────────────────
const FLAG_INIZIALI = {
  introVista:        false,   // il messaggio di benvenuto è già stato mostrato?
  haParlatoConLuna:  false,   // Luna ha affidato la missione al giocatore?
  haConsolatoBruto:  false,   // il giocatore ha consolato Bruto? (cambia il finale)
  questCompletata:   false,   // il Cristallo è stato consegnato a Luna?
};


const GameState = {

  // 📦 Oggetti posseduti dal giocatore (nomi in minuscolo: 'cristallo')
  inventario: [],

  // 🚩 Copia modificabile delle flag
  flags: { ...FLAG_INIZIALI },

  // 🧺 Oggetti già raccolti sulle mappe (per non farli riapparire)
  oggettiRaccolti: [],

  // 📍 Dove appare il giocatore nella prossima scena (nome di un punto "arrivo")
  arrivo: null,


  // ═════════════════════════════════════════════
  //  INVENTARIO
  // ═════════════════════════════════════════════
  aggiungiOggetto(nome) {
    if (!this.inventario.includes(nome)) {
      this.inventario.push(nome);
      console.log(`[GameState] 📦 Oggetto aggiunto: "${nome}"`);
    }
  },

  haOggetto(nome) {
    return this.inventario.includes(nome);
  },

  rimuoviOggetto(nome) {
    const i = this.inventario.indexOf(nome);
    if (i > -1) {
      this.inventario.splice(i, 1);
      console.log(`[GameState] 📦 Oggetto rimosso: "${nome}"`);
    }
  },


  // ═════════════════════════════════════════════
  //  CONDIZIONI ED EFFETTI (vedi la guida in alto)
  // ═════════════════════════════════════════════

  /** Restituisce true/false valutando una condizione scritta come testo. */
  valuta(condizione) {
    if (condizione === undefined || condizione === null) return true;
    const testo = String(condizione).trim();
    if (testo === '') return true;
    return testo.split('||').some(gruppo =>
      gruppo.split('&&').every(parte => this._valutaParte(parte.trim()))
    );
  },

  _valutaParte(parte) {
    let nega = false;
    if (parte.startsWith('!')) { nega = true; parte = parte.slice(1).trim(); }

    let risultato;
    if (parte.startsWith('ha:')) {
      risultato = this.haOggetto(parte.slice(3).trim());
    } else {
      const nome = parte.startsWith('flag:') ? parte.slice(5).trim() : parte;
      if (!(nome in this.flags)) {
        console.warn(`[GameState] ⚠️ Flag sconosciuta "${nome}". ` +
                     `Aggiungila a FLAG_INIZIALI in GameState.js (controlla anche l'ortografia).`);
      }
      risultato = !!this.flags[nome];
    }
    return nega ? !risultato : risultato;
  },

  /** Applica un elenco di effetti, es. ['flag:haConsolatoBruto', 'oggetto:chiave']. */
  applica(effetti) {
    if (!effetti) return;
    const lista = Array.isArray(effetti) ? effetti : [effetti];
    lista.forEach(e => {
      const eff = String(e).trim();
      if      (eff.startsWith('-oggetto:')) this.rimuoviOggetto(eff.slice(9).trim());
      else if (eff.startsWith('oggetto:'))  this.aggiungiOggetto(eff.slice(8).trim());
      else if (eff.startsWith('-flag:'))    this._impostaFlag(eff.slice(6).trim(), false);
      else if (eff.startsWith('flag:'))     this._impostaFlag(eff.slice(5).trim(), true);
      else console.warn(`[GameState] ⚠️ Effetto non riconosciuto: "${eff}". ` +
                        `Usa 'flag:nome', '-flag:nome', 'oggetto:nome' o '-oggetto:nome'.`);
    });
  },

  _impostaFlag(nome, valore) {
    if (!(nome in this.flags)) {
      console.warn(`[GameState] ⚠️ Flag sconosciuta "${nome}": aggiungila a FLAG_INIZIALI.`);
    }
    this.flags[nome] = valore;
    console.log(`[GameState] 🚩 ${nome} = ${valore}`);
  },


  // ═════════════════════════════════════════════
  //  NUOVA PARTITA
  // ═════════════════════════════════════════════
  reset() {
    this.inventario      = [];
    this.flags           = { ...FLAG_INIZIALI };
    this.oggettiRaccolti = [];
    this.arrivo          = null;
    console.log('[GameState] 🔄 Stato resettato.');
  }

};
