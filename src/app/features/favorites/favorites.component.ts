
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Movie } from '../../core/models/movie.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { TmdbService } from '../../core/services/tmdb.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit {

  favoriteMovies: Movie[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private tmdbService: TmdbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteMovies = this.favoritesService.getFavorites();
  }

  removeFavorite(movieId: number, event: Event): void {
    event.stopPropagation();
    this.favoritesService.removeFavorite(movieId);
    this.favoriteMovies = this.favoriteMovies.filter(m => m.id !== movieId);
  }

  goToDetail(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  getPosterUrl(posterPath: string): string {
    return this.tmdbService.getImageUrl(posterPath, 'w342');
  }

  getReleaseYear(date: string): string {
    if (!date) return '';
    return date.split('-')[0];
  }
}
