import {Component, inject, signal} from '@angular/core';
import {CategoryResponse} from "../../core/interfaces/books/categoryResponse";
import {CategoryService} from "../../core/services/books/category/category.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-categories',
  imports: [
    RouterLink
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  protected categories = signal<CategoryResponse[]>([])
  private categoryService = inject(CategoryService);

  ngOnInit() {
    this.categoryService.get().subscribe({
      next: response => {
        this.categories.set(response);
      }, error: error => {
        console.log(error);
      }
    })
  }

}
