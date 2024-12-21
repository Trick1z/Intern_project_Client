import { Component } from '@angular/core';
import {
  DevExtremeModule,
  DxButtonModule,
  DxDataGridModule,
  DxFileUploaderModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextAreaModule,
} from 'devextreme-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ColDirective,
  InputGroupComponent,
  InputGroupTextDirective,
} from '@coreui/angular';
import dxTextArea from 'devextreme/ui/text_area';
import Swal from 'sweetalert2';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    DxTextAreaModule,
    DxFormModule,
    DxPopupModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormControlDirective,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ColDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    DxButtonModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxFileUploaderModule,
    HttpClientModule,
  ],
})
export class LayoutComponent {
  popup = false;
  popupDetail = false;
  temp: any = {};
  JsonData: any = [];

  // tempJson:any = JSON.parse(this.JsonData.body)

  height = { height: 150 };

  titleData = {
    title: '',
    title_description: '',
    sub_title: '',
    method: '',
    url: '',
    sub_title_description: '',
  };

  popupData = {
    parameter_name: '',
    required_status: '',
    type: 'String',
    parameter_description: '',
  };

  popupDataDetail = {
    parameter_name: '',
    parameter_description: '',
  };

  _popupDataArr: any[] = [];
  _popupDataDetailArr: any[] = [];

  _required = ['required', 'not required'];
  _method = ['GET', 'POST', 'PUT', 'DELETE'];

  constructor(private http: HttpClient) {}
  // private http : HttpClient

  showPopup() {
    this.popup = true;
  }

  showPopupDetail() {
    this.popupDetail = true;
  }

  onSubmit() {}
  onSubmitPopup() {
    this._popupDataArr.push(this.popupData);
    this.popupData = {
      parameter_name: '',
      required_status: '',
      type: 'String',
      parameter_description: '',
    };

    return (this.popup = false);
  }

  onSubmitPopupDetail() {
    this._popupDataDetailArr.push(this.popupDataDetail);
    this.popupDataDetail = {
      parameter_name: '',
      parameter_description: '',
    };

    return (this.popupDetail = false);
  }

  onSubmitPopupClose() {
    this.popupData = {
      parameter_name: '',
      required_status: '',
      type: 'String',
      parameter_description: '',
    };

    return (this.popup = false);
  }

  onSubmitPopupDetailClose() {
    this.popupDataDetail = {
      parameter_name: '',
      parameter_description: '',
    };

    return (this.popupDetail = false);
  }

  // sendData() {

  //   this.temp = {
  //     Header : this._data,
  //     ParameterDetail : this._popupDataArr,
  //     Detail : this._popupDataDetailArr
  //   }

  //   console.log('sendWork : ' , JSON.stringify(this.temp));

  //   return localStorage.setItem('api' , JSON.stringify(this.temp));

  // }


  clearForm(){
    this.titleData = {
      title: '',
      title_description: '',
      sub_title: '',
      method: '',
      url: '',
      sub_title_description: '',
    };

    this.popupData = {
      parameter_name: '',
      required_status: '',
      type: 'String',
      parameter_description: '',
    };

    this.popupDataDetail = {
      parameter_name: '',
      parameter_description: '',
    };
    this.JsonData = [];
    this._popupDataArr = [];
    this._popupDataDetailArr = [];

  }

  sendData() {
    Swal.fire({
      title: 'ส่งข้อมูลหรือไม่ ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'ส่งข้อมูล',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.temp = {
          Title: this.titleData,
          ParameterDetail: this._popupDataArr,
          Detail: this._popupDataDetailArr,
          Json: {
            JSON: this.JsonData.body,
          },
        };

        console.log('temp :', this.temp);

        // console.log('sendWork : ', JSON.stringify(this.temp));

        // localStorage.setItem('api', JSON.stringify(this.temp));
        this.http.post('http://localhost:52169/api/AddData', this.temp).subscribe(res => console.log(res)
        )

        return this.clearForm(), Swal.fire('เสร็จสิ้น', '', 'success');
      }

      return;
    });
  }
}
