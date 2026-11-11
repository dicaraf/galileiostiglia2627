/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  DIALOGHI.JS — Tutti i dialoghi del gioco                    ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Qui si scrivono i dialoghi (Scheda 6 del Quaderno): NON     ║
 * ║  serve toccare il codice delle scene!                        ║
 * ║                                                              ║
 * ║  Un dialogo appartiene a un personaggio (o a un oggetto) ed  ║
 * ║  è fatto di NODI: ogni nodo è una battuta con un codice.     ║
 * ║  Il collegamento con la mappa avviene in Tiled: l'oggetto    ║
 * ║  "npc" ha la proprietà  dialogo = 'luna'  (la chiave qui     ║
 * ║  sotto).                                                     ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  STRUTTURA DI UN DIALOGO
 *  ───────────────────────
 *  chiave_personaggio: {
 *    nome: 'Nome mostrato nel box',
 *
 *    // PUNTI DI INGRESSO: da quale nodo parte il dialogo?
 *    // Si leggono dall'alto verso il basso: vale il PRIMO la cui
 *    // condizione è vera. Mettete in alto i casi più specifici
 *    // e in fondo quello "normale", senza condizione.
 *    ingressi: [
 *      { se: 'flag:questCompletata', nodo: 'X_FINE' },
 *      { nodo: 'X1' }                       // ← nessuna condizione
 *    ],
 *
 *    nodi: {
 *      X1: {
 *        chi: 'Luna',                       // (facoltativo) chi parla in questo nodo
 *        testo: 'Una battuta (max ~200 caratteri).',
 *        // testo può anche essere un elenco di pagine: ['Pagina 1', 'Pagina 2']
 *        vai: 'X2',                         // nodo successivo (o 'FINE')
 *        effetti: ['flag:nomeFlag']         // (facoltativo) cosa cambia
 *      },
 *      X2: {
 *        testo: 'Una domanda...',
 *        scelte: [                          // 2-3 opzioni (max ~60 caratteri ciascuna)
 *          { testo: 'Sì!',  vai: 'X3' },
 *          { testo: 'No.',  vai: 'FINE' },
 *          { testo: 'Solo se ho la chiave.', vai: 'X4', se: 'ha:chiave' }  // scelta condizionata
 *        ]
 *      }
 *    }
 *  }
 *
 *  REGOLE
 *  • Ogni ramo deve finire con  vai: 'FINE'  (o senza "vai": vale lo stesso).
 *  • Un nodo con "scelte" ignora "vai": è la scelta a decidere.
 *  • Le condizioni ("se") e gli effetti sono spiegati in GameState.js.
 *  • Gli effetti si applicano quando il nodo viene MOSTRATO.
 *  • Per il giocatore: ↑/↓ (o W/S) per muoversi tra le scelte, E o INVIO per
 *    confermare, oppure il tasto 1, 2, 3.
 */

