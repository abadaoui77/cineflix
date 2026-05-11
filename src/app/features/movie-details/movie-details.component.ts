
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails, Movie, Video } from '../../core/models/movie.model';
import { TmdbService } from '../../core/services/tmdb.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { MovieRowComponent } from '../../shared/components/movie-row/movie-row.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { TrustUrlPipe } from '../../core/pipes/trust-url.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, MovieRowComponent, NavbarComponent, TrustUrlPipe],
  templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit {

  movie: MovieDetails | null = null;

  similarMovies: Movie[] = [];

  trailerKey: string | null = null;

  backdropUrl = '';
  posterUrl = '';

  isLoading = true;
  isLoadingSimilar = true;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = Number(params['id']);
      if (movieId) {
        this.loadMovie(movieId);
        this.loadSimilarMovies(movieId);
        this.loadVideos(movieId);
        window.scrollTo(0, 0);
      }
    });
  }

  loadMovie(movieId: number): void {
    this.isLoading = true;

    this.tmdbService.getMovieDetails(movieId).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.backdropUrl = this.tmdbService.getImageUrl(movie.backdrop_path, 'original');
        this.posterUrl = this.tmdbService.getImageUrl(movie.poster_path, 'w500');
        this.isFavorite = this.favoritesService.isFavorite(movie.id);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur chargement film:', error);
        this.isLoading = false;
      }
    });
  }

  loadSimilarMovies(movieId: number): void {
    this.tmdbService.getSimilarMovies(movieId).subscribe({
      next: (response) => {
        this.similarMovies = response.results.slice(0, 12);
        this.isLoadingSimilar = false;
      },
      error: () => { this.isLoadingSimilar = false; }
    });
  }

  loadVideos(movieId: number): void {
    this.tmdbService.getMovieVideos(movieId).subscribe({
      next: (response) => {
        const trailer = response.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        this.trailerKey = trailer ? trailer.key : null;
      },
      error: () => { this.trailerKey = null; }
    });
  }


  toggleFavorite(): void {
    if (!this.movie) return;

    const movieForFavorite: Movie = {
      id: this.movie.id,
      title: this.movie.title,
      overview: this.movie.overview,
      poster_path: this.movie.poster_path,
      backdrop_path: this.movie.backdrop_path,
      vote_average: this.movie.vote_average,
      release_date: this.movie.release_date,
      genre_ids: this.movie.genres.map(g => g.id)
    };

    this.favoritesService.toggleFavorite(movieForFavorite);
    this.isFavorite = !this.isFavorite;
  }

  goBack(): void {
    window.history.back();
  }


  formatRuntime(minutes: number): string {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }

  formatMoney(amount: number): string {
    if (!amount) return 'Non communiqué';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  }

  getRatingColor(): string {
    if (!this.movie) return '';
    const rating = this.movie.vote_average;
    if (rating >= 7) return '#4ade80';
    if (rating >= 5) return '#facc15';
    return '#f87171';
  }
}
