import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GolbalFunction } from '../app.golbal_function';
declare let $:any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private itemCollection_experience: AngularFirestoreCollection<any>;
  items_experience: Observable<any[]>;
  private itemCollection_personal: AngularFirestoreCollection<any>;
  items_personal: Observable<any[]>;
  selectedID !: string;
  password !: string;
  pwdInput !: string;
  pwdInputErrorMsg !: string;
  private globalFunction: GolbalFunction = new GolbalFunction;
  maxIndex !: number;
  operation !: string;

  constructor(private afs: AngularFirestore) {
    this.itemCollection_experience = afs.collection<any>('WorkExperience', ref => ref.orderBy("Index", "asc"));
    /* { idField: 'eventId' } -> 獲取文檔ID */
    this.items_experience = this.itemCollection_experience.valueChanges({ idField: 'eventId' });
    this.itemCollection_personal = afs.collection<any>('Personal');
    /* { idField: 'eventId' } -> 獲取文檔ID */
    this.items_personal = this.itemCollection_personal.valueChanges({ idField: 'eventId' });
 }

  ngOnInit(): void {
    this.items_personal.subscribe(data => {
      let personalInfo = data[0];
      this.password = personalInfo.Password;
    });
    this.items_experience.subscribe(data => {
      this.maxIndex = data.length;
    });
  }

  changeOperationInfo(obj: string, operation: string) {
    this.selectedID = obj;
    this.operation = operation;
  }

  checkoutPwd() {
    if (this.password == this.pwdInput) {
      // 清除半透明背景
      var modalBackdrops = document.querySelectorAll('.modal-backdrop');
      Array.prototype.slice.call(modalBackdrops)
      .forEach(function (modalBackdrop) {
        modalBackdrop.remove();
      })
      $('#pwdCheckModal').modal('hide');

      switch (this.operation) {
        case 'create':
          $('#addModal').modal('show');
          break;
        case 'delete':
          $('#deleteModal').modal('show');
          break;
        case 'modify':
          $('#modifyModal').modal('show');
          break;
      }
      this.pwdInput = "";
    } else {
      this.pwdInputErrorMsg = "密碼錯誤";
    }
  }

  addItem(company: string, work: string, learn: string, seniority: string, project: string, reasonForLeaving: string): boolean {
    if (!this.globalFunction.checkoutRequiredValue(company)
     || !this.globalFunction.checkoutRequiredValue(work)
     || !this.globalFunction.checkoutRequiredValue(learn)
     || !this.globalFunction.checkoutRequiredValue(seniority)
     || !this.globalFunction.checkoutRequiredValue(project)
     || !this.globalFunction.checkoutRequiredValue(reasonForLeaving)
     ) {
      var form = document.getElementById('addfm');
      if (null != form) form.classList.add('was-validated');
      return false;
    }
    let item = {
      Index: String(this.maxIndex),
      Company: company,
      Work: work,
      Learn: learn,
      Seniority: Number(seniority),
      Project: project,
      ReasonForLeaving: reasonForLeaving
    };

    // 清除半透明背景
    var modalBackdrops = document.querySelectorAll('.modal-backdrop');
    Array.prototype.slice.call(modalBackdrops)
    .forEach(function (modalBackdrop) {
      modalBackdrop.remove();
    })
    $('#addModal').modal('hide');

    return true;
  }

  modifyItem(company: string, work: string, learn: string, seniority: string, project: string, reasonForLeaving: string): boolean {
    if (!this.globalFunction.checkoutRequiredValue(company)
     || !this.globalFunction.checkoutRequiredValue(work)
     || !this.globalFunction.checkoutRequiredValue(learn)
     || !this.globalFunction.checkoutRequiredValue(seniority)
     || !this.globalFunction.checkoutRequiredValue(project)
     || !this.globalFunction.checkoutRequiredValue(reasonForLeaving)
     ) {
      var form = document.getElementById('modifyfm');
      if (null != form) form.classList.add('was-validated');
      return false;
    }
    let item = {
      Company: company,
      Work: work,
      Learn: learn,
      Seniority: Number(seniority),
      Project: project,
      ReasonForLeaving: reasonForLeaving
    };

    this.itemCollection_experience.doc(this.selectedID).update(item);

    // 清除半透明背景
    var modalBackdrops = document.querySelectorAll('.modal-backdrop');
    Array.prototype.slice.call(modalBackdrops)
    .forEach(function (modalBackdrop) {
      modalBackdrop.remove();
    })
    $('#modifyModal').modal('hide');

    return true;
  }


  deleteItem() {
      this.itemCollection_experience.doc(this.selectedID).delete();
      // 清除半透明背景
      var modalBackdrops = document.querySelectorAll('.modal-backdrop');
      Array.prototype.slice.call(modalBackdrops)
      .forEach(function (modalBackdrop) {
        modalBackdrop.remove();
      })
      $('#deleteModal').modal('hide');
  }
}
