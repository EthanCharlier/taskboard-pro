## Séquence 2 – Logique réactive du flux de données

### 1. Structure du flux

- Le service `TaskService` utilise un **BehaviorSubject** pour stocker et diffuser la liste des tâches.
- Le composant `Home` s’abonne à ce flux via `tasks$` et le **pipe async**.
- Le service `TaskService` devient la source unique de vérité pour l’état des tâches.
- Il utilise un BehaviorSubject, un type spécial d’Observable qui stocke la dernière valeur connue et la réémet à tout nouvel abonné.
- Le composant Home s’abonne au flux via la propriété tasks$, qui est exposée en lecture seule grâce à asObservable().
- Le template utilise le pipe async pour afficher automatiquement la dernière version du flux, sans gestion manuelle des souscriptions.
- Le typage strict Observable<{ id: number; title: string }[]> garantit une utilisation sûre et prévisible dans les composants et dans la vue.

### 2. Mise à jour des données

- La méthode `addTask()` ajoute une tâche puis appelle `next()` pour émettre la nouvelle liste.
- La méthode `removeTask()` supprime une tâche puis émet à nouveau la liste mise à jour.
- La vue est automatiquement réactualisée sans rechargement.
- addTask() -> crée une nouvelle liste de tâches, puis appelle next() sur le BehaviorSubject pour émettre la nouvelle version.
- removeTask() -> filtre la liste, puis réémet une version actualisée.
- Chaque next() déclenche automatiquement -> la mise à jour du flux, la notification des abonnés (le composant), la réactualisation automatique du template (via | async).
- Le composant reste passif : il ne tire jamais la donnée, il l’écoute (programmation réactive).
- L’état est géré en mémoire dans le service : tant que l’app n’est pas rechargée, les données persistent.

### 3. Points clés retenus

- Pas besoin d’appeler `getTasks()` à chaque fois : la donnée est **vivante**.
- `| async` gère l’abonnement et le désabonnement automatiquement.
- Le flux reste cohérent entre le service et la vue.
- Il n’est pas nécessaire d’appeler getTasks() après chaque action : le BehaviorSubject fait vivre les données dans le temps.
- Le pipe | async -> gère automatiquement l’abonnement/désabonnement, provoque la mise à jour du template dès qu’une valeur arrive.
- Le service joue pleinement son rôle -> centralisation des données, diffusion contrôlée, cohérence entre tous les composants abonnés.
- Angular adopte une approche déclarative : le template décrit ce qu’il veut afficher, Angular se charge du reste.
