import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
  providers: [CountryService]
})
export class TemplateComponent {
  user: any = {
    name: 'Sebastian',
    surname: 'Zonta',
    email: 'seba.zonta@gmail.com',
    country: 'ARG',
    gender: 'M'
  };

  countries: any[] = [];

  constructor(private countryService: CountryService){
    this.countryService.getCountries().subscribe(data => {
      this.countries.unshift({
        name: '[Choose a country]',
        code: ''
      });
      this.countries = data;
    })
  }

  save(form: NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        if(control.invalid){
          control.markAsTouched();
        }
      });

    }
    console.log(form.controls);
  }
}
