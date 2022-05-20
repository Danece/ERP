import { Component, AfterViewInit } from '@angular/core';
// import * as Chart from 'chart.js';
import Chart from 'chart.js/auto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { GolbalFunction } from '../app.golbal_function';
import { async } from '@firebase/util';
declare let $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  private itemCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  private itemCollection_experience: AngularFirestoreCollection<any>;
  items_experience: Observable<any>;
  canvas: any;
  ctx: any;
  name !: string;
  sex !: string;
  birthday !: string;
  education !: string;
  introduce !: string;

  constructor(private afs: AngularFirestore) {
    this.itemCollection = afs.collection<any>('Personal');
    /* { idField: 'eventId' } -> 獲取文檔ID */
    this.items = this.itemCollection.valueChanges({ idField: 'eventId' });

    this.itemCollection_experience = afs.collection<any>('WorkExperience', ref => ref.orderBy("Index", "asc"));
    /* { idField: 'eventId' } -> 獲取文檔ID */
    this.items_experience = this.itemCollection_experience.valueChanges({ idField: 'eventId' });
 }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  ngAfterViewInit() {
    // 基本個資
    this.items.subscribe(data => {
      let personalInfo = data[0];
      this.name = personalInfo.Name;
      this.sex = personalInfo.Sex;
      this.birthday = personalInfo.Birthday;
      this.education = personalInfo.Education;
      this.introduce = personalInfo.Introduce;
    });

    // 年資曲線圖
    this.canvas = document.getElementById('myChart');

    this.ctx = this.canvas.getContext('2d');

    const labels: any[] = [];
    let seniority: any[] = [];
    this.items_experience.subscribe(data => {
      for (let i=0; i<data.length; i++) {
        let experienceInfo = data[i]
        labels.push(experienceInfo.Company);
        seniority.push(experienceInfo.Seniority);
      }

    });

    const data = {
      labels: labels,
      datasets: [{
        label: '工作經歷(月)',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: seniority,
      }]
    };

    setTimeout(() =>{
      const myChart = new Chart(
        this.ctx,{
          type: 'line',
          data: data,
          options: {}
        }
      );
    }, 1500);
  }

}

