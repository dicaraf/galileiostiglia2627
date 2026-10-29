/* ESERCIZIO 5 - Due puntatori e parametri di output
 * Determina l'output senza compilare. */
#include <stdio.h>

void rev(int *a, int *b) {
    while (a < b) {
        int t = *a;
        *a = *b;
        *b = t;
        a++;
        b--;
    }
}

void stats(int *v, int n, int *sum, int *cnt) {
    *sum = 0;
    *cnt = 0;
    while (n--) {
        if (*v % 2 == 0) {
            *sum += *v;
            (*cnt)++;
        }
        v++;
    }
}

int main() {
    int v[6] = {1, 2, 3, 4, 5, 6};
    int s, c;

    rev(v, v + 5);
    rev(v + 1, v + 3);
    for (int i = 0; i < 6; i++) printf("%d ", v[i]);
    printf("\n");

    stats(v, 6, &s, &c);
    printf("%d %d\n", s, c);
    return 0;
}

/* DOMANDA EXTRA: perche' in rev il ciclo termina con a < b e non con a != b?
 * Cosa succederebbe con a != b se il numero di elementi fosse pari? */
