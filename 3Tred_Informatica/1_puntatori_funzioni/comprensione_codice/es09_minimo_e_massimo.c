/* ESERCIZIO 9 - Piu' valori restituiti tramite parametri di output
 * Determina l'output senza compilare. */
#include <stdio.h>

void minmax(int *v, int n, int *mn, int *mx) {
    *mn = *mx = v[0];
    for (int *p = v + 1; p < v + n; p++) {
        if (*p < *mn) *mn = *p;
        if (*p > *mx) *mx = *p;
    }
}

int main() {
    int v[6] = {7, -2, 9, 4, -5, 9};
    int a, b;

    minmax(v, 6, &a, &b);
    printf("%d %d %d\n", a, b, b - a);

    minmax(v + 1, 3, &a, &b);
    printf("%d %d %d\n", a, b, b - a);

    minmax(v + 4, 1, &a, &b);
    printf("%d %d %d\n", a, b, b - a);
    return 0;
}

/* DOMANDA EXTRA: cosa succederebbe chiamando minmax(v, 6, &a, &a)?
 * Il risultato sarebbe ben definito? */
