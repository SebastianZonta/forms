import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  notZonta(control: FormControl): ErrorValidate | null {
    if (control.value.toLowerCase() === "zonta") {
      return {
        notZonta: true
      }
    }

    return null;
  }

  doesUserExist(control: FormControl){
    if (!control.value) {
      return Promise.resolve({exists: false});
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          console.log("es strider el user");
          resolve({ exists: true });
        } else {
          resolve(null);
          console.log("No es strider el user");
        }
      }, 3500);
    })
  }
}
