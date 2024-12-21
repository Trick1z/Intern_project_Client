import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],standalone:true,
  imports: [
    FormsModule,HttpClientModule
  ]
})
export class TestComponent implements OnInit {

  _userName: string = '';
  _userPw: string = '';
  data: any;
  res: any;

  // private http: HttpClient
  constructor(private http: HttpClient,
    private router :Router
  ) {}

  ngOnInit() {
    // this.postData(this._userName,this._userpw);
  }

  postData(username: any, password: any) {
    this.data = {
      userName: username,
      userPassword: password,
    };

    this.http
      .post('http://localhost:52169/api/Login', this.data)
      .subscribe((response:any) => {
        if (response.StatusCode === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Done",
            showConfirmButton: false,
            timer: 500
          });
          return this.router.navigate(['/content/category']);

        }else{

          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "ไม่พบ Account",
          });
        }
      });

      return localStorage.setItem('user', JSON.stringify(this.data));
  }


}
