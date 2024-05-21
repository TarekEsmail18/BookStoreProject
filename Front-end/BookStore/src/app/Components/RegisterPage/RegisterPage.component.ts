import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/services/confirmed.validator';
import { UserService } from 'src/app/services/User.service';
import { User } from 'src/app/ViewModel/User';

@Component({
  selector: 'app-RegisterPage',
  templateUrl: './RegisterPage.component.html',
  styleUrls: ['./RegisterPage.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerPhoto:string = "assets/images/login-photo.jpg";
  navBarImage:string = "assets/images/nav-bar1.jpg";
  submitted:boolean = false;
  emailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern:string = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}";
  userData:User;
  errorMessage: string = "";
  showError: boolean = false;
  


  registerForm = this.fb.group({
    UserName: ['',Validators.required],
    FullName: ['',Validators.required],
    email: ['',Validators.pattern(this.emailPattern)],
    password: ['',Validators.minLength(5)],
    confirmPassword: ['',Validators.required],
    acceptTerms: ['',Validators.required]
  },
  {
    validator: ConfirmedValidator('password','confirmPassword')
  }
  );

  
  constructor(private fb: FormBuilder,private userservices: UserService,private router: Router) {
    this.userData = {UserName:"",FullName:"",Email:"",Password:""};
   }

  ngOnInit() {
  }


  onSubmit(form: FormGroup)
  {
    if(this.registerForm.valid)
    {
      this.submitted = true;
      this.userData = {
        UserName: form.value.UserName,
        Email: form.value.email,
        Password: form.value.password,
        FullName: form.value.FullName
      };
      
      this.userservices.RegisterToDataBase(this.userData).subscribe(
        (res: any)=>{
          
          localStorage.setItem("token",res.token);
          this.router.navigateByUrl("/Home").then(()=>{window.location.reload()});
        },
        (err: HttpErrorResponse)=>{
          this.errorMessage = err.error;
          this.showError = true;
        });
    }
  }

  
}
