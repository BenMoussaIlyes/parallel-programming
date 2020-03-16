#include <semaphore.h>
#include <pthread.h>
#include <stdio.h>
#include <signal.h>
int currentval ;
sem_t semaphoreManger;
sem_t semaphoreRefillFood;
int currentfood;
int food;
int oisillons;
//gcc -o executable main.c -lpthread ; ./executable

void pere();


void fils(){


	while (1){

        sem_wait( &semaphoreManger );
        if(currentfood != 0){
            currentfood-- ;
            printf("%s%d\n", "oisillon mange, portion restants :" ,currentfood);
            sem_post( &semaphoreManger );
        }
        else
            {
            sem_getvalue(&semaphoreRefillFood, &currentval);
            if( currentval!=1){ // si aucun oisillon n'a deja signaler le remplissage , cela est fait maintenant
               sem_post( &semaphoreRefillFood );
            }

        }
	}
}
void pere(){
    while(1){
    sem_getvalue(&semaphoreRefillFood, &currentval);// verifier si le semaphore de remplissage est egal a 1
       if (currentval == 1) 
       {
       printf("parent remplit la nourriture\n");
        currentfood = food ;
        sem_wait( &semaphoreRefillFood);
        sem_post( &semaphoreManger );

        }

    }
}

int main()
{
pthread_t Tpere;
pthread_t Tfils[20];
printf("donner N nombre de oisillons :");
scanf("%d", &oisillons);

printf("donner F nombre de portions :");
scanf("%d", &food);
sem_init( &semaphoreManger, 0, 1 );
sem_init( &semaphoreRefillFood, 0, 0);
pthread_create(&Tpere, NULL, pere,NULL);
for(int i=0;i<5 ; i++){
    pthread_create(&Tfils[i], NULL, fils, NULL);
}

int value_ptr , value_ptr2[5];
pthread_join(Tpere, &value_ptr);
for(int i=0;i<5 ; i++){
    pthread_join(Tfils[i], &value_ptr2[i]);
}

sem_destroy( &semaphoreManger );
sem_destroy( &semaphoreRefillFood );
}
