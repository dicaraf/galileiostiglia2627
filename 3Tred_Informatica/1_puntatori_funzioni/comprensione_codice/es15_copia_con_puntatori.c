/* ESERCIZIO 15 - L'idioma *dst++ = *src++ e sovrapposizione
 * Determina l'output senza compilare. */
#include <stdio.h>

void copia(int *dst, int *src, int n) {
    while (n-- > 0)
        *dst++ = *src++;
}

void stampa(int *v, int n) {
    while (n--) printf("%d ", *v++);
    printf("\n");
}

int main() {
    int a[5] = {1, 2, 3, 4, 5};
    int b[6] = {0};

    copia(b + 1, a, 3);
    stampa(b, 6);

    copia(a + 1, a, 3);
    stampa(a, 5);
    return 0;
}

/* DOMANDA EXTRA: perche' la seconda copia non produce 1 1 2 3 5?
 * Come andrebbe scritta copia per gestire correttamente la sovrapposizione
 * quando dst > src? */
