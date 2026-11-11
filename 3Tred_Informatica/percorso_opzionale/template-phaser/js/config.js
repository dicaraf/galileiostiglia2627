/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  CONFIG.JS — Impostazioni del personaggio giocabile          ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Il giocatore usa un "atlas": un'unica immagine PNG che      ║
 * ║  contiene tutti i fotogrammi, più un file JSON che dà un     ║
 * ║  nome a ciascun fotogramma (es. "misa-front", "misa-left-    ║
 * ║  walk.000"...). Vedi assets/atlas/.                          ║
 * ║                                                              ║
 * ║  ✏️  STUDENTI: per usare un vostro personaggio create un    ║
 * ║     atlas con gli stessi nomi, cambiate 'prefisso' (es.     ║
 * ║     "eroe" → "eroe-front", "eroe-left-walk.000"...) e       ║
 * ║     caricate i vostri file in PreloadScene.js.              ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ✏️ Sprite dei personaggi fermi (uno per personaggio). Per ogni nome scritto qui
// il gioco carica  assets/sprites/<nome>.png.  In Tiled, nell'oggetto "npc",
// si scrive la proprietà  sprite = <nome>.  (Scheda 8 del Quaderno)
const SPRITE_PERSONAGGI = ['luna', 'bruto', 'mago', 'pip'];

const PLAYER = {
  atlas:    'atlas',    // chiave dell'atlas caricato in PreloadScene
  prefisso: 'misa',     // prefisso dei nomi dei fotogrammi nell'atlas
  velocita: 175,        // ✏️ velocità di camminata (pixel al secondo)

  // Area "fisica" del personaggio (i piedi): più piccola dell'immagine,
  // così il personaggio può passare dietro agli alberi e vicino ai muri.
  corpo: { larghezza: 30, altezza: 40, offsetX: 0, offsetY: 24 }
};