const DIALOGHI = {

  // ═══════════════════════════════════════════════════════════
  //  LUNA — chi affida la missione (Villaggio)
  // ═══════════════════════════════════════════════════════════
  luna: {
    nome: 'Luna',

    ingressi: [
      { se: 'flag:questCompletata && flag:haConsolatoBruto', nodo: 'L_FINE_BELLO' },
      { se: 'flag:questCompletata',                          nodo: 'L_FINE' },
      { se: 'ha:cristallo',                                  nodo: 'L_CONSEGNA' },
      { se: 'flag:haParlatoConLuna',                         nodo: 'L_RICORDA' },
      { nodo: 'L1' }
    ],

    nodi: {
      L1: {
        testo: 'Ciao, viandante! Benvenuto nel Villaggio. Nella Foresta, a ovest, si nasconde un antico Cristallo magico...',
        vai: 'L2'
      },
      L2: {
        testo: 'Se riesci a trovarlo e a portarmelo, ti aiuterò ad aprire il sentiero. Mi darai una mano?',
        scelte: [
          { testo: 'Certo, ci penso io!',                    vai: 'L3' },
          { testo: "Cos'ha di speciale questo Cristallo?",   vai: 'L2B' },
          { testo: 'Ora non posso, scusa.',                  vai: 'L4' }
        ]
      },
      L2B: {
        testo: 'Protegge il Villaggio dalle tempeste. Senza di lui, al prossimo temporale saremo in pericolo.',
        vai: 'L2'                                   // ← torna alla domanda
      },
      L3: {
        testo: 'Grazie, sapevo di potermi fidare! Ora il sentiero verso la Foresta è libero. Buona fortuna!',
        effetti: ['flag:haParlatoConLuna'],         // ← sblocca la porta
        vai: 'FINE'
      },
      L4: {
        testo: 'Capisco. Torna quando te la senti: io sono qui.',
        vai: 'FINE'
      },

      L_RICORDA: {
        testo: 'Il Cristallo è nella Foresta, a ovest. Il sentiero ormai è libero: vai pure!'
      },

      L_CONSEGNA: {
        testo: "Il Cristallo! Non ci credo... L'hai trovato davvero!",
        vai: 'L_CONSEGNA2'
      },
      L_CONSEGNA2: {
        testo: 'Ora il Villaggio è al sicuro. Grazie di cuore, viandante!',
        effetti: ['-oggetto:cristallo', 'flag:questCompletata']
      },

      L_FINE: {
        testo: 'Grazie ancora per il Cristallo, viandante. Il Villaggio non lo dimenticherà.'
      },
      L_FINE_BELLO: {
        testo: "Bruto mi ha raccontato che l'hai consolato. Oltre al Cristallo, hai ridato il sorriso al nostro cavaliere. Sei una persona rara!"
      }
    }
  },


  // ═══════════════════════════════════════════════════════════
  //  BRUTO — il cavaliere (Villaggio). Una scelta cambia il finale!
  // ═══════════════════════════════════════════════════════════
  bruto: {
    nome: 'Bruto il Cavaliere',

    ingressi: [
      { se: 'flag:haConsolatoBruto', nodo: 'B_GRATO' },
      { nodo: 'B1' }
    ],

    nodi: {
      B1: {
        testo: "Mah... Ho rovinato la spada che mi aveva affidato il capitano. Sarà furioso.",
        scelte: [
          { testo: 'Non preoccuparti, capita a tutti.', vai: 'B2' },
          { testo: 'Dovevi stare più attento.',         vai: 'B3' },
          { testo: 'Scusa, devo andare.',               vai: 'FINE' }
        ]
      },
      B2: {
        testo: "...Grazie. Nessuno me l'aveva mai detto. Mi hai tirato su di morale.",
        effetti: ['flag:haConsolatoBruto'],
        vai: 'FINE'
      },
      B3: {
        testo: 'Hai ragione. Ma non serviva ricordarmelo. Mah.',
        vai: 'FINE'
      },
      B_GRATO: {
        testo: 'Grazie ancora per prima. Se cerchi la Foresta, vai in fondo alla strada verso ovest.'
      }
    }
  },


  // ═══════════════════════════════════════════════════════════
  //  PIP — il ragazzino del Villaggio. Dà indizi diversi a seconda
  //  di ciò che è già successo; una scelta compare solo se Bruto
  //  non è ancora stato consolato (scelta condizionata).
  // ═══════════════════════════════════════════════════════════
  pip: {
    nome: 'Pip',

    ingressi: [
      { se: 'flag:questCompletata',  nodo: 'P_FINE' },
      { se: 'ha:cristallo',          nodo: 'P_CRISTALLO' },
      { se: 'flag:haParlatoConLuna', nodo: 'P_FORESTA' },
      { nodo: 'P1' }
    ],

    nodi: {
      P1: {
        testo: 'Ehi, tu! Sei appena arrivato? Io sono Pip e conosco ogni angolo del Villaggio.',
        scelte: [
          { testo: 'Dove posso trovare aiuto?',  vai: 'P2' },
          { testo: 'Sai qualcosa di Bruto?',     vai: 'P3', se: '!flag:haConsolatoBruto' },
          { testo: 'Grazie, a dopo!',            vai: 'FINE' }
        ]
      },
      P2: {
        testo: 'Parla con Luna, la ragazza con il codino. Ha sempre una missione per i viandanti!',
        vai: 'P1'
      },
      P3: {
        testo: "Dicono che abbia rovinato la sua spada migliore. Un po' di gentilezza lo aiuterebbe, credo.",
        vai: 'P1'
      },
      P_FORESTA: {
        testo: 'Il sentiero a ovest ora è libero! Nella Foresta cerca il mago: sa dove si trova il Cristallo.'
      },
      P_CRISTALLO: {
        testo: 'Hai il Cristallo! Corri da Luna, sarà felicissima.'
      },
      P_FINE: {
        testo: 'Hai salvato il Villaggio! Da grande voglio essere come te.'
      }
    }
  },


  // ═══════════════════════════════════════════════════════════
  //  MAGO DELLA FORESTA (Foresta). Domande che non cambiano
  //  la storia ma danno informazioni: ogni risposta torna al menu.
  // ═══════════════════════════════════════════════════════════
  mago: {
    nome: 'Mago della Foresta',

    ingressi: [
      { se: 'ha:cristallo', nodo: 'S_HAI' },
      { nodo: 'S1' }
    ],

    nodi: {
      S1: {
        testo: 'Chi disturba il riposo del bosco? Ah, un viandante... Cosa vuoi sapere?',
        scelte: [
          { testo: "Dov'è il Cristallo?",    vai: 'S2' },
          { testo: 'Chi sei?',               vai: 'S3' },
          { testo: 'Niente, arrivederci.',   vai: 'FINE' }
        ]
      },
      S2: {
        testo: 'Il Cristallo brilla nella radura a sud-ovest, dove il sentiero si apre. Seguilo fino in fondo.',
        vai: 'S1'
      },
      S3: {
        testo: 'Sono il mago di questo bosco. Veglio sul Cristallo da tanto tempo.',
        vai: 'S1'
      },
      S_HAI: {
        testo: 'Hai preso il Cristallo. Portalo a Luna, al Villaggio: il sentiero ti riporterà indietro.'
      }
    }
  }

};
