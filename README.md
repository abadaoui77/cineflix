# 🎬 CineFlix

Un clone Netflix 100% frontend développé avec Angular et l'API TMDB.

![Angular](https://img.shields.io/badge/Angular-20-red?logo=angular)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![TMDB](https://img.shields.io/badge/API-TMDB-green)

## ✨ Fonctionnalités

- 🏠 Page d'accueil avec hero banner et plusieurs catégories de films
- 🔍 Recherche de films par titre
- 🎬 Page de détail avec synopsis, note, trailer YouTube et films similaires
- ❤️ Système de favoris sauvegardé en localStorage
- 📱 Design responsive mobile / tablette / desktop

## 🛠️ Stack technique

| Technologie | Usage |
|---|---|
| Angular 20 | Framework principal |
| TypeScript | Langage |
| TailwindCSS 4 | Styles |
| Angular Router | Navigation |
| HttpClient | Appels API |
| localStorage | Persistance des favoris |
| TMDB API | Données films |
| GitHub Actions | CI/CD |
| GitHub Pages | Hébergement |

## 📁 Structure du projet

```
src/app/
├── core/
│   ├── models/
│   │   └── movie.model.ts
│   ├── pipes/
│   │   └── trust-url.pipe.ts
│   └── services/
│       ├── tmdb.service.ts
│       └── favorites.service.ts
├── shared/
│   └── components/
│       ├── navbar/
│       ├── movie-card/
│       └── movie-row/
├── features/
│   ├── home/
│   ├── search/
│   ├── movie-details/
│   └── favorites/
├── app.component.ts
├── app.config.ts
└── app.routes.ts
```

## 🚀 Installation et lancement

### Prérequis

- Node.js 20+
- npm
- Une clé API TMDB gratuite → [themoviedb.org](https://www.themoviedb.org/settings/api)

### Installation

```bash
git clone https://github.com/abadaoui77/cineflix.git
cd cineflix
npm install
```

### Configuration

Crée le fichier `src/environments/environment.ts` :

```typescript
export const environment = {
  production: false,
  tmdbApiKey: 'TA_CLE_API_TMDB'
};
```

Crée le fichier `src/environments/environment.development.ts` :

```typescript
export const environment = {
  production: false,
  tmdbApiKey: 'TA_CLE_API_TMDB'
};
```

### Lancement

```bash
npm start
```

L'application est disponible sur `http://localhost:4200`

## 📸 Pages

| Page | Description |
|---|---|
| `/` | Accueil avec hero banner et catégories |
| `/search?q=...` | Résultats de recherche |
| `/movie/:id` | Détail d'un film |
| `/favorites` | Films sauvegardés |

## ⚙️ Scripts disponibles

```bash
npm start        # Lance le serveur de développement
npm run build    # Build de production
npm test         # Lance les tests
```

