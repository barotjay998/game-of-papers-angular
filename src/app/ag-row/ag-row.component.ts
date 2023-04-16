import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-row',
  templateUrl: './ag-row.component.html',
  styleUrls: ['./ag-row.component.css']
})
export class AgRowComponent implements OnInit, ICellRendererAngularComp {

  params: any;

  constructor() { }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  btnClickedHandler(event: any) {
    // this.params.clicked(this.params.value);
    alert(`${this.params.value}`);
  }

}
