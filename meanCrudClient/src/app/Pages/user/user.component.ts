import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent{

  isFormVisible = false;
  modalIsOpen = false;
  selectedUID = "";
  users:User[] = []
  constructor(private userService: UserService){}

  userFormData = new FormGroup({
    first_name: new FormControl("", Validators.required),
    last_name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    isSuperAdmin: new FormControl(false, Validators.required)
  });

  userUpdateForm = new FormGroup({
    first_name: new FormControl("", Validators.required),
    last_name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    isSuperAdmin: new FormControl(false, Validators.required)
  });

  ngOnInit(){
    this.getAllUsers();
  }

  setDataOnForm(id:string){
    this.selectedUID = id;
    this.userService.getUserById(id).subscribe({
      next:(user)=>{
        this.userUpdateForm.setValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          isSuperAdmin: user.isSuperAdmin
        });
      }
    })
  }

  toggleForm(){
    this.isFormVisible = !this.isFormVisible;
  }

  toggleModal(){
    this.modalIsOpen = !this.modalIsOpen;
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next:(allUsers)=>{
        this.users = allUsers;
      }
    });
  }
  deleteUser(id:string){
    this.userService.deleteUser(id).subscribe({
      next:(allUsers)=>{
        this.users = this.users.filter((user)=> user._id != id);
      }
    })
  }

  updateUserData(){
    this.userService.updateUser(this.selectedUID, this.userUpdateForm.value as User).subscribe({
      next: ()=>{
        this.toggleModal()
        this.getAllUsers();
      }
    });
  }

  SubmitData(){
    this.userService.createUser(this.userFormData.value as User).subscribe({
      next: ()=>{
        this.toggleForm()
        this.userFormData.reset();
        this.getAllUsers();
      }
    })
  }


}
