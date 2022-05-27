import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
declare let $:any;

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.css']
})
export class MyProjectComponent implements OnInit {
  private itemCollection_project !: AngularFirestoreCollection<any>;
  items_project !: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.itemCollection_project = afs.collection<any>('Project');
    /* { idField: 'eventId' } -> 獲取文檔ID */
    this.items_project = this.itemCollection_project.valueChanges({ idField: 'eventId' });
  }

  ngOnInit(): void {
  }

}
