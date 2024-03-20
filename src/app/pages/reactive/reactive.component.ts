import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.scss'
})
export class ReactiveComponent implements OnInit {
  formSeba: FormGroup;

  constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef, private validators: ValidatorsService) {
    this.configureForm();
    this.loadData();
    this.createListeners();
  }

  ngOnInit(): void {
  }

  createListeners(){
    this.formSeba.get('name')?.valueChanges.subscribe((data: any) => console.log(data));
  }

  configureForm() {
    this.formSeba = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      surname: ['', [Validators.required, this.validators.notZonta]],
      email: ['', [Validators.required, Validators.pattern("[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?")]],
      user: ['', , this.validators.doesUserExist],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      address: this.formBuilder.group({
        section: ['', Validators.required],
        city: ['', Validators.required]
      }),
      hobbies: this.formBuilder.array([])
    },{
      validators: this.samePasswords('password1', 'password2')
    });
  }

  samePasswords(password1name: string, password2name: string){
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      const pass1 = formGroup.get(password1name)?.value;
      const pass2 = formGroup.get(password2name)?.value;

      if(pass1 !== pass2){
        formGroup.get(password2name)?.setErrors({notEquals: true});
        return {notEquals: true};
      }

      return null;
    };
  }

  loadData() {
    this.formSeba.reset({
      "name": "Sebaa",
      "surname": "Zontaa",
      "email": "seba.zonta@gmail.com",
      "password1": "123",
      "password2": "123",
      "address": {
        "section": "Rosario",
        "city": "VGG"
      }
    });
  }
  addHobby(){
    this.hobby.push(this.formBuilder.control('', Validators.required));
  }

  deleteHobby(i: number){
    this.hobby.removeAt(i);
  }

  public get invalidName(): boolean {
    return this.formSeba.get('name')!.invalid && this.formSeba.get('name')!.touched;
  }

  public get invalidSurname(): boolean {
    return this.formSeba.get('surname')!.invalid && this.formSeba.get('surname')!.touched;
  }

  public get invalidEmail(): boolean {
    return this.formSeba.get('email')!.invalid && this.formSeba.get('email')!.touched;
  }


public get invalidUser() : boolean {
  return this.formSeba.get('user')!.invalid && this.formSeba.get('user')!.touched;
}


  public get invalidSection(): boolean {
    return this.formSeba.get('address.section')!.invalid && this.formSeba.get('address.section')!.touched;
  }

  public get invalidCity(): boolean {
    return this.formSeba.get('address.city')!.invalid && this.formSeba.get('address.city')!.touched;
  }

  public get invalidPass1() : boolean {
    return this.formSeba.get('password1')!.invalid && this.formSeba.get('password1')!.touched;
  }

  public get invalidPass2() : boolean {
    const pass1 = this.formSeba.get('password1')!.value;
    const pass2 = this.formSeba.get('password2')!.value;

    return !(pass1 === pass2);
  }

  public get hobby() : FormArray {
    return this.formSeba.get('hobbies') as FormArray;
  }


  save() {
    if (this.formSeba.invalid) {
      Object.values(this.formSeba.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(subControl => {
            subControl.markAsTouched();
          })
        }
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }

    console.log(this.formSeba.controls);
  }
}
