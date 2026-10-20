/*Es. 2 Creare un programma che fa inserire all’utente tre caratteri e 
usando una funzione verifica e stampa quanti di questi sono lettere maiuscole*/

#include <stdio.h>
int lettera_maiuscola (char lettera);
int main(){
  char lettera;
  int conta=0;
  for(int i=0; i<3; i++){
    printf("inserisci una lettera:");
    scanf("%c", &lettera);
    conta=conta + lettera_maiuscola(lettera);
  }
  printf("le lettere inserite maiuscole sono %d", conta);
}

int lettera_maiuscola (char lettera){
    if(lettera>= 'A' && lettera<= 'Z'){
        return 1;
    }
    return 0;
}
