/*Leggere un array di interi con 8 numeri e dire quali e quanti di questi sono primi.
*/

#include <stdio.h>
#define DIM 8
int main() {    
    int numeri[DIM];

    for (int i = 0; i < DIM; i++) {
        printf("Inserisci il numero %d: ", i + 1);
        scanf("%d", &numeri[i]);
    }
    int conta_divisori, conta_primi = 0;
    for(int i = 0; i < DIM; i++){
        conta_divisori = 0;
        for(int j = 2; j <= numeri[i]/2; j++) {
            if(numeri[i] % j == 0) {
                conta_divisori++;
            }
        }
        if(conta_divisori == 0) {
            conta_primi++;
            printf("%d è primo\n", numeri[i]);
        }
    }
    printf("I numeri primi sono %d", conta_primi);

    return 0;
}