/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss'],
})
export class EditDoctorComponent {
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

  public specialitie_id: any;
  public specialities: any = [];

  public text_success: string = '';
  public text_validation: string = '';

  public days_week = [
    {
      day: 'Lunes',
      class: 'table-primary',
    },
    {
      day: 'Martes',
      class: 'table-secondary',
    },
    {
      day: 'Miercoles',
      class: 'table-success',
    },
    {
      day: 'Jueves',
      class: 'table-warning',
    },
    {
      day: 'Viernes',
      class: 'table-info',
    },
  ];

  public hours_days: any = [];
  public hours_selecteds: any = [];
  public doctor_id: any;
  public doctor_selected: any;

  constructor(
    public doctorsService: DoctorService,
    public activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activedRoute.params.subscribe((resp: any) => {
      console.log(resp);
      this.doctor_id = resp.id;
    });

    this.doctorsService.listConfig().subscribe((resp: any) => {
      console.log(resp);
      this.roles = resp.roles;
      this.specialities = resp.specialities;
      this.hours_days = resp.hours_days;

      this.doctorsService.showDoctor(this.doctor_id).subscribe((resp: any) => {
        console.log(resp);
        this.doctor_selected = resp.doctor;

        this.selectedValue = this.doctor_selected.role.id;
        this.specialitie_id = this.doctor_selected.specialitie.id;
        this.name = this.doctor_selected.name;
        this.surname = this.doctor_selected.surname;
        this.mobile = this.doctor_selected.mobile;
        this.email = this.doctor_selected.email;
        this.birth_date = new Date(
          this.doctor_selected.birth_date
        ).toISOString();
        this.gender = this.doctor_selected.gender;
        this.education = this.doctor_selected.education;
        this.designation = this.doctor_selected.designation;
        this.address = this.doctor_selected.address;
        this.IMAGEN_PREVIZUALIZA = this.doctor_selected.avatar;
        this.hours_selecteds = this.doctor_selected.schedule_selecteds;
      });
    });
  }

  save() {
    this.text_validation = '';
    if (!this.name || !this.email || !this.surname) {
      this.text_validation = 'Los campos * son obligatorios.';
      return;
    }

    if (this.password) {
      if (this.password != this.password_confirmation) {
        this.text_validation = 'Las contraseñas no coinciden.';
        return;
      }
    }

    if (this.hours_selecteds.length == 0) {
      this.text_validation = 'Necesitas seleccionar un horario al menos.';
      return;
    }
    console.log(this.selectedValue);

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('email', this.email);
    formData.append('mobile', this.mobile);
    formData.append('birth_date', this.birth_date);
    formData.append('gender', this.gender + '');
    formData.append('role_id', this.selectedValue);
    formData.append('specialitie_id', this.specialitie_id);
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

    if (this.FILE_AVATAR) {
      formData.append('imagen', this.FILE_AVATAR);
    }

    const HOUR_SCHEDULES: any = [];

    this.days_week.forEach((day: any) => {
      const DAYS_HOURS = this.hours_selecteds.filter(
        (hour_select: any) => hour_select.day_name == day.day
      );
      HOUR_SCHEDULES.push({
        day_name: day.day,
        children: DAYS_HOURS,
      });
    });

    formData.append('schedule_hours', JSON.stringify(HOUR_SCHEDULES));
    this.doctorsService
      .updateDoctor(this.doctor_id, formData)
      .subscribe((resp: any) => {
        console.log(resp);

        if (resp.message == 403) {
          this.text_validation = resp.message_text;
        } else {
          this.text_success = 'El usuario ha sido editado correctamente';
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

  addHourItem(hours_day: any, day: any, item: any) {
    const INDEX = this.hours_selecteds.findIndex(
      (hour: any) =>
        hour.day_name == day.day &&
        hour.hour == hours_day.hour &&
        hour.item.hour_start == item.hour_start &&
        hour.item.hour_end == item.hour_end
    );
    if (INDEX != -1) {
      this.hours_selecteds.splice(INDEX, 1);
    } else {
      this.hours_selecteds.push({
        day: day,
        day_name: day.day,
        hours_day: hours_day,
        hour: hours_day.hour,
        grupo: 'none',
        item: item,
      });
    }
    console.log(this.hours_selecteds);
  }

  addHourAll(hours_day: any, day: any) {
    const INDEX = this.hours_selecteds.findIndex(
      (hour: any) =>
        hour.day_name == day.day &&
        hour.hour == hours_day.hour &&
        hour.grupo == 'all'
    );
    const COUNT_SELECTED = this.hours_selecteds.filter(
      (hour: any) => hour.day_name == day.day && hour.hour == hours_day.hour
    ).length;
    if (INDEX != -1 && COUNT_SELECTED == hours_day.items.length) {
      hours_day.items.forEach((item: any) => {
        const INDEX = this.hours_selecteds.findIndex(
          (hour: any) =>
            hour.day_name == day.day &&
            hour.hour == hours_day.hour &&
            hour.item.hour_start == item.hour_start &&
            hour.item.hour_end == item.hour_end
        );
        if (INDEX != -1) {
          this.hours_selecteds.splice(INDEX, 1);
        }
      });
    } else {
      hours_day.items.forEach((item: any) => {
        const INDEX = this.hours_selecteds.findIndex(
          (hour: any) =>
            hour.day_name == day.day &&
            hour.hour == hours_day.hour &&
            hour.item.hour_start == item.hour_start &&
            hour.item.hour_end == item.hour_end
        );
        if (INDEX != -1) {
          this.hours_selecteds.splice(INDEX, 1);
        }
        this.hours_selecteds.push({
          day: day,
          day_name: day.day,
          hours_day: hours_day,
          hour: hours_day.hour,
          grupo: 'all',
          item: item,
        });
      });
    }
    console.log(this.hours_selecteds);
  }

  addHourAllDay($event: any, hours_day: any) {
    const INDEX = this.hours_selecteds.findIndex(
      (hour: any) => hour.hour == hours_day.hour
    );
    if (INDEX != -1 && !$event.currentTarget.checked) {
      this.days_week.forEach((day) => {
        hours_day.items.forEach((item: any) => {
          const INDEX = this.hours_selecteds.findIndex(
            (hour: any) =>
              hour.day_name == day.day &&
              hour.hour == hours_day.hour &&
              hour.item.hour_start == item.hour_start &&
              hour.item.hour_end == item.hour_end
          );
          if (INDEX != -1) {
            this.hours_selecteds.splice(INDEX, 1);
          }
        });
      });
    } else {
      this.days_week.forEach((day) => {
        hours_day.items.forEach((item: any) => {
          let INDEX = this.hours_selecteds.findIndex(
            (hour: any) =>
              hour.day_name == day.day &&
              hour.hour == hours_day.hour &&
              hour.item.hour_start == item.hour_start &&
              hour.item.hour_end == item.hour_end
          );
          if (INDEX != -1) {
            this.hours_selecteds.splice(INDEX, 1);
          }
        });
      });
      setTimeout(() => {
        this.days_week.forEach((day) => {
          this.addHourAll(hours_day, day);
        });
      }, 25);
    }
  }

  addHourDay($event: any, day: any) {
    let allSelected = true;

    // Verifica si todas las horas del día están seleccionadas
    this.hours_days.forEach((hours_day: any) => {
      hours_day.items.forEach((item: any) => {
        const INDEX_ITEM = this.hours_selecteds.findIndex(
          (hour: any) =>
            hour.day_name == day.day &&
            hour.hour == hours_day.hour &&
            hour.item.hour_start == item.hour_start &&
            hour.item.hour_end == item.hour_end
        );
        if (INDEX_ITEM === -1) {
          allSelected = false; // Si alguna hora no está seleccionada, cambia el estado
        }
      });
    });

    // Si todas las horas están seleccionadas, deselecciona todas
    if (allSelected) {
      this.hours_days.forEach((hours_day: any) => {
        hours_day.items.forEach((item: any) => {
          const INDEX_ITEM = this.hours_selecteds.findIndex(
            (hour: any) =>
              hour.day_name == day.day &&
              hour.hour == hours_day.hour &&
              hour.item.hour_start == item.hour_start &&
              hour.item.hour_end == item.hour_end
          );
          if (INDEX_ITEM !== -1) {
            this.hours_selecteds.splice(INDEX_ITEM, 1);
          }
        });
      });
    } else {
      // Si no todas las horas están seleccionadas, selecciona todas
      this.hours_days.forEach((hours_day: any) => {
        hours_day.items.forEach((item: any) => {
          const INDEX_ITEM = this.hours_selecteds.findIndex(
            (hour: any) =>
              hour.day_name == day.day &&
              hour.hour == hours_day.hour &&
              hour.item.hour_start == item.hour_start &&
              hour.item.hour_end == item.hour_end
          );
          if (INDEX_ITEM === -1) {
            this.hours_selecteds.push({
              day: day,
              day_name: day.day,
              hours_day: hours_day,
              hour: hours_day.hour,
              grupo: 'all',
              item: item,
            });
          }
        });
      });
    }

    console.log(this.hours_selecteds);
  }

  isCheckHourAll(hours_day: any, day: any) {
    const INDEX = this.hours_selecteds.findIndex(
      (hour: any) =>
        hour.day_name == day.day &&
        hour.hour == hours_day.hour &&
        hour.grupo == 'all'
    );
    const COUNT_SELECTED = this.hours_selecteds.filter(
      (hour: any) => hour.day_name == day.day && hour.hour == hours_day.hour
    ).length;
    if (INDEX != -1 && COUNT_SELECTED == hours_day.items.length) {
      return true;
    } else {
      return false;
    }
  }

  isCheckHour(hours_day: any, day: any, item: any) {
    const INDEX = this.hours_selecteds.findIndex(
      (hour: any) =>
        hour.day_name == day.day &&
        hour.hour == hours_day.hour &&
        hour.item.hour_start == item.hour_start &&
        hour.item.hour_end == item.hour_end
    );
    if (INDEX != -1) {
      return true;
    } else {
      return false;
    }
  }
}
