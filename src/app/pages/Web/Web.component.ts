import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';

@Component({
  selector: 'app-other',
  templateUrl: './Web.component.html',
  styleUrls: ['./Web.component.css'],
  standalone: true,
  imports: [HttpClientModule, DxDataGridModule, FormsModule,CommonModule,NgFor ],
})
export class WebComponent implements OnInit {
  title_User = 'no user';
  temp: any;
  data: any;
  dataID = 65;

  target_content: string[] = [
    'target-content_0',
    'target-content_1'
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.temp = localStorage.getItem('user');
      this.data = JSON.parse(this.temp);

      this.title_User = this.data.userName;
    }

    this.getSub();
  }

  logout() {
    localStorage.clear();

    return this.router.navigate(['/test']);
  }

  scrollToTarget(getContent: number) {
    const targetElement = document.getElementById(
      this.target_content[getContent]
    );

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop() {
    var top = '';
    const targetElement = document.getElementById((top = 'target-top'));

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  subTitleData: any = {};

  getSub() {
    this.http
      .get(`http://localhost:52169/api/NewAdd/subMain/${this.dataID}`)
      .subscribe((res) => {

        console.log('get sub : ',res);
        this.subTitleData = res;

         this.getJson();
         this.getMeta();

      });

  }


  jsonData:any = []
  getJson(){
    for (let i = 0; i < this.subTitleData.Value.length; i++) {
      var _id = this.subTitleData.Value[i].TITLE_ID;

        this.http.get(`http://localhost:52169/api/NewAdd/jsonData/${_id}`).subscribe((res)=>{
          this.jsonData.push(res);
        });
    }
  }


  metaData :any =[]

  getMeta(){
    for (let i = 0; i < this.subTitleData.Value.length; i++) {
      var _id = this.subTitleData.Value[i].TITLE_ID;

      this.http.get(`http://localhost:52169/api/NewAdd/metaData/${_id}`).subscribe((res)=>{
        this.metaData.push(res);
      });
    }
  }



}

