import {Component, inject, signal} from '@angular/core';
import {CategoryResponse} from "../../core/interfaces/books/categoryResponse";
import {CategoryService} from "../../core/services/books/category/category.service";

@Component({
  selector: 'app-categories',
  imports: [],
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
        console.log(response)
      }, error: error => {
        console.log(error);
      }
    })

  }

}
