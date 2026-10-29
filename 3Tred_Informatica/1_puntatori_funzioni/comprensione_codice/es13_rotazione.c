/* ESERCIZIO 13 - Rotazione a sinistra su sotto-array
 * Determina l'output senza compilare. */
#include <stdio.h>

void ruota(int *v, int n) {
    int primo = *v;
    for (int *p = v; p < v + n - 1; p++)
        *p = *(p + 1);
    v[n - 1] = primo;
}

void stampa(int *v, int n) {
    for (int *p = v; p != v + n; p++) printf("%d ", *p);
    printf("\n");
}

int main() {
    int v[5] = {1, 2, 3, 4, 5};

    ruota(v, 5);
    stampa(v, 5);
    ruota(v + 1, 3);
    stampa(v, 5);
    ruota(v, 5);
    stampa(v, 5);
    ruota(v + 3, 1);
    stampa(v, 5);
    return 0;
}

/* DOMANDA EXTRA: quante volte bisogna chiamare ruota(v, 5) per riavere l'array originale?
 * Cosa fa ruota(v, 1)? */
