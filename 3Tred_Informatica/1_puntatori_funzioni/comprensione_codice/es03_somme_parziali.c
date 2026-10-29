/* ESERCIZIO 3 - Funzione che modifica un array
 * Determina l'output senza compilare. */
#include <stdio.h>

void g(int *a, int n) {
    for (int i = 0; i < n - 1; i++)
        a[i + 1] += a[i];
}

int main() {
    int v[5] = {1, 2, 3, 4, 5};

    g(v, 5);
    for (int i = 0; i < 5; i++) printf("%d ", v[i]);
    printf("\n");

    g(v + 2, 3);
    for (int i = 0; i < 5; i++) printf("%d ", v[i]);
    printf("\n");
    return 0;
}

/* DOMANDA EXTRA: cosa fa g se la si chiama con n = 1? E con n = 0? */
