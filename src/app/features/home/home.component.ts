
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Movie } from '../../core/models/movie.model';
import { TmdbService } from '../../core/services/tmdb.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { MovieRowComponent } from '../../shared/components/movie-row/movie-row.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieRowComponent, NavbarComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  heroMovie: Movie | null = null;
  heroImageUrl = '';

  popularMovies: Movie[] = [];
  trendingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];

  isLoadingPopular = true;
  isLoadingTrending = true;
  isLoadingTopRated = true;
  isLoadingNowPlaying = true;

  heroIsFavorite = false;

  constructor(
    private tmdbService: TmdbService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrendingMovies();
    this.loadPopularMovies();
    this.loadTopRatedMovies();
    this.loadNowPlayingMovies();
  }


  loadTrendingMovies(): void {
    this.tmdbService.getTrendingMovies().subscribe({
      next: (response) => {
        this.trendingMovies = response.results;
        this.isLoadingTrending = false;

        if (response.results.length > 0) {
          this.setHeroMovie(response.results[0]);
        }
      },
      error: (error) => {
        console.error('Erreur chargement tendances:', error);
        this.isLoadingTrending = false;
      }
    });
  }

  loadPopularMovies(): void {
    this.tmdbService.getPopularMovies().subscribe({
      next: (response) => {
        this.popularMovies = response.results;
        this.isLoadingPopular = false;
      },
      error: (error) => {
        console.error('Erreur chargement populaires:', error);
        this.isLoadingPopular = false;
      }
    });
  }

  loadTopRatedMovies(): void {
    this.tmdbService.getTopRatedMovies().subscribe({
      next: (response) => {
        this.topRatedMovies = response.results;
        this.isLoadingTopRated = false;
      },
      error: (error) => {
        console.error('Erreur chargement mieux notés:', error);
        this.isLoadingTopRated = false;
      }
    });
  }

  loadNowPlayingMovies(): void {
    this.tmdbService.getNowPlayingMovies().subscribe({
      next: (response) => {
        this.nowPlayingMovies = response.results;
        this.isLoadingNowPlaying = false;
      },
      error: (error) => {
        console.error('Erreur chargement en salle:', error);
        this.isLoadingNowPlaying = false;
      }
    });
  }


  setHeroMovie(movie: Movie): void {
    this.heroMovie = movie;
    this.heroImageUrl = this.tmdbService.getImageUrl(movie.backdrop_path, 'original');
    this.heroIsFavorite = this.favoritesService.isFavorite(movie.id);
  }

  getHeroOverview(): string {
    if (!this.heroMovie?.overview) return '';
    const maxLength = 200;
    if (this.heroMovie.overview.length > maxLength) {
      return this.heroMovie.overview.substring(0, maxLength) + '...';
    }
    return this.heroMovie.overview;
  }


  goToMovieDetail(): void {
    if (this.heroMovie) {
      this.router.navigate(['/movie', this.heroMovie.id]);
    }
  }

  toggleHeroFavorite(): void {
    if (this.heroMovie) {
      this.favoritesService.toggleFavorite(this.heroMovie);
      this.heroIsFavorite = !this.heroIsFavorite;
    }
  }
}
