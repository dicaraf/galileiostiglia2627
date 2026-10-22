/*Creare una funzione che calcola il prodotto e la 
somma tra tre numeri e restituisce la differenza 
tra questi due.
Creare poi un main che consenta di usare la funzione.*/

#include <stdio.h> 

float differenza_prodotto_somma(float num1, float num2, float num3);

int main(){

    float num1 = 3, num2 = 7, num3 = 2.8;
    printf("La differenza tra somma e prodotto dei tre numeri è %f", differenza_prodotto_somma(num1, num2, num3));
}

float differenza_prodotto_somma(float num1, float num2, float num3){
    float somma = num1 + num2 + num3;
    float prodotto = num1 * num2 * num3;
    return prodotto - somma;
}