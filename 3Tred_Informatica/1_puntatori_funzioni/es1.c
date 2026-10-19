/*Es. 1 Creare una funzione che riceve una quantità di tempo in 
formato ore, minuti e secondi e la restituisce espressa solamente 
in secondi.
Creare poi un programma che si faccia passare due quantità di 
tempo e verifichi quale è maggiore utilizzando la funzione 
precedente e solamente due if nel programma.*/

#include <stdio.h>

int converti_secondi(int ore, int minuti, int secondi);

int main(){
    int ore1, minuti1, secondi1, ore2, minuti2, secondi2;
    printf("Inserisci il primo orario in ore:minuti:secondi: ");
    scanf("%d", &ore1);
    scanf("%d", &minuti1);
    scanf("%d", &secondi1);
    printf("Inserisci il secondi orario in ore:minuti:secondi: ");
    scanf("%d", &ore2);
    scanf("%d", &minuti2);
    scanf("%d", &secondi2);
    int secondi_totali_1 = converti_secondi(ore1, minuti1, secondi1);
    int secondi_totali_2 = converti_secondi(ore2, minuti2, secondi2);
    if(secondi_totali_1 > secondi_totali_2) {
        printf("Il primo orario è maggiore del secondo\n");
    } else if (secondi_totali_1 < secondi_totali_2) {
        printf("Il primo orario è minore del secondo\n");
    } else {
        printf("Il primo orario è uguale al secondo\n");
    }
    return 0;
}

int converti_secondi(int ore, int minuti, int secondi) {
    int somma = ore * 60 * 60 + minuti * 60 + secondi;
    return somma;
}