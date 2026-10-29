/* ESERCIZIO 10 - Array come parametro: cosa e' davvero?
 * Determina l'output senza compilare.
 * (Il compilatore con -Wall potrebbe avvisare su sizeof(a): e' voluto.) */
#include <stdio.h>

void f(int a[], int n) {
    printf("%d\n", (int)(sizeof(a) == sizeof(int *)));
    printf("%d\n", n);
}

int main() {
    int v[8] = {0};
    int *p = v;

    printf("%d\n", (int)(sizeof(v) / sizeof(v[0])));
    f(v, 8);
    printf("%d\n", (int)((v + 8) - v));
    printf("%d\n", (int)(sizeof(p) == sizeof(v)));
    printf("%d\n", p == &v[0]);
    return 0;
}

/* DOMANDA EXTRA: perche' dentro f non si puo' ricavare la lunghezza dell'array
 * con sizeof(a)/sizeof(a[0])? Cosa si ottiene invece?
 * Il penultimo output (sizeof(p) == sizeof(v)) potrebbe mai essere 1? Perche'? */
