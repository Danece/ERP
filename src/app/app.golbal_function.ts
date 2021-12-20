import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class GolbalFunction {
  checkoutRequiredValue(input: string): boolean {
    let result: boolean = false;

    if ("" != input) result = true;

    return result;
  }
}
