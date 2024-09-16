/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  getConfigdashboard() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    const URL = URL_SERVICIOS + '/dashboard/config';
    return this.http.get(URL, { headers: headers });
  }

  dashboardAdmin(data: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    const URL = URL_SERVICIOS + '/dashboard/admin';
    return this.http.post(URL, data, { headers: headers });
  }

  dashboardAdminYear(data: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    const URL = URL_SERVICIOS + '/dashboard/admin-year';
    return this.http.post(URL, data, { headers: headers });
  }

  dashboardDoctor(data: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    const URL = URL_SERVICIOS + '/dashboard/doctor';
    return this.http.post(URL, data, { headers: headers });
  }

  dashboardDoctorYear(data: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    const URL = URL_SERVICIOS + '/dashboard/doctor-year';
    return this.http.post(URL, data, { headers: headers });
  }
}
