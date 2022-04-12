import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  categories: any = {};
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);

      }, (error) => {
        console.log(error);
        Swal.fire("Error!!", "error in loading data", 'error');
      }
    );
  }

  deleteCategory(cid: any) {
    Swal.fire(
      {
        title: "Are you sure?",
        confirmButtonText: 'Delete',
        showCancelButton: true
      }
    ).then((result) => {
      if (result.isConfirmed) {
        // delete...
        this.categoryService.deleteCategory(cid).subscribe(
          (data) => {
            console.log(data);
            this.categories = this.categories.filter((category: any) => category.cid != cid);
            Swal.fire("Success!!", "category deleted successfully", 'success');
            // this.router.navigate(["/admin/categories"]);
          }, (error) => {
            console.log(error);
            Swal.fire("Error!!", "error on deleting data!! try again", 'error');
          }
        );
      }

    });
  }

}