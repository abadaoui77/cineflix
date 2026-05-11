
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Movie } from '../../../core/models/movie.model';
import { TmdbService } from '../../../core/services/tmdb.service';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent implements OnInit {

  @Input() movie!: Movie;

  posterUrl = '';

  isFavorite = false;

  isHovered = false;

  constructor(
    private tmdbService: TmdbService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.posterUrl = this.tmdbService.getImageUrl(this.movie.poster_path, 'w342');

    this.isFavorite = this.favoritesService.isFavorite(this.movie.id);
  }

  goToDetail(): void {
    this.router.navigate(['/movie', this.movie.id]);
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(this.movie);
    this.isFavorite = !this.isFavorite;
  }

  getFormattedRating(): string {
    return this.movie.vote_average.toFixed(1);
  }

  getReleaseYear(): string {
    if (!this.movie.release_date) return '';
    return this.movie.release_date.split('-')[0];
  }

  getRatingColor(): string {
    const rating = this.movie.vote_average;
    if (rating >= 7) return 'text-green-400';
    if (rating >= 5) return 'text-yellow-400';
    return 'text-red-400';
  }
}
