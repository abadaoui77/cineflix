
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../core/models/movie.model';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-row',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-row.component.html'
})
export class MovieRowComponent {

  @Input() title = '';

  @Input() movies: Movie[] = [];

  @Input() isLoading = false;

  skeletonItems = Array(8).fill(0);
}
