import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  categories: any = [];
  constructor(private categoryService: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
      }, (error) => {
        this._snack.open('Error in loading form server', '', {
          duration: 3000
        });
      }
    );
  }

}
