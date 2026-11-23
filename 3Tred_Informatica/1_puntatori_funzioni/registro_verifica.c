/* VERIFICA - Il registro di classe
 * La classe ha 12 studenti, numerati da 1 a 12 come sul registro. Per ognuno c'e'
 * il voto (da 1 a 10) e il giudizio, un carattere ricavato dal voto: due array
 * con lo stesso indice (lo studente numero 1 ha indice 0).
 * Completa le 4 funzioni DA COMPLETARE senza modificare il resto. Il file compila gia'.
 */
#include <stdio.h>

#define NUM_STUDENTI  12
#define INSUFFICIENTE 'I'    /* voto da 1 a 5  */
#define SUFFICIENTE   'S'    /* voto 6         */
#define BUONO         'B'    /* voto 7 oppure 8 */
#define OTTIMO        'O'    /* voto 9 oppure 10 */

/* Funzioni gia' fatte */
int  leggiNumero(int min, int max);              /* legge un numero tra min e max */
void stampaRegistro(int voti[], char giudizi[]); /* stampa numeri, voti, giudizi  */

/* Funzioni da completare */
int  contaInsufficienti(int voti[]);
void assegnaGiudizi(int voti[], char giudizi[]);
void mediaEMigliore(int voti[], float *media, int *migliore);
int  recupero(int voti[], int indice, int nuovoVoto, int *vecchio);

int main(void)
{
    int voti[NUM_STUDENTI] = { 7, 4, 9, 6, 5, 8, 10, 3, 6, 7, 5, 8 };
    char giudizi[NUM_STUDENTI] = { '?','?','?','?','?','?','?','?','?','?','?','?' };
    int scelta, studente, nuovoVoto, migliore = 0, vecchio = 0;
    float media = 0;

    do {
        assegnaGiudizi(voti, giudizi);
        stampaRegistro(voti, giudizi);
        printf("1) Insufficienti  2) Media e migliore  3) Recupero  0) Esci: ");
        scelta = leggiNumero(0, 3);
        if (scelta == 1) {
            printf(">> Studenti insufficienti: %d\n", contaInsufficienti(voti));
        } else if (scelta == 2) {
            mediaEMigliore(voti, &media, &migliore);
            printf(">> Media della classe: %.2f\n", media);
            printf(">> Voto migliore: %d, dello studente numero %d\n",
                   voti[migliore], migliore + 1);
        } else if (scelta == 3) {
            printf("Numero dello studente (1-%d)? ", NUM_STUDENTI);
            studente = leggiNumero(1, NUM_STUDENTI);
            printf("Voto del recupero (1-10)? ");
            nuovoVoto = leggiNumero(1, 10);
            if (recupero(voti, studente - 1, nuovoVoto, &vecchio))
                printf(">> Voto aggiornato: da %d a %d\n", vecchio, nuovoVoto);
            else
                printf(">> Voto non cambiato: resta %d\n", vecchio);
        }
    } while (scelta != 0);
    return 0;
}

/* ------------------------ Funzioni gia' fatte ------------------------ */

int leggiNumero(int min, int max)
{
    int numero = min - 1;

    scanf("%d", &numero);
    getchar();
    while (numero < min || numero > max) {
        printf("Valore non valido (%d-%d): ", min, max);
        scanf("%d", &numero);
        getchar();
    }
    return numero;
}

void stampaRegistro(int voti[], char giudizi[])
{
    printf("\nStudente: ");
    for (int i = 0; i < NUM_STUDENTI; i++)
        printf("%4d", i + 1);
    printf("\nVoto:     ");
    for (int i = 0; i < NUM_STUDENTI; i++)
        printf("%4d", voti[i]);
    printf("\nGiudizio: ");
    for (int i = 0; i < NUM_STUDENTI; i++)
        printf("%4c", giudizi[i]);
    printf("\n\n");
}

/* ----------------------- Funzioni da completare ---------------------- */

/* Restituisce quanti studenti hanno un voto minore di 6. */
int contaInsufficienti(int voti[])
{
    /* DA COMPLETARE */
    return 0;
}

/* Riempie l'array giudizi: per ogni studente mette INSUFFICIENTE, SUFFICIENTE,
   BUONO oppure OTTIMO in base al voto (vedi le costanti in alto). */
void assegnaGiudizi(int voti[], char giudizi[])
{
    /* DA COMPLETARE */
}

/* Mette in *media la media dei voti della classe e in *migliore l'indice
   dello studente con il voto piu' alto (a parita' di voto, il primo). */
void mediaEMigliore(int voti[], float *media, int *migliore)
{
    /* DA COMPLETARE */
}

/* Recupero dello studente di indice "indice". Mette sempre in *vecchio il voto
   attuale. Il voto viene sostituito con "nuovoVoto" solo se lo studente era
   insufficiente e il nuovo voto e' piu' alto: in quel caso restituisce 1,
   altrimenti lascia il voto com'e' e restituisce 0. */
int recupero(int voti[], int indice, int nuovoVoto, int *vecchio)
{
    /* DA COMPLETARE */
    return 0;
}
