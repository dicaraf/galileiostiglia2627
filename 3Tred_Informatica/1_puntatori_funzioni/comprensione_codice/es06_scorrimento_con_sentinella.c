/* ESERCIZIO 6 - Scorrimento con puntatore e sentinella
 * Determina l'output senza compilare. */
#include <stdio.h>

int conta(int *p) {
    int n = 0;
    while (*p >= 0) {
        n++;
        p++;
    }
    return n;
}

int *salta(int *p, int k) {
    return p + k;
}

int main() {
    int v[7] = {5, 8, 0, 3, -1, 7, -2};

    printf("%d\n", conta(v));
    printf("%d\n", conta(v + 2));
    printf("%d\n", conta(v + 4));
    printf("%d\n", conta(salta(v, 5)));
    printf("%d\n", *salta(v, 3) + *salta(v + 1, 1));
    return 0;
}

/* DOMANDA EXTRA: cosa succede se l'array non contiene nessun valore negativo? */
