#include <stdio.h>


int main() {
    int x = 42;
    int *p = NULL; // esplicitamente "non punta a niente"
    p = &x; 
    int array[10] = {1, 3, 5 , 7, 9, 11, 13, 15, 17, 19};

    printf("%p\n", p);

    p = array;
    printf("%d\n", *p);

    *p = *(array);
    printf("%d\n", *p);
    p = array;
    printf("%d\n", *p);
    for(int i = 3; i < 6; i++) {
        printf("%d\n", *(array + i));
        printf("%d\n", *p + 1);
    }
    return 0;
}