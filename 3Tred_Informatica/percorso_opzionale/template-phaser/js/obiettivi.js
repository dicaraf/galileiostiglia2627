/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  OBIETTIVI.JS — Il testo dell'obiettivo mostrato a schermo   ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  In alto a destra compare sempre l'obiettivo del momento     ║
 * ║  (Scheda 7 del Quaderno).                                    ║
 * ║                                                              ║
 * ║  L'elenco si legge dall'alto verso il basso e vale il        ║
 * ║  PRIMO obiettivo la cui condizione è vera. Mettete in alto   ║
 * ║  gli stati più avanzati della storia e in fondo quello       ║
 * ║  iniziale, senza condizione.                                 ║
 * ║                                                              ║
 * ║  Le condizioni si scrivono come in GameState.js.             ║
 * ║  ✏️  Massimo ~30 caratteri: lo spazio è piccolo!            ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const OBIETTIVI = [
  { se: 'flag:questCompletata',    testo: 'Missione compiuta!' },
  { se: 'ha:cristallo',            testo: 'Riporta il Cristallo a Luna' },
  { se: 'flag:haParlatoConLuna',   testo: 'Trova il Cristallo (Foresta)' },
  {                                testo: 'Parla con Luna' }
];
