#include <stdio.h>
int raddoppia(int n); // prototipo
int main(void) {
    int x = 10;
    printf("Prima della chiamata: x = %d\n", x);
    x = raddoppia(x); // passo il VALORE di x (una copia)
    printf("Dopo la chiamata: x = %d\n", x);
    raddoppia(x);
    printf("Dopo la chiamata: x = %d\n", x);
    return 0;
}
int raddoppia(int n) {
    n = n * 2; // modifico solo la copia locale n
    printf("Dentro la funzione: n = %d\n", n);
    return n;
}