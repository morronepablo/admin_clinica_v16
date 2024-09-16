/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component } from '@angular/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es'; // Importa el idioma español
import { AppointmentPayService } from '../../appointment-pay/service/appointment-pay.service';
import { CalendarAppointmentService } from '../service/calendar-appointment.service';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss'],
})
export class AppointmentCalendarComponent {
  options: any;
  events: any[] = [];

  public specialities: any = [];
  public specialitie_id = '';
  public search_doctor = '';
  public search_patient = '';

  public user: any;

  constructor(
    public appointmentPayService: AppointmentPayService,
    public appointmentCalendarService: CalendarAppointmentService
  ) {
    // this.data.getEvents().subscribe((events: any) => {
    //   this.events = events;
    //   this.options = { ...this.options, ...{ events: events.data } };
    // });

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: new Date(),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      locale: esLocale, // Aplica el idioma español
      events: [{ title: 'Meeting', start: new Date() }],
    };
  }

  isPermited() {
    let band = false;
    this.user.roles.forEach((rol: any) => {
      if (rol.toUpperCase().indexOf('DOCTOR') != -1) {
        band = true;
      }
    });
    return band;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.appointmentPayService.listConfig().subscribe((resp: any) => {
      this.specialities = resp.specialities;
    });
    this.user = this.appointmentPayService.authService.user;
    this.calendarAppointment();
  }

  calendarAppointment() {
    const data = {
      specialitie_id: this.specialitie_id,
      search_doctor: this.search_doctor,
      search_patient: this.search_patient,
    };
    this.appointmentCalendarService
      .calendarAppointment(data)
      .subscribe((resp: any) => {
        console.log(resp);
        this.options = { ...this.options, ...{ events: resp.appointments } };
      });
  }

  searchData() {
    this.calendarAppointment();
  }

  clearData() {
    this.specialitie_id = '';
    this.search_doctor = '';
    this.search_patient = '';
    this.calendarAppointment();
  }
}
