## Séquence 2 – Logique réactive du flux de données

### 1. Structure du flux

- Le service `TaskService` utilise un **BehaviorSubject** pour stocker et diffuser la liste des tâches.
- Le composant `Home` s’abonne à ce flux via `tasks$` et le **pipe async**.
- La méthode `asObservable()` est utilisée pour exposer le flux en lecture seule, garantissant que seul le service peut émettre de nouvelles valeurs (encapsulation).
- Le typage strict `Observable<{ id: number, title: string }[]>` assure la sécurité et l'autocomplétion dans les templates.

### 2. Mise à jour des données

- La méthode `addTask()` ajoute une tâche puis appelle `next()` pour émettre la nouvelle liste.
- La méthode `removeTask()` supprime une tâche puis émet à nouveau la liste mise à jour.
- La vue est automatiquement réactualisée sans rechargement.
- Le composant reste "passif" : il ne va pas chercher la donnée, il réagit simplement aux nouvelles émissions du flux.
- L'état est maintenu en mémoire dans le service : changer de page ne perd pas les données ajoutées (tant que l'app n'est pas rechargée).

### 3. Points clés retenus

- Pas besoin d’appeler `getTasks()` à chaque fois : la donnée est **vivante**.
- `| async` gère l’abonnement et le désabonnement automatiquement.
- Le flux reste cohérent entre le service et la vue.
- Le service est la seule source de vérité pour l'état des tâches, évitant les désynchronisations entre composants.
- Approche déclarative : On décrit quoi afficher (le flux de tâches) plutôt que *comment* mettre à jour l'écran étape par étape.
