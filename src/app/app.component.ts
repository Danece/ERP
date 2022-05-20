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
  // items : Observable<any[]>;
  // constructor(firestore: AngularFirestore) {
  //   this.items = firestore.collection('SalesRecord').valueChanges();
  // }
  private itemCollection: AngularFirestoreCollection<any>;
  private globalFunction: GolbalFunction;
  items: Observable<any[]>;
  private count = 0;

  constructor(private afs: AngularFirestore) {
    this.itemCollection = afs.collection<any>('SalesRecord');
    /* { idField: 'eventId' } -> 獲取文檔ID */
    this.items = this.itemCollection.valueChanges({ idField: 'eventId' });
    this.globalFunction = new GolbalFunction;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    console.log("IN");
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


  addItem(name: string, customer: string, cost: string, Receive: string, remark: string): boolean {
    console.log("result", this.globalFunction.checkoutRequiredValue(name));
    if (!this.globalFunction.checkoutRequiredValue(name) || !this.globalFunction.checkoutRequiredValue(customer)) {
      var form = document.getElementById('addfm');
      if (null != form) form.classList.add('was-validated');
      return false;
    }
    let item = {
      Operator: name,
      Customer: customer,
      Cost: Number(cost),
      Receive: Number(Receive),
      Remark: remark,
      Date: new Date()
    };
    this.itemCollection.add(item);

    var modalBackdrops = document.querySelectorAll('.modal-backdrop');
    Array.prototype.slice.call(modalBackdrops)
    .forEach(function (modalBackdrop) {
      modalBackdrop.remove();
    })
    $('#addModal').modal('hide');

    return true;
  }

  deleteItem(ID: string) {
    this.itemCollection.doc(ID).delete();
  }

}
