/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarAppointmentService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  calendarAppointment(data: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    const URL = URL_SERVICIOS + '/appointment/calendar';
    return this.http.post(URL, data, { headers: headers });
  }
}
