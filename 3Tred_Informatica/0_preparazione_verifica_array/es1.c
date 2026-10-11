/*Leggere un array di 10 interi con dati riempiti dall'utente. 
Stampare quanti elementi sono pari e quanti dispari, 
poi la somma degli elementi che si trovano in posizioni 
di indice pari (0, 2, 4, ...).*/
#include <stdio.h>
#define DIM 10

int main() {
   int array[DIM], conta_pari = 0, somma = 0;
   for(int i = 0; i < DIM; i++){
        printf("Inserisci un valore in posizione %d", i);
        scanf("%d", &array[i]);
   }

   for(int i = 0; i < DIM; i++){
        if(array[i] % 2 == 0) {
            conta_pari++;
        } 
        if(i % 2 == 0) {
            somma = somma + array[i];
        }
   }

   
   printf("I numeri pari sono %d\n", conta_pari);
   printf("I numeri dispari sono %d\n", DIM - conta_pari);
   printf("La somma blabla è %d\n", somma);
}