import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GolbalFunction } from '../app.golbal_function';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private itemCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.itemCollection = afs.collection<any>('SalesRecord');
    // this.itemCollection = afs.collection<any>('SalesRecord', ref => ref.where('Customer', '==', 'Egg Company'));
    /* { idField: 'eventId' } -> 獲取文檔ID */
    this.items = this.itemCollection.valueChanges({ idField: 'eventId' });
 }

  ngOnInit(): void {
  }

  deleteItem(ID: string) {
    this.itemCollection.doc(ID).delete();
  }
}
