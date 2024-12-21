import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';

@Component({
    selector: 'app-validation',
    templateUrl: './validation.component.html',
    styleUrls: ['./validation.component.scss'],
    standalone: true,
    imports: [DxDataGridModule,DxFormModule,RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective]
})
export class ValidationComponent implements OnInit {

  temp:any = localStorage.getItem('api')
  _data:any = JSON.parse(this.temp);


  ApiTitle:any = this._data.Title
  ApiTitleBody:any = this._data.TitleBody
  ApiParameter:any = this._data.ParameterDetail
  ApiDetail:any = this._data.Detail
  ApiJson:any = JSON.stringify(this._data.Json,null,2)





  Title = this._data.Title.title;
  title_description = this._data.Title.description;

  constructor() { }

  ngOnInit(): void {


  }



}
