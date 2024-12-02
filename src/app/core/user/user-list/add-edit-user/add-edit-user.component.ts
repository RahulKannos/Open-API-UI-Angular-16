import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  userForm!: FormGroup;
  user!: User;
  submitBtnTitle = 'Create User';
  constructor(
    private fb: FormBuilder,
    private _user: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.formBuilder();
    if (id) {
      this.submitBtnTitle = 'Update User';
      this.getUserById(id);
    }
  }
  private formBuilder() {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const payload: User = {
        ...this.userForm.value,
        createdBy: new Date(),
      };
      this._user.addEditUser(payload).subscribe({
        next: (response) => {
          if (response.status) {
            this.router.navigate(['/home/userList']);
          }
        },
      });
    }
  }

  getUserById(id: string) {
    this._user.getUserById(id).subscribe({
      next: (response) => {
        if (response.status) {
          this.user = response.data;
          debugger;
          this.userForm.patchValue({
            ...this.user,
          });
        }
      },
    });
  }
}
