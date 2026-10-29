/* ESERCIZIO 7 - Il puntatore passato per valore
 * Determina l'output senza compilare. */
#include <stdio.h>

void h(int *p) {
    p = p + 1;
    *p = 99;
}

int main() {
    int v[3] = {1, 2, 3};
    int *q = v;

    h(q);
    printf("%d %d %d\n", (int)(q - v), *q, v[1]);
    return 0;
}

/* DOMANDA EXTRA: perche' q non cambia dopo la chiamata a h, mentre v[1] si'?
 * Come dovrebbe essere scritta h per modificare anche q? */
