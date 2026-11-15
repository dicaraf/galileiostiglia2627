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
    font-size: 1.25em;
    margin-top: 60px;
    font-weight: 600;
  }
  .big {
    text-align: center;
    font-size: 1.6em;
    font-weight: 700;
    margin-top: 70px;
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

### Perché progettare un videogioco ti insegna molto più di un videogioco

<p class="subtitle">Percorso opzionale · Crea il tuo videogioco</p>

---

# IL PERCORSO IN BREVE

In circa **25 ore**, a gruppi, trasformerete un'idea in un **videogioco 2D giocabile**.

<div class="flow">

**IDEA → PROGETTO → CODICE → TEST → CORREZIONI → DEMO DAY**

</div>

<br>

Partirete da una **base già funzionante** (Phaser.js) e la renderete **vostra**: storia, personaggi, mappe, dialoghi, regole del gioco.

---

# GUARDA DIETRO LE QUINTE

Il tuo gioco preferito. Il telefono che hai in tasca. Un concerto. Una partita di serie A.

Quello che vedi è **solo l'ultimo pezzo**.

Prima ci sono stati **mesi di idee scartate, prove, schizzi, errori, riunioni, rifacimenti**.

<div class="big">

Nessun risultato arriva "per magia".
Dietro c'è sempre **lavoro** e **fatica**.

</div>

---

# PROGETTARE = PENSARE PRIMA DI FARE

Progettare vuol dire chiedersi **prima**:

- **Cosa** voglio ottenere?
- **Per chi** lo sto facendo?
- **Di cosa** ho bisogno?
- **In che ordine** devo fare le cose?
- **Come** capisco se funziona?

Più le risposte sono **chiare e complete**, più il lavoro dopo sarà **veloce e sensato**.

---

# VALE OVUNQUE, NON SOLO NEI GIOCHI

| Situazione | Senza progetto | Con un progetto |
|---|---|---|
| Studiare per una verifica | Tutto la sera prima | Piano di ripasso nei giorni |
| Organizzare una festa | Manca sempre qualcosa | Lista, budget, compiti divisi |
| Allenarsi in uno sport | Risultati a caso | Obiettivi e progressi misurabili |
| Un lavoro di gruppo | Litigi e confusione | Ruoli chiari e scadenze |

<div class="flow">

Il metodo che userete qui **ve lo porterete dietro per sempre**.

</div>

---

# GLI ERRORI ARRIVERANNO. SEMPRE.

Anche con il progetto migliore, qualcosa **non funzionerà**:
il personaggio passa attraverso i muri, un dialogo non parte, il gioco si blocca.

**È normale. Succede anche ai professionisti.**

La differenza è questa:

- **Senza idee chiare** → non sai nemmeno da dove partire a cercare il problema.
- **Con idee chiare** → sai cosa *doveva* succedere, quindi trovi più in fretta **cosa non va** e **come sistemarlo**.

---

# CREATIVITÀ + METODO = IDEE CHE DIVENTANO REALI

La creatività da sola è un'auto **potentissima ma senza volante**.

Il metodo (organizzare, dividere in passi, controllare) è il **volante**.

<div class="big">

Ingegnerizzare un processo non spegne la fantasia:
**le dà una strada da percorrere**.

</div>

---

# IL NOSTRO PERCORSO IN 7 TAPPE

1. **Gioca e smonta** il gioco di partenza
2. **Progetta** con il Quaderno (carta e penna, niente codice!)
3. **Personalizza i testi**: titolo, dialoghi, obiettivi
4. **Disegna le mappe** con Tiled
5. **Collega le scene** con porte e oggetti
6. **Sostituisci la grafica** e aggiungi i suoni
7. **Rifinisci e fai provare** il gioco ai compagni

<div class="flow">

Prima si **pensa**, poi si **costruisce**, poi si **prova**.

</div>

---

# TAPPA 1 · GIOCA E SMONTA

Partirete da un gioco **che funziona già**: *Il Cristallo del Villaggio*.

- Parla con **Luna**, entra nella **Foresta**, trova il **Cristallo**, riportalo indietro.
- Se consoli **Bruto**, il finale cambia!

Poi si guarda **dentro**: i dialoghi, le mappe, i file del codice.

<div class="note">

Prima di costruire qualcosa di tuo, capisci **come è fatto** qualcosa che funziona.

</div>

---

<!-- _class: small -->

# TAPPA 2 · GAME DESIGN DOCUMENT

| Scheda | Cosa progettate |
|---|---|
| 1 · Idea | Titolo, la storia in **una frase**, missione, finale |
| 2 · Personaggi | Chi sono, cosa vogliono, come parlano |
| 3 · Struttura | I tre atti e i **passi** che fa chi gioca |
| 4 · Scene | Ogni luogo: chi c'è, da dove si entra e si esce |
| 5 · Mappe | Lo schizzo su griglia, con coordinate |
| 6 · Dialoghi | Battute e **scelte** che cambiano la storia |
| 7 · Oggetti e flag | Cosa si raccoglie, cosa si sblocca, quando |
| 8 · Risorse | Immagini, mappe, suoni (e da dove vengono) |
| 9 · Verifica | Il gioco si può fare davvero? |

---

# OGNI SCHEDA HA IL SUO POSTO

Quello che scrivete sul Quaderno **non resta sulla carta**: ha un posto preciso nel gioco.

| Sul Quaderno | Nel gioco |
|---|---|
| Titolo e sottotitolo | La schermata iniziale |
| Personaggi | Le figure sulla mappa |
| Mappe disegnate su griglia | Le mappe costruite con **Tiled** |
| Dialoghi e scelte | Il file `dialoghi.js` |
| Flag e obiettivi | `GameState.js` e `obiettivi.js` |

<div class="flow">

Un buon progetto è già **mezzo gioco**.

</div>

---

# PRIMA DI PROGRAMMARE: LA PROVA SU CARTA

**Simulazione a mano**: "giocate" la vostra storia sul foglio, passo dopo passo.
Se a un certo punto non sapete cosa fa il giocatore, **avete trovato un buco**.

Poi una **checklist finale** e l'**approvazione del docente**.

<div class="note">

**Regola d'oro:** tenete la storia piccola.
**3-5 personaggi · 2-4 scene · 5-10 minuti di gioco.**
Un gioco corto e **finito** è meglio di uno enorme e **a metà**.

</div>

---

# DAL PROGETTO AL GIOCO

Solo adesso si passa al computer.

| Strumento | A cosa serve |
|---|---|
| **VS Code + Live Server** | Modificare il codice e provare il gioco |
| **Phaser.js** | Il "motore" che fa funzionare tutto |
| **Tiled** | Disegnare le mappe a tessere |
| **Piskel** | Disegnare i personaggi (sprite) |

Poi arriva la fase più vera di tutte: **trovare e correggere gli errori**,
e **giocare ai giochi degli altri gruppi** per darsi consigli.

---

# E L'INTELLIGENZA ARTIFICIALE?

L'IA è uno **strumento potente**. Può davvero aiutarti a:

- scrivere o correggere pezzi di codice;
- trovare un errore più in fretta;
- proporre idee, nomi, testi, immagini;
- spiegarti qualcosa che non hai capito.

**Ma non può decidere al posto tuo cosa vuoi creare e perché.**

---

# COSA RESTA A TE

| Ci pensa bene l'IA | Ci pensi **TU** |
|---|---|
| Generare codice su richiesta | Decidere **cosa** deve fare il gioco |
| Proporre tante idee | **Scegliere** quella giusta e motivarla |
| Trovare errori comuni | Capire se il risultato è **quello che volevi** |
| Scrivere un testo | Dare alla storia **la tua voce** |
| Rispondere a una domanda | Sapere **quale domanda fare** |

<div class="flow">

L'IA esegue. **Chi progetta guida.**

</div>

---

# LA DOMANDA GIUSTA

Un'IA risponde bene **solo se sai cosa chiederle**.

E sai cosa chiederle **solo se hai progettato**.
(Per questo, nel nostro percorso, **prima c'è il Quaderno**.)

<div class="big">

Le competenze che allenerete qui
— **progettare, organizzare, scegliere, risolvere** —
sono proprio quelle che **nessuna macchina può fare al posto vostro**.

</div>

---

# PRONTI A PARTIRE?

## Dalla prima idea al gioco completo.

**Pensare · Progettare · Creare · Sbagliare · Correggere · Presentare**

<br>

<p class="subtitle">Il videogioco è il risultato. Il metodo è quello che vi resta.</p>