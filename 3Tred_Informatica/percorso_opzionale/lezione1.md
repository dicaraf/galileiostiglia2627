---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  section {
    font-family: "Aptos", "Segoe UI", sans-serif;
    padding: 60px 80px;
  }
  h1 {
    font-size: 2.2em;
  }
  h2 {
    font-size: 1.7em;
  }
  strong {
    font-weight: 700;
  }
  .subtitle {
    font-size: 1.25em;
    color: #555;
  }
  .flow {
    text-align: center;
    font-size: 1.2em;
    margin-top: 50px;
    font-weight: 600;
  }
  table {
    font-size: 0.9em;
    margin: 0 auto;
  }
  section.small {
    font-size: 25px;
  }
  section.small table {
    font-size: 0.85em;
  }
  .note {
    background: #fff6cc;
    border-left: 6px solid #e0b400;
    padding: 10px 20px;
    margin-top: 20px;
  }
---

# PRIMA DI INIZIARE

### Perché progettare un videogioco serve anche fuori dall'informatica

<p class="subtitle">Percorso opzionale · Crea il tuo videogioco</p>

---

# IL PERCORSO IN BREVE

In circa **25 ore**, a gruppi, realizzerete un **videogioco 2D giocabile**.

<div class="flow">

IDEA → PROGETTO → CODICE → TEST → CORREZIONI → DEMO DAY

</div>

<br>

Si parte da un gioco **già funzionante**, fatto con Phaser.js, e lo si trasforma: storia, personaggi, mappe, dialoghi e regole saranno i vostri.

---

# DIETRO OGNI PRODOTTO C'È UN PROCESSO

Pensate a un videogioco, a uno smartphone, a un evento sportivo.

Quello che vediamo è il risultato finale. Prima ci sono stati:

- idee proposte e scartate;
- bozze, prove e modifiche;
- errori da correggere;
- tempo e lavoro di molte persone.

Il risultato concreto arriva **dopo** questo lavoro, non al posto suo.

---

# PROGETTARE: PENSARE PRIMA DI FARE

Progettare significa rispondere ad alcune domande **prima** di iniziare:

- **Cosa** voglio ottenere?
- **Per chi** lo sto facendo?
- **Di cosa** ho bisogno?
- **In che ordine** devo fare le cose?
- **Come** verifico che funzioni?

Più le risposte sono chiare e complete, meno tempo si perde dopo.

---

# UN METODO CHE SERVE OVUNQUE

| Situazione | Senza progetto | Con un progetto |
|---|---|---|
| Studiare per una verifica | Tutto la sera prima | Ripasso distribuito nei giorni |
| Organizzare una festa | Manca sempre qualcosa | Lista, budget, compiti divisi |
| Allenarsi in uno sport | Progressi casuali | Obiettivi e progressi misurabili |
| Un lavoro di gruppo | Confusione e ritardi | Ruoli chiari e scadenze |

Il metodo che userete per il videogioco è lo stesso che si usa in questi casi.

---

# GLI ERRORI CI SARANNO COMUNQUE

Anche con un buon progetto qualcosa non funzionerà: il personaggio attraversa un muro, un dialogo non parte, una porta non si apre.

Succede anche ai professionisti. La differenza la fa il progetto:

- **senza un progetto** è difficile capire dove cercare il problema;
- **con un progetto** sai cosa doveva succedere, quindi è più facile capire cosa non va e come correggerlo.

---

# CREATIVITÀ E METODO

La creatività serve per avere idee. Il metodo serve per realizzarle.

Organizzare il lavoro in fasi, dividere un problema grande in parti più piccole e controllare i risultati non limita la creatività: permette di portare un'idea fino a un prodotto finito.

Questo modo di lavorare si chiama anche **ingegnerizzare un processo**.

---

# IL NOSTRO PERCORSO IN 7 TAPPE

1. **Insieme**: vediamo il gioco di partenza e come è fatto
2. **Progettate** il vostro gioco con il Quaderno digitale
3. **Personalizzate i testi**: titolo, dialoghi, obiettivi
4. **Disegnate le mappe** con Tiled
5. **Collegate le scene** con porte e oggetti
6. **Sostituite la grafica** e aggiungete i suoni
7. **Rifinite e fate provare** il gioco ai compagni

Il codice si tocca solo **dopo** aver completato il progetto.

---

# TAPPA 1 · IL GIOCO DI PARTENZA

Questa tappa la facciamo **insieme**: il docente mostra il gioco *Il Cristallo del Villaggio* e alcune parti del codice.

**Il gioco:** si parla con Luna, si entra nella Foresta, si trova il Cristallo e lo si riporta indietro. Le scelte nei dialoghi (per esempio consolare Bruto) cambiano il finale.

