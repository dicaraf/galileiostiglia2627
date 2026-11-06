#include <stdio.h>

#define LUNGHEZZA_STRADA 200
#define VISTA            10
#define NUM_OGGETTI      8
#define PASSI_MAX        3
#define SALTO_MOLLA      15

#define VUOTA     '.'
#define NESSUNO   '-'
#define STIVALI   'S'
#define MOLLA     'M'
#define CLESSIDRA 'C'
#define SPECCHIO  'X'

/* Preparazione */
void mostraIstruzioni();
int  scegliDifficolta();
int  casellaLibera(char strada[], int posizione);
void preparaStrada(char strada[], int *posizione);

/* Visualizzazione */
void stampaNomeOggetto(char oggetto);
void mostraStato(int mosse, int raccolti, char potere);
char simboloCasella(char strada[], int casella, int posizione);
void mostraStrada(char strada[], int posizione);

/* Input e movimento */
char leggiDirezione();
int  leggiPassi();
int  calcolaSpostamento(char direzione, int passi, char potere);
void raccogliOggetto(char strada[], int casella, int *raccolti, char *potere);
void muoviGiocatore(char strada[], int *posizione, int spostamento,
                    char potereUsato, int *raccolti, char *potere);

/* Turno e fine partita */
int  giocaTurno(char strada[], int *posizione, int *mosse,
                int *raccolti, char *potere);
int  partitaFinita(int raccolti, int mosse, int abbandono);
void mostraEsito(int raccolti, int mosse, int abbandono);
int  vuoleRigiocare();


int main()
{
    /* dichiarare qui: strada, posizione, mosse,
       raccolti, potere, abbandono */
    mostraIstruzioni();
    srand(time(NULL));
    do {
        mosse = scegliDifficolta();
        preparaStrada(strada, &posizione);
        raccolti = 0;  potere = NESSUNO;  abbandono = 0;

        while (partitaFinita(raccolti, mosse, abbandono) != 0) {
            mostraStato(mosse, raccolti, potere);
            mostraStrada(strada, posizione);
            abbandono = giocaTurno(strada, &posizione, &mosse, &raccolti, &potere);
        }
        mostraEsito(raccolti, mosse, abbandono);
    } while (vuoleRigiocare());

    return 0;
}

void mostraIstruzioni()
{
    printf("================ LA STRADA DEGLI OGGETTI ================\n");
    printf("Raccogli tutti gli %d oggetti prima di finire le mosse!\n\n", NUM_OGGETTI);
    printf("Legenda:  P = tu   ? = oggetto   . = vuoto   # = muro\n\n");
    printf("Poteri (valgono solo per la mossa successiva):\n");
    printf("  Stivali   -> passi moltiplicati per 3\n");
    printf("  Molla     -> salto di %d caselle\n", SALTO_MOLLA);
    printf("  Clessidra -> la mossa non costa tentativi\n");
    printf("  Specchio  -> direzione invertita (attenzione!)\n\n");
}