/* ESERCIZIO 12 - Indicizzazione su puntatori (anche indici negativi)
 * Determina l'output senza compilare. */
#include <stdio.h>

int centro(int *p) {
    return p[-1] + p[0] * 2 + p[1];
}

int main() {
    int v[7] = {0, 10, 20, 30, 40, 50, 60};
    int *p = v + 3;

    printf("%d %d %d %d\n", p[0], p[-1], p[2], *(p - 2));
    printf("%d %d\n", p[-3], 2[p]);

    printf("%d\n", centro(v + 1));
    printf("%d\n", centro(v + 4));

    for (p = v + 1; p < v + 6; p++)
        *p = centro(p);
    for (int i = 0; i < 7; i++) printf("%d ", v[i]);
    printf("\n");
    return 0;
}

/* DOMANDA EXTRA: perche' 2[p] e' valido? A cosa equivale?
 * Nel ciclo finale, il risultato sarebbe diverso se i nuovi valori
 * venissero scritti in un secondo array invece che "in place"? Perche'? */