**Il codice:** vedremo dove si trovano i dialoghi, come sono fatte le mappe in Tiled e come il gioco "ricorda" quello che è già successo.

L'obiettivo è capire come è costruito un gioco funzionante prima di progettare il vostro.

---

<!-- _class: small -->

# TAPPA 2 · IL QUADERNO DI PROGETTAZIONE

Il vostro **Game Design Document**, da compilare in digitale: 9 schede, dalla storia alla mappa.

| Scheda | Cosa progettate |
|---|---|
| 1 · Idea | Titolo, la storia in una frase, missione, finale |
| 2 · Personaggi | Chi sono, cosa vogliono, come parlano |
| 3 · Struttura | I tre atti e i passi che compie chi gioca |
| 4 · Scene | Ogni luogo: chi c'è, da dove si entra e si esce |
| 5 · Mappe | Lo schizzo su griglia, con coordinate |
| 6 · Dialoghi | Battute e scelte che cambiano la storia |
| 7 · Oggetti e flag | Cosa si raccoglie, cosa si sblocca, quando |
| 8 · Risorse | Immagini, mappe, suoni e la loro provenienza |
| 9 · Verifica | Controllo che il gioco sia realizzabile |

---

# DAL QUADERNO AL CODICE

Ogni scheda del Quaderno corrisponde a una parte precisa del gioco.

| Nel Quaderno | Nel gioco |
|---|---|
| Titolo e sottotitolo | La schermata iniziale |
| Personaggi | Le figure sulla mappa |
| Mappe su griglia | Le mappe costruite con **Tiled** |
| Dialoghi e scelte | Il file `dialoghi.js` |
| Flag e obiettivi | `GameState.js` e `obiettivi.js` |

Se il Quaderno è completo, la fase di programmazione consiste soprattutto nel trasferire queste informazioni nei file giusti.

---

# PRIMA DI PROGRAMMARE: LA VERIFICA

**Simulazione:** nella Scheda 9 si "gioca" la storia passo dopo passo, annotando cosa fa il giocatore e cosa cambia. Se a un certo punto non è chiaro cosa deve fare, c'è un problema da risolvere nel progetto.

Poi si compila la **checklist finale** e il progetto passa all'**approvazione del docente**.

<div class="note">

**Dimensioni consigliate:** 3-5 personaggi, 2-4 scene, 5-10 minuti di gioco.
Un gioco corto e finito è meglio di uno grande e incompleto.

</div>

---

# DAL PROGETTO AL GIOCO

Dopo l'approvazione si passa allo sviluppo.

| Strumento | A cosa serve |
|---|---|
| **VS Code + Live Server** | Modificare il codice e provare il gioco |
| **Phaser.js** | La libreria che fa funzionare il gioco |
| **Tiled** | Disegnare le mappe a tessere |
| **Piskel** | Disegnare i personaggi (sprite) |

L'ultima fase è dedicata a **trovare e correggere gli errori** e a **provare i giochi degli altri gruppi**, scambiandosi osservazioni.

---

# E L'INTELLIGENZA ARTIFICIALE?

L'IA è uno strumento utile. Può aiutare a:

- scrivere o correggere parti di codice;
- trovare un errore più velocemente;
- proporre idee, nomi, testi, immagini;
- spiegare un concetto non chiaro.

Però non può decidere al posto vostro **cosa** volete realizzare e **perché**.

---

# COSA FA L'IA, COSA FATE VOI

| L'IA può | Voi dovete |
|---|---|
| Generare codice su richiesta | Decidere cosa deve fare il gioco |
| Proporre molte idee | Scegliere quella adatta e motivare la scelta |
| Segnalare errori comuni | Verificare che il risultato sia quello voluto |
| Scrivere un testo | Dare alla storia il vostro stile |
| Rispondere a una domanda | Sapere quale domanda fare |

---

# PROGETTARE PER USARE BENE L'IA

Un'IA dà risposte utili solo se le si chiede la cosa giusta, e per sapere cosa chiedere bisogna avere chiaro il progetto. Per questo, nel nostro percorso, il Quaderno viene prima del codice.

Le competenze che allenerete (**progettare, organizzare il lavoro, fare scelte, risolvere problemi**) sono quelle in cui l'IA non può sostituirvi.

---

# IN SINTESI

- Si parte da un gioco funzionante e lo si analizza insieme.
- Si progetta il proprio gioco con il Quaderno digitale.
- Si sviluppa, si prova, si correggono gli errori.
- Si presenta il risultato al Demo Day.

<p class="subtitle">Oltre al videogioco, resterà un metodo di lavoro utile anche in altri contesti.</p>