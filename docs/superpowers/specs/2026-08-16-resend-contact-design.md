# Branchement Resend du formulaire de contact

Date : 2026-08-16
Statut : validé, prêt pour implémentation

## Contexte

Le formulaire de contact et sa route API existent déjà et sont fonctionnels sur
le plan du code :

- `src/components/ContactForm.tsx` — formulaire client (nom, téléphone, email,
  société, sujet, message) qui poste du JSON vers `/api/contact`.
- `src/app/api/contact/route.ts` — route handler qui appelle Resend et envoie
  vers `site.email` (`dreamlaunch@outlook.be`) avec `replyTo` positionné sur
  l'adresse du client.
- `resend@^6.18.1` est installé, `.env.local.example` documente `RESEND_API_KEY`.

Le travail restant n'est donc pas la construction de la fonctionnalité mais sa
mise en service, plus la correction de deux défauts que cette mise en service
rend critiques.

## Problèmes à résoudre

### 1. Faux succès silencieux

Quand `RESEND_API_KEY` est absente, la route logge le message en console et
répond `{ ok: true, dev: true }`. Le formulaire affiche alors « Message
envoyé » alors qu'aucun email n'est parti.

En développement c'est un confort acceptable. En production, si la variable
n'est pas configurée sur l'hébergeur, chaque prospect croit avoir été contacté
et le message est perdu sans trace. C'est le risque le plus sérieux du lot.

### 2. Message d'erreur du serveur ignoré

`ContactForm.tsx` fait `if (!res.ok) throw new Error()`, ce qui jette la réponse
du serveur. Toutes les causes d'échec (champ manquant, panne Resend, clé
absente) produisent le même texte générique côté client.

## Décisions

Prises avec l'utilisateur au cours du brainstorming :

- **Expéditeur** : on reste sur le domaine bac à sable `onboarding@resend.dev`
  pour l'instant. Le compte Resend a été créé avec `dreamlaunch@outlook.be`,
  donc les envois vers cette adresse sont autorisés sans domaine vérifié.
- **Configurabilité** : l'expéditeur passe en variable d'environnement, pour que
  le basculement futur vers `contact@dreamlaunch.be` soit un changement de
  configuration et non de code.
- **Hébergement** : Vercel.
- **Pas de rate limiting ni de captcha** pour l'instant — à ajouter si un volume
  d'abus réel apparaît.

## Conception

### Variables d'environnement

| Variable | Valeur initiale | Rôle |
|---|---|---|
| `RESEND_API_KEY` | `re_...` (dashboard Resend → API Keys) | Authentification Resend |
| `CONTACT_FROM` | `Dream&Launch <onboarding@resend.dev>` | Expéditeur de l'email |

`CONTACT_FROM` est optionnelle : en son absence le code retombe sur
`Dream&Launch <onboarding@resend.dev>`, la valeur actuellement codée en dur.
Les deux variables sont à définir dans `.env.local` (déjà couvert par
`.gitignore` via `.env*.local`) et dans Vercel → Settings → Environment
Variables.

La destination reste `site.email`, lue depuis `src/data/content.ts`. Elle n'est
pas déplacée en variable d'environnement : c'est une donnée publique du site,
déjà affichée sur la page contact.

### Route API

`src/app/api/contact/route.ts` évolue sur trois points.

**Repli développement conditionné.** Le repli console ne s'applique plus que
lorsque `process.env.NODE_ENV !== "production"`. En production, une clé absente
renvoie un 500 avec un message d'erreur explicite, et le serveur logge la cause
en console pour diagnostic.

**Expéditeur configurable.** `from` est lu depuis `process.env.CONTACT_FROM`
avec le défaut décrit plus haut.

**Validation d'entrée.** En complément du contrôle de présence existant :

- format de l'email vérifié côté serveur (le `type="email"` du navigateur est
  contournable) ;
- plafonds de longueur : nom 100, téléphone 40, société 100, sujet 200,
  message 5000 caractères.

Un dépassement ou un email malformé renvoie un 400 avec un message indiquant le
problème. Ces garde-fous protègent contre les payloads abusifs sans introduire
d'infrastructure supplémentaire.

### Formulaire client

`src/components/ContactForm.tsx` évolue sur deux points.

**Lecture du message d'erreur serveur.** La réponse est parsée et son champ
`error` affiché quand il est présent, avec repli sur le texte générique actuel
si le corps est illisible.

**Chemin de secours.** Le bloc d'erreur inclut un lien `mailto:` vers
`site.email`, pour qu'un prospect dont l'envoi échoue conserve un moyen de
prendre contact.

## Vérification

1. `npm run dev`, envoi d'un message réel depuis `/contact`, confirmation de
   réception dans la boîte `dreamlaunch@outlook.be` (vérifier aussi le dossier
   indésirables : l'expéditeur `resend.dev` y atterrit fréquemment).
2. Contrôle que `replyTo` est bien positionné : répondre à l'email reçu doit
   viser l'adresse saisie dans le formulaire, pas `onboarding@resend.dev`.
3. Cas d'erreur : avec une `RESEND_API_KEY` invalide, le formulaire doit
   afficher un message d'échec et non « Message envoyé ».
4. `npm run build` et `npm run lint` sans erreur.
5. Ajout des deux variables sur Vercel, puis redéploiement — les variables
   d'environnement ne sont prises en compte qu'au build suivant.

## Hors périmètre

- Vérification DNS du domaine `dreamlaunch.be` dans Resend (SPF/DKIM) et
  passage à `contact@dreamlaunch.be`. Le design rend ce basculement trivial mais
  ne le réalise pas.
- Accusé de réception automatique envoyé au client — impossible tant que le
  domaine n'est pas vérifié, le bac à sable n'autorisant l'envoi que vers
  l'adresse du compte.
- Stockage des messages en base de données.
- Rate limiting et captcha.
