import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'heroes-list-item',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './heroes-list-item.html',
  styleUrl: './heroes-list-item.scss',
})
export class HeroesListItem {
  name = input('');
  id = input('');

  edit = output<string>();
  delete = output<string>();


  onEdit() {
    this.edit.emit(this.id());
  }

  onDelete() {
    this.delete.emit(this.id());
  }
}
