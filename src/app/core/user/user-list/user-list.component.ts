import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, UserListResponse } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users!: User[];
  constructor(private _userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUserList();
  }

  private getUserList() {
    this._userService.getUserList().subscribe({
      next: (response: UserListResponse) => {
        if (response.status) {
          this.users = response.data;
        }
      },
    });
  }

  onEdit(user: User) {
    this.router.navigate(['/home/editUser', user.id]);
  }
  onDelete(user: User) {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${user.name}?`
    );
    if (confirmDelete) {
      this._userService.deleteUser(user.id).subscribe({
        next: (response) => {
          if (response.status) {
            this.getUserList();
          }
        },
      });
    }
  }
}
