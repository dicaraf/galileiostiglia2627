/* ESERCIZIO 14 - Aliasing: due puntatori allo stesso oggetto
 * Determina l'output senza compilare. */
#include <stdio.h>

void f(int *a, int *b) {
    *a = *a + 1;
    *b = *b * 2;
    *a = *a + *b;
}

int main() {
    int x = 3, y = 1;

    f(&x, &x);
    printf("%d\n", x);

    f(&x, &y);
    printf("%d %d\n", x, y);
    return 0;
}

/* DOMANDA EXTRA: se x valesse 3 e y valesse 3 e si chiamasse f(&x, &y),
 * quale sarebbe il risultato? Perche' e' diverso da f(&x, &x)? */
