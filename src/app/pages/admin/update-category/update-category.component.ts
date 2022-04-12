import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  category = {
    title: '',
    description: ''
  };
  constructor(private categoryService: CategoryService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {

  }

  addCategory() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      // alert("username is required");
      this.snack.open("title is required", 'ok', { duration: 3000 });
      return;
    }
    if (this.category.description.trim() == '' || this.category.description == null) {
      this.snack.open("description is required", 'ok');
      return;
    }
    this.categoryService.createCategory(this.category).subscribe(
      (data) => {
        console.log(data);
        Swal.fire("Success !!", "Category added successfully", "success");
        this.router.navigate(["/admin/categories"]);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Category not added please try again", "error");
      }
    );
  }
}
