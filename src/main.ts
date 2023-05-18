import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <pre>
          {{form.value | json}}
      </pre>
      <div style="margin-bottom:10px">
        <label style="margin-right:10px">Header EN</label>
        <input formControlName="headerEN"/>
      </div>
      <div style="margin-bottom:10px">
        <label style="margin-right:10px">Header LA</label>
        <input formControlName="headerLA"/> 
      </div>
      <div style="margin-bottom:10px">
        <label style="margin-right:10px">Header VI</label>
        <input formControlName="headerVI"/> 
      </div>
      <div formArrayName="params">
        <ng-container *ngFor="let item of dataConvert; let i = index">
          <ng-container *ngFor="let control of item">
            <div [formGroupName]="i">
               <label>{{control.label}}</label>
               <input [formControlName]="control.controlName"/>
            </div>
          </ng-container>
        </ng-container>
      </div>
    </form>
  `,
})
export class App {
  name = 'Angular';
  form!: FormGroup;
  dataConvert: any[] = [];
  constructor(private fb: FormBuilder) {
    this.loadForm();
  }
  loadForm() {
    this.form = this.fb.group({
      headerEN: '',
      headerLA: '',
      headerVI: '',
      params: this.fb.array([]),
    });
  }
  ngOnInit() {
    this.dataConvert = this.convertData();
    this.updateFormArray();
  }
  get paramArray() {
    return this.form.controls['params'] as FormArray;
  }
  rowControl() {
    return this.fb.group({});
  }
  convertData() {
    return this.data.map((item) => {
      const res = [];
      const label = this.convertUnderscoresToUppercase(item.paramCode);
      res.push({
        label: `${label} VI`,
        value: item.displayNameVi,
        controlName: 'displayNameVi',
      });
      res.push({
        label: `${label} EN`,
        value: item.displayNameEn,
        controlName: 'displayNameEn',
      });
      res.push({
        label: `${label} LA`,
        value: item.displayNameLa,
        controlName: 'displayNameLa',
      });
      res.push({
        label: `Order`,
        value: item.orderDisplay,
        controlName: 'orderDisplay',
      });
      res.push({
        label: `Type`,
        value: item.type,
        controlName: 'type',
      });
      res.push({
        label: `Column name`,
        value: item.columnName,
        controlName: 'columnName',
      });
      console.log(res);

      return res;
    });
  }

  updateFormArray() {
    this.convertData().forEach((item) => {
      const group = new FormGroup({});
      item.forEach((control) => {
        group.addControl(control.controlName, new FormControl(control.value));
      });
      this.paramArray.push(group);
    });
  }
  data = [
    {
      id: 3215,
      reportId: 62,
      paramCode: 'province_code', // Province Code
      columnName: 'province_code',
      status: 1,
      type: 1,
      displayNameVi: 'Tỉnh',
      displayNameLa: 'ແຂວງ',
      displayNameEn: 'Province',
      orderDisplay: 1,
    },
    {
      id: 3213,
      reportId: 62,
      paramCode: 'from_date',
      columnName: 'from_date',
      status: 1,
      type: 2,
      displayNameVi: 'Từ ngày',
      displayNameLa: 'ແຕ່ວັນທີ',
      displayNameEn: 'From date',
      orderDisplay: 2,
    },
    {
      id: 3214,
      reportId: 62,
      paramCode: 'to_date',
      columnName: 'to_date',
      status: 1,
      type: 2,
      displayNameVi: 'Ðến ngày',
      displayNameLa: 'ເຖີງວັນທີ',
      displayNameEn: 'To date',
      orderDisplay: 3,
    },
  ];

  convertUnderscoresToUppercase(string: string) {
    const words = string.split('_');
    const capitalizedWords = words.map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
  }
}

bootstrapApplication(App);
