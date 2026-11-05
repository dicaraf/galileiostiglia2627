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

int main(void)
{
    /* dichiarare qui: strada, posizione, mosse,
       raccolti, potere, abbandono */

    srand(time(NULL));
    do {
        mosse = scegliDifficolta();
        preparaStrada(strada, &posizione);
        raccolti = 0;  potere = NESSUNO;  abbandono = 0;

        while (!partitaFinita(raccolti, mosse, abbandono)) {
            mostraStato(mosse, raccolti, potere);
            mostraStrada(strada, posizione);
            abbandono = giocaTurno(strada, &posizione, &mosse, &raccolti, &potere);
        }
        mostraEsito(raccolti, mosse, abbandono);
    } while (vuoleRigiocare());

    return 0;
}