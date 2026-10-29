/* ESERCIZIO 1 - Passaggio per indirizzo
 * Determina l'output senza compilare. */
#include <stdio.h>

void f(int *a, int *b) {
    int t = *a;
    *a = *b + 1;
    *b = t * 2;
}

int main() {
    int x = 3, y = 5;
    f(&x, &y);
    printf("%d %d\n", x, y);
    f(&y, &x);
    printf("%d %d\n", x, y);
    return 0;
}

/* DOMANDA EXTRA: cosa cambierebbe se f ricevesse a e b per valore (int a, int b)? */
