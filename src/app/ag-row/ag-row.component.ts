import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ag-row',
  templateUrl: './ag-row.component.html',
  styleUrls: ['./ag-row.component.css']
})
export class AgRowComponent implements OnInit, ICellRendererAngularComp {

  params: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;

    // data of the row
    // console.log(params.data)
  }

  refresh(params: any): boolean {
    return false;
  }

  btnClickedHandler(event: any) {
    // this.params.clicked(this.params.value);
    alert(`${this.params.value}`);
  }

  onView( params: any ) {
    this.router.navigate(['/papers', this.params.data.id])
  }

  onRecommend( params: any ) {
    this.router.navigate(['/papers', this.params.data.id, {recommend: true}])
  }

}
