
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private storageKey = 'cineflix_favorites';


  getFavorites(): Movie[] {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  }


  addFavorite(movie: Movie): void {
    const favorites = this.getFavorites();

    const alreadyExists = favorites.some(fav => fav.id === movie.id);
    if (!alreadyExists) {
      favorites.push(movie);
      this.saveToStorage(favorites);
    }
  }

  removeFavorite(movieId: number): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    this.saveToStorage(updatedFavorites);
  }


  isFavorite(movieId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(movie => movie.id === movieId);
  }

  toggleFavorite(movie: Movie): void {
    if (this.isFavorite(movie.id)) {
      this.removeFavorite(movie.id);
    } else {
      this.addFavorite(movie);
    }
  }


  private saveToStorage(favorites: Movie[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
