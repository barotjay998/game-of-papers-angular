import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PapersService } from '../services/papers.service';
import { saveAs } from 'file-saver'; 
import { Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AgRecRowComponent } from '../ag-rec-row/ag-rec-row.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public paperId: number = 0
  public isRecommend: boolean = false
  public showRecommend: boolean = false
  public toggleRecommendBtnText: string = "Get Recommendations"
  public data: any
  public rowData: any

  constructor(
    private route: ActivatedRoute,
    private paperService: PapersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Snapshot approach
    // let id = parseInt(this.route.snapshot.paramMap.get('id') || '0')
    // this.paperId = id

    // Subscribe approach, this is needed when the component is reused
    // and we need to update the data when the route changes
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id') || '0')
      let isRecommend = params.get('recommend') || 'false'
      this.paperId = id
      this.isRecommend = isRecommend === 'true'
      this.showRecommend = false
      this.loadData()
    });
    
  }

  loadData() {
    this.paperService.getPaper(this.paperId).subscribe ( 
      data => {
        console.log(data); 
        this.data = data;

        data.recommendations = data.recommendations.map((rec: any, index: any) => {
          return {
            ...rec,
            ranking: index + 1
          };
        });

        this.rowData = data.recommendations;
      },
      error => {console.log("Get Paper Error:", error);}
    );
  }

  loadPdf() {
    this.paperService.getPaperPdf(this.paperId).subscribe ( 
      data => {
        const blob = new Blob([data], { type: 'application/pdf' });
        saveAs(blob, `${this.data.title}.pdf`);

        // uncomment the following to open the pdf in a new tab
        // const url = window.URL.createObjectURL(blob);
        // window.open(url);
      },
      error => {console.log("Get Paper Pdf Error:", error);}
    );
  }

  onBack(event: any) {
    this.router.navigate(['/papers'])
  }

  onDownload(event: any) {
    this.loadPdf()
  }

  toggleShowRecommend(event: any){
    this.showRecommend = !this.showRecommend

    if (this.showRecommend) {
      this.toggleRecommendBtnText = "Hide Recommendations"
    } else {
      this.toggleRecommendBtnText = "Get Recommendations"
    }
  }

  columnDefs: ColDef[] = [
    { 
      headerName: 'Similarity Rank',
      field: 'ranking', 
      sortable: true, 
      filter: true,
      flex: 1,
    },
    { 
      headerName: 'Summary',
      field: 'Summary',
      sortable: true, 
      filter: true,
      flex: 6,
      resizable: true,
      cellRenderer: AgRecRowComponent,
      autoHeight: true,
      cellStyle: { 
        'white-space': 'normal', 
        'word-wrap': 'break-word' 
      }
    }
  ];
  
  gridOptions: GridOptions = {
    // other grid options...
    suppressMenuHide: true
  };

}
