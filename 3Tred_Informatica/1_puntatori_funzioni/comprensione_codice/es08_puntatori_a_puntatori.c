/* ESERCIZIO 8 - Puntatori a puntatori
 * Determina l'output senza compilare. */
#include <stdio.h>

void avanza(int **pp) {
    (*pp)++;
}

void azzera(int **pp) {
    **pp = 0;
}

void scambia_ptr(int **a, int **b) {
    int *t = *a;
    *a = *b;
    *b = t;
}

int main() {
    int v[4] = {1, 2, 3, 4};
    int *p = v;

    avanza(&p);
    avanza(&p);
    azzera(&p);
    printf("%d %d\n", (int)(p - v), v[2]);
    for (int i = 0; i < 4; i++) printf("%d ", v[i]);
    printf("\n");

    int x = 1, y = 2;
    int *px = &x, *py = &y;
    scambia_ptr(&px, &py);
    printf("%d %d %d %d\n", *px, *py, x, y);
    return 0;
}

/* DOMANDA EXTRA: quale differenza c'e' tra scambia_ptr e una funzione che
 * scambia i valori di x e y? Quale delle due modifica x e y? */
