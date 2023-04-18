import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ag-rec-row',
  templateUrl: './ag-rec-row.component.html',
  styleUrls: ['./ag-rec-row.component.css']
})
export class AgRecRowComponent implements OnInit, ICellRendererAngularComp {

  public isShowMore: boolean = false;

  public params: any;
  
  constructor(
    private router: Router,
    ) { }

  agInit(params: any): void {
    this.params = params;

    // data of the row
    // console.log(params.data)
  }

  ngOnInit(): void {
  }
 
  refresh(params: any): boolean {
    return false;
  }

  onView( params: any ) {    
    this.router.navigate(['/papers', this.params.data.id])
  }

  onShowMore( params: any ) {
    this.isShowMore = !this.isShowMore;
  }

}
