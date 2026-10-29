/* ESERCIZIO 4 - Funzione che restituisce un puntatore
 * Determina l'output senza compilare. */
#include <stdio.h>

int *max(int *a, int n) {
    int *m = a;
    for (int *p = a + 1; p < a + n; p++)
        if (*p > *m)
            m = p;
    return m;
}

int main() {
    int v[6] = {4, 9, 2, 9, 7, 1};

    int *p = max(v, 6);
    *p = 0;
    printf("%d %d\n", (int)(p - v), v[1]);

    p = max(v, 6);
    printf("%d\n", (int)(p - v));

    printf("%d\n", *max(v + 4, 2));
    return 0;
}

/* DOMANDA EXTRA: cosa cambia nell'output se nella funzione si usa >= al posto di > ? */
