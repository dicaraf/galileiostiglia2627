/*creare una funzione che calcola il quadrato di tutti gli 
elementi di un array di interi modificandolo e restituisce il massimo tra i quadrati, 
poi provarla.*/

#include <stdio.h> 
int quadrato (int *array, int dimensione);

int main () {
    int arr[] = {1,2,3,4,5,6,7,8};

    printf("Massimo tra i quadrati: %d", quadrato(arr, 8));

    return 0;

}

int quadrato (int array[], int dimensione) {
    for (int i = 0; i < dimensione; i++){
        *(array+i) = array[i] * *(array+i);
    }
    int massimo = array[0];
    for (int i = 0; i < dimensione; i++){
        if (array[i] > massimo){
            massimo = array[i];
        }
    } return massimo;
}

