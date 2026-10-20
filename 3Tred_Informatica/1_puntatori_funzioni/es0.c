/*Es. 0 Creare una funzione che calcola e restituisce il valore assoluto di un 
numero intero.
Creare poi un programma che fa inserire due numeri all’utente e dice, 
usando la funzione, quale dei due numeri interi ha il valore assoluto maggiore.*/
#include <stdio.h>

int valore_assoluto(int num_intero);
int main () {
    int num_1, num_2;
    printf ("Inserisci i due numeri: \n");
    scanf ("%d", &num_1);
    scanf ("%d", &num_2);
    if (valore_assoluto(num_1) > valore_assoluto(num_2)) {
        printf ("il primo numero ha un valore assoluto maggiore del secondo\n");
    } else if (valore_assoluto(num_1) == valore_assoluto(num_2)){
        printf ("i due numeri sono uguali in valore assoluto\n");

    } else {
        printf ("il primo numero ha un valore assoluto minore del secondo\n");
    }
    return 0;
} 

int valore_assoluto(int num_intero) {
    if (num_intero<0) {
        return num_intero*(-1);
    } 
    return num_intero;
}
