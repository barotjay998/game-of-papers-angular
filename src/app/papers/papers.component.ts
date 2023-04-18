import { Component, OnInit, ViewChild } from '@angular/core';
import { PapersService } from '../services/papers.service';
import { error } from 'console';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgRowComponent } from '../ag-row/ag-row.component';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit {

  public itemsPerPage = 20;
  public pageSizeTo = 20;
  public pageSizeFrom = 0;

  constructor(
    private paperService: PapersService,
    private router: Router
    ) { }

  columnDefs: ColDef[] = [
    {
      headerName: 'Conference',
      field: 'conference', 
      sortable: true, 
      filter: true,
      flex: 2,
      resizable: true,
      cellRenderer: (params: any) => {
        return `<div class="font-consolas text-center" style="font-size: large">${params.value}</div>`;
      },
    },
    { 
      headerName: 'Title',
      field: 'title', 
      sortable: true, 
      filter: true,
      flex: 8,
      resizable: true,
      cellRenderer: AgRowComponent,
      // Pass additional parameters to the cellRenderer
      // cellRendererParams: {arg1: "val1"},
      autoHeight: true
    }
  ];

  defaultColDef = {
    sortable: true, filter: true
  };

  gridOptions: GridOptions = {
    // other grid options...
    suppressMenuHide: true
  };
  
  rowData = []

  ngOnInit(): void {
    this.loadPapers();

  }

  loadPapers(from: number = 0, to: number = 20, ) {
    this.paperService.getPapers(from, to - 1).subscribe ( 
      data => {this.rowData = data;},
      error => {console.log("Get Papers Error:", error);}
    );
  }

  onNext() {
    this.pageSizeFrom += this.itemsPerPage
    this.pageSizeTo += this.itemsPerPage
    this.loadPapers(this.pageSizeFrom, this.pageSizeTo);
  }

  onPrevious() {

    // Prevent negative page size
    if (this.pageSizeFrom - this.itemsPerPage < 0) {
      this.pageSizeFrom = 0;
      this.pageSizeTo = this.itemsPerPage;
      this.loadPapers(this.pageSizeFrom, this.pageSizeTo);
      return;

    } else {
      this.pageSizeTo -= this.itemsPerPage
      this.pageSizeFrom -= this.itemsPerPage
      this.loadPapers(this.pageSizeFrom, this.pageSizeTo);
    }

  }

  onChange() {
    this.pageSizeTo = this.pageSizeFrom + this.itemsPerPage;
    this.loadPapers(this.pageSizeFrom, this.pageSizeTo);
    // do something with the new value
  }

  onHome() {
    this.router.navigate(['/']);
  }

}
