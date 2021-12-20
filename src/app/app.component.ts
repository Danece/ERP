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
