import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,  FormsModule, BrowserAnimationsModule, ToastrModule.forRoot(),
        ReactiveFormsModule,TranslateModule.forRoot()
],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should render Login Form in a h2 tag'`, async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Login Form');
  }));
  it('should show a validation error if the first name was touched but left empty', () => {
    let firstNameValidationError: DebugElement;

    fixture.detectChanges(); // run change detection
    firstNameValidationError = fixture.debugElement.query(By.css('.invalid-feedback'));

    // the validation error should be found:
    expect(firstNameValidationError).toBeTruthy();
  });

  it('submitting a form emits a user', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("admin");
    component.loginForm.controls['password'].setValue("admin");
    expect(component.loginForm.valid).toBeTruthy();


    // Trigger the login function
    component.submitLoginForm();
});
});
