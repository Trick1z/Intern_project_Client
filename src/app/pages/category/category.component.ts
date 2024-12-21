import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [HttpClientModule, NgIf, CommonModule],
})
export class CategoryComponent implements OnInit {
  linkage_path: string[] = ['/content/linkages', '/content/other'];
  other_path: string[] = ['/content/web'];
  _mainData: any = {};

  showLinkages = false;
  showOther = false;
  showAll = true;

  // showCategory = true;

  temp: any;
  data: any;
  linkage_count: any = {};
  other_count: any = {};
  title_User: any = 'no user';

  goToLinkageUrl(getNums: number) {
    return this.router.navigate([this.linkage_path[getNums]]);
  }
  goToOtherUrl(getNums: number) {
    return this.router.navigate([this.other_path[getNums]]);
  }

  logout() {
    localStorage.clear();
    return this.router.navigate(['/test']);
  }

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getCategory();

    this.getLinkageData();
    this.getOtherData();
    this.getLinkageCount();
    this.getOtherCount();

    if (localStorage.getItem('user')) {
      this.temp = localStorage.getItem('user');
      this.data = JSON.parse(this.temp);

      this.title_User = this.data.userName;
    }
  }

  getCategory() {
    this.http
      .get('http://localhost:52169/api/NewAdd/main')
      .subscribe((data) => {
        this._mainData = data;
        console.log('get data => ', this._mainData);
      });
  }

  onShowLinkages() {
    this.showLinkages = true;
    this.showOther = false;
    this.showAll = false;
  }
  onShowOther() {
    this.showLinkages = false;
    this.showOther = true;
    this.showAll = false;
  }
  onShowAll() {
    this.showLinkages = false;
    this.showOther = false;
    this.showAll = true;
  }

  linkage = 0;
  other = 0;

  getLinkageCount() {
    this.http
      .get('http://localhost:52169/api/NewAdd/linkageCount')
      .subscribe((data) => {
        this.linkage_count = data;
        this.linkage = this.linkage_count.Value[0].COUNT;
      });
  }

  getOtherCount() {
    this.http
      .get('http://localhost:52169/api/NewAdd/otherCount')
      .subscribe((data) => {
        this.other_count = data;
        this.other = this.other_count.Value[0].COUNT;
      });
  }

  linkageData: any = {};
  otherData: any = {};

  getLinkageData() {
    this.http
      .get(`http://localhost:52169/api/NewAdd/main/category/1`)
      .subscribe((res) => {
        this.linkageData = res;
      });
  }

  getOtherData() {
    this.http
      .get(`http://localhost:52169/api/NewAdd/main/category/2`)
      .subscribe((res) => {
        this.otherData = res;
      });
  }
}
