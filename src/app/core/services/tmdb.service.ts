
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieApiResponse, MovieDetails, VideoApiResponse } from '../models/movie.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private apiKey = environment.tmdbApiKey;

  private baseUrl = 'https://api.themoviedb.org/3';
  public imageBaseUrl = 'https://image.tmdb.org/t/p';

  constructor(private http: HttpClient) {}

  getImageUrl(path: string, size: string = 'w500'): string {
    if (!path) return 'assets/no-image.png';
    return `${this.imageBaseUrl}/${size}${path}`;
  }

  getPopularMovies(): Observable<MovieApiResponse> {
    return this.http.get<MovieApiResponse>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=fr-FR`
    );
  }

  getTrendingMovies(): Observable<MovieApiResponse> {
    return this.http.get<MovieApiResponse>(
      `${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}&language=fr-FR`
    );
  }

  getTopRatedMovies(): Observable<MovieApiResponse> {
    return this.http.get<MovieApiResponse>(
      `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=fr-FR`
    );
  }

  getNowPlayingMovies(): Observable<MovieApiResponse> {
    return this.http.get<MovieApiResponse>(
      `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=fr-FR`
    );
  }

  getMovieDetails(movieId: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=fr-FR`
    );
  }

  getMovieVideos(movieId: number): Observable<VideoApiResponse> {
    return this.http.get<VideoApiResponse>(
      `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}&language=fr-FR`
    );
  }

  getSimilarMovies(movieId: number): Observable<MovieApiResponse> {
    return this.http.get<MovieApiResponse>(
      `${this.baseUrl}/movie/${movieId}/similar?api_key=${this.apiKey}&language=fr-FR`
    );
  }

  searchMovies(query: string): Observable<MovieApiResponse> {
    return this.http.get<MovieApiResponse>(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=fr-FR&query=${encodeURIComponent(query)}`
    );
  }
}