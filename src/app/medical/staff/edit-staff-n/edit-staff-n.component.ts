/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../service/staff.service';

@Component({
  selector: 'app-edit-staff-n',
  templateUrl: './edit-staff-n.component.html',
  styleUrls: ['./edit-staff-n.component.scss'],
})
export class EditStaffNComponent {
  public selectedValue!: string;
  public name: string = '';
  public surname: string = '';
  public mobile: string = '';
  public email: string = '';
  public password: string = '';
  public password_confirmation: string = '';
  public birth_date: string = '';
  public gender: number = 1;
  public education: string = '';
  public designation: string = '';
  public address: string = '';

  public roles: any = [];

  public FILE_AVATAR: any;
  public IMAGEN_PREVIZUALIZA: any = 'assets/img/user-06.jpg';

  public text_success: string = '';
  public text_validation: string = '';

  public staff_id: any;
  public staff_selected: any;

  constructor(
    public staffService: StaffService,
    public activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activedRoute.params.subscribe((resp: any) => {
      console.log(resp);
      this.staff_id = resp.id;
    });

    this.staffService.showUser(this.staff_id).subscribe((resp: any) => {
      console.log(resp);
      this.staff_selected = resp.user;

      this.selectedValue = this.staff_selected.role.id;
      this.name = this.staff_selected.name;
      this.surname = this.staff_selected.surname;
      this.mobile = this.staff_selected.mobile;
      this.email = this.staff_selected.email;
      this.birth_date = new Date(this.staff_selected.birth_date).toISOString();
      this.gender = this.staff_selected.gender;
      this.education = this.staff_selected.education;
      this.designation = this.staff_selected.designation;
      this.address = this.staff_selected.address;
      this.IMAGEN_PREVIZUALIZA = this.staff_selected.avatar;
    });

    this.staffService.listConfig().subscribe((resp: any) => {
      console.log(resp);
      this.roles = resp.roles;
    });
  }

  save() {
    this.text_validation = '';
    if (!this.name || !this.surname || !this.email) {
      this.text_validation = 'Los campos * son obligatorios.';
      return;
    }
    if (this.password) {
      if (this.password != this.password_confirmation) {
        this.text_validation = 'Las contraseñas no coinciden.';
        return;
      }
    }
    console.log(this.selectedValue);
    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('email', this.email);
    formData.append('mobile', this.mobile);
    formData.append('birth_date', this.birth_date);
    formData.append('gender', this.gender + '');
    if (this.education) {
      formData.append('education', this.education);
    }
    if (this.designation) {
      formData.append('designation', this.designation);
    }
    if (this.address) {
      formData.append('address', this.address);
    }
    if (this.password) {
      formData.append('password', this.password);
    }
    formData.append('role_id', this.selectedValue);
    if (this.FILE_AVATAR) {
      formData.append('imagen', this.FILE_AVATAR);
    }

    this.staffService
      .updateUser(this.staff_id, formData)
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.message == 403) {
          this.text_validation = resp.message_text;
        } else {
          this.text_success = 'El usuario se ha editado correctamente.';
        }
      });
  }

  loadFile($event: any) {
    if ($event.target.files[0].type.indexOf('image') < 0) {
      // alert('Solamente pueden ser archivos de tipo imagen.');
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen.';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => (this.IMAGEN_PREVIZUALIZA = reader.result);
  }
}
