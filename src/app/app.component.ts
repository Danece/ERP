import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GolbalFunction } from './app.golbal_function';
declare let $:any;

// export interface Item {
//   name: string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  private itemCollection: AngularFirestoreCollection<any>;
  private globalFunction: GolbalFunction;
  items: Observable<any[]>;
  private count = 0;
  isLoading : boolean = true;

  constructor(private afs: AngularFirestore) {
    this.itemCollection = afs.collection<any>('SalesRecord');
    /* { idField: 'eventId' } -> 獲取文檔ID */
    this.items = this.itemCollection.valueChanges({ idField: 'eventId' });
    this.globalFunction = new GolbalFunction;
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    setTimeout(() =>{
      console.log("TEST", "IN");
      this.isLoading = false;
    }, 5000);
  }

  ngOnInit() {
    let data = [];
    data.push(['<input type="checkbox" name="userList" id="userList" value="<%=userName%>" style="margin:0px;">',1,2,3,4,5,6,7]);

    $('#tableResultList').DataTable({
      'data'			: data,
      'columnDefs'	: [
        {
          'targets'		: [0,1,2,3,4,5,6,7],
          'className'	: "text-center",
        }
      ],
      'paging'      	: true,
      'lengthChange'	: true,
      'searching'   	: true,
      'ordering'    	: true,
      'info'        	: true,
      'autoWidth'   	: false,
      "oLanguage"		: {"sUrl":"../exjs/<%=getSessionLanguageFile_ForTableData(session)%>"},
      'order'			: [[ 1, "asc" ]],
      "bJQueryUI"		: true,
      'iDisplayLength': 10,
      'destroy'	  	: true,
      'lengthMenu'	: [10, 25, 50, 100, 500]
    });
  }
}
