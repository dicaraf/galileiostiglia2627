#include <stdio.h>


int main(void) {
    int x = 42;
    int *p = NULL; // esplicitamente "non punta a niente"
    p = &x; // p ora "punta a" x, cioè contiene l'indirizzo di x
    printf("Valore di x: %d\n", x);
    printf("Indirizzo di x (&x): %p\n", (void*)&x);
    printf("Valore di p (indirizzo):%p\n", (void*)p);
    printf("Valore puntato da p: %d\n", *p); // dereferenziazione -> 42
    *p = 10;
    printf("Valore di x: %d\n", x);
    printf("Indirizzo di x (&x): %p\n", (void*)&x);
    printf("Valore di p (indirizzo):%p\n", (void*)p);
    printf("Valore puntato da p: %d\n", *p); // dereferenziazione -> 42
    return 0;
}
