import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import dxDataGrid from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-linkages',
  templateUrl: './linkages.component.html',
  styleUrls: ['./linkages.component.scss'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, DxDataGridModule, CommonModule],
})
export class LinkagesComponent implements OnInit {
  _mainData: any = {};
  _titleData: any = {};
  _contentID = [12, 13, 14];
  _display: any = [];
  dataTemp: any = {};
  title_User = 'no user';
  Title_Name = '';
  Title_Des = '';

  temp: any;
  data: any;

  target_content: string[] = [
    'target-content_0',
    'target-content_1',
    'target-content_2',
    'target-content_3',
    'target-content_99',
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getTitle();
    this.getData();
    this.getJsonData();
    // this.getApiDetail();

    if (localStorage.getItem('user')) {
      this.temp = localStorage.getItem('user');
      this.data = JSON.parse(this.temp);

      this.title_User = this.data.userName;
    }
  }

  logout() {
    localStorage.clear();

    return this.router.navigate(['/test']);
  }

  getTitle() {
    this.http
      .get('http://localhost:52169/api/NewAdd/main')
      .subscribe((data) => {
        console.log('title get', data);
        this._titleData = data;

        this.Title_Name = this._titleData.Value[0].TITLE;
        this.Title_Des = this._titleData.Value[0].TITLE_DESCRIPTION;
      });
  }

  getData() {
    this.http
      .get('http://localhost:52169/api/NewAdd/subMain/2')
      .subscribe((data) => {
        console.log('sub get', data);
        this._mainData = data;
        return this.getApiDetail();
      });
  }
  json: any = {};
  jsonText: any = [];

  getApiDetail() {
    for (let i = 0; i < this._mainData.Value.length; i++) {
      var id = this._mainData.Value[i].TITLE_ID;

      this.http
        .get(`http://localhost:52169/api/NewAdd/apiData/${id}`)
        .subscribe((temp) => {
          this._display.push(temp);
          // console.log('display', this._display)
        });

      this.http
        .get(`http://localhost:52169/api/NewAdd/jsonData/${id}`)
        .subscribe((data) => {
          this.jsonText.push(data);
          console.log('json ', this.jsonText)
        });
    }
  }

  getJsonData() {
    for (let i = 0; i < this._mainData.Value.length; i++) {
      var id = this._mainData.Value[i].TITLE_ID;
    }
  }

  // _getParamDisplay() {
  //   var _data = [];
  //   var dp = 0;

  //   for (let j = 0; j < this._contentID.length; j++) {
  //     for (let i = 0; i < this._mainData.Value.length; i++) {
  //       if (this._mainData.Value[i].MAIN_ID === this._contentID[j]) {
  //         _data.push(this._mainData.Value[i]);
  //       }
  //     }

  //     this._display[dp] = _data;
  //     dp += 1;

  //     _data = [];
  //   }
  // }

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
}
