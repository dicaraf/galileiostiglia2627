/* ESERCIZIO 11 - Puntatore di lettura e puntatore di scrittura
 * Determina l'output senza compilare. */
#include <stdio.h>

int compatta(int *v, int n) {
    int *w = v;
    for (int *r = v; r < v + n; r++)
        if (*r != 0)
            *w++ = *r;
    return (int)(w - v);
}

int main() {
    int v[8] = {0, 3, 0, 0, 5, 7, 0, 2};

    int k = compatta(v, 8);
    printf("%d\n", k);
    for (int i = 0; i < 8; i++) printf("%d ", v[i]);
    printf("\n");
    return 0;
}

/* DOMANDA EXTRA: gli ultimi 4 elementi dell'array sono azzerati?
 * Come modificheresti compatta perche' lo siano? */
