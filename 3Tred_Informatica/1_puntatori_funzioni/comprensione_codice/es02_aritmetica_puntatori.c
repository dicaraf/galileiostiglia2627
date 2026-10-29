/* ESERCIZIO 2 - Aritmetica dei puntatori
 * Determina l'output senza compilare. */
#include <stdio.h>

int main() {
    int v[5] = {10, 20, 30, 40, 50};
    int *p = v;

    printf("%d\n", *p);
    p += 2;
    printf("%d\n", *p);
    printf("%d\n", *(p + 1));
    printf("%d\n", *p++);
    printf("%d\n", *p);
    printf("%d\n", *--p);
    printf("%d\n", (int)(p - v));
    (*p)++;
    printf("%d\n", v[2]);
    return 0;
}

/* DOMANDA EXTRA: qual e' la differenza tra *p++, (*p)++ e *++p? */
