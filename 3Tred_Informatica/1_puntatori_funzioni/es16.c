/*es 16. Creare una funzione che scambia il contenuto di due variabili 
che le sono passate; poi creare un programma che fatti inserire tre 
numeri da parte dell’utente li ordina in ordine crescente usando la 
funzione precedentemente creata.*/

#include<stdio.h>

void scambio(int *variabile1, int *variabile2);
int main(){
    
}
void scambio(int *variabile1, int *variabile2){
    int temp=*variabile1;
    *variabile1=*variabile2;
    *variabile2=temp;
}