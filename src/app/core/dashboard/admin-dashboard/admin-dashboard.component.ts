/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexGrid,
  ApexStroke,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexYAxis,
} from 'ng-apexcharts';
import { Sort } from '@angular/material/sort';
import { DataService } from 'src/app/shared/data/data.service';
import {
  recentPatients,
  upcomingAppointments,
} from 'src/app/shared/models/models';
import { DashboardService } from '../service/dashboard.service';
export type ChartOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: ApexAxisChartSeries | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart: ApexChart | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLabels: ApexDataLabels | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plotOptions: ApexPlotOptions | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsive: ApexResponsive[] | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xaxis: ApexXAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: ApexLegend | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fill: ApexFill | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colors: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grid: ApexGrid | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stroke: ApexStroke | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};
interface data {
  value: string;
}
export type ChartOptionsTwo = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: ApexAxisChartSeries | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart: ApexChart | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xaxis: ApexXAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLabels: ApexDataLabels | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grid: ApexGrid | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fill: ApexFill | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markers: ApexMarkers | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yaxis: ApexYAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stroke: ApexStroke | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: ApexTitleSubtitle | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsive: ApexResponsive[] | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plotOptions: ApexPlotOptions | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltip: ApexTooltip | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: ApexLegend | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  public routes = routes;
  public selectedValue: string = '2024';
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptionsOne: Partial<ChartOptions>;
  public chartOptionsOneTwo: Partial<ChartOptionsTwo>;

  public chartOptionsTwo: Partial<ChartOptions>;

  public recentPatients: Array<recentPatients> = [];
  public upcomingAppointments: Array<upcomingAppointments> = [];

  public appointments: any = [];
  public num_appointments_current: number = 0;
  public num_appointments_before: number = 0;
  public porcentaje_d: number = 0;

  public num_patients_current: number = 0;
  public num_patients_before: number = 0;
  public porcentaje_dp: number = 0;

  public num_appointments_attetion_current: number = 0;
  public num_appointments_attetion_before: number = 0;
  public porcentaje_da: number = 0;

  public appointments_total_current: number = 0;
  public appointments_total_before: number = 0;
  public porcentaje_dt: number = 0;

  public query_patient_by_genders: any = [];
  public query_patients_speciality: any = [];
  public query_patients_speciality_percentage: any = [];
  public query_income_year: any = [];

  public percentage_male: number = 0;
  public percentage_female: number = 0;

  public user: any;

  constructor(
    public data: DataService,
    public dashboardService: DashboardService
  ) {
    this.chartOptionsOne = {
      chart: {
        height: 230,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '15%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      series: [
        {
          name: 'Hombre',
          color: '#2E37A4',
          data: [], //[20, 30, 41, 67, 22, 43, 40, 10, 30, 20, 40],
        },
        {
          name: 'Mujer',
          color: '#00D3C7',
          data: [], //[13, 23, 20, 8, 13, 27, 30, 25, 10, 15, 20],
        },
      ],
      xaxis: {
        categories: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ],
        axisBorder: {
          show: false, // set to false to hide the vertical gridlines
        },
      },
    };
    this.chartOptionsTwo = {
      series: [],
      labels: [],
      chart: {
        type: 'donut',
        height: 200,
        width: 200,
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
    };
    this.chartOptionsOneTwo = {
      chart: {
        height: 200,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'Income',
          color: '#2E37A4',
          data: [], //[45, 60, 75, 51, 42, 42, 30],
        },
      ],
      xaxis: {
        categories: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ], //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Ago','Sep','Oct','Nov','Dic'],
      },
    };
    this.recentPatients = this.data.recentPatients;
    this.upcomingAppointments = this.data.upcomingAppointments;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.user = this.dashboardService.authService.user;
    if (
      this.user.roles.includes('Super-Admin') ||
      this.user.permissions.includes('admin_dashboard')
    ) {
      this.dashboardService.dashboardAdmin({}).subscribe((resp: any) => {
        console.log(resp);

        this.appointments = resp.appointments.data;

        this.num_appointments_current = resp.num_appointments_current;
        this.num_appointments_before = resp.num_appointments_before;
        this.porcentaje_d = resp.porcentaje_d;

        this.num_patients_current = resp.num_patients_current;
        this.num_patients_before = resp.num_patients_before;
        this.porcentaje_dp = resp.porcentaje_dp;

        this.num_appointments_attetion_current =
          resp.num_appointments_attetion_current;
        this.num_appointments_attetion_before =
          resp.num_appointments_attetion_before;
        this.porcentaje_da = resp.porcentaje_da;

        this.appointments_total_current = resp.num_appointments_total_current;
        this.appointments_total_before = resp.num_appointments_total_before;
        this.porcentaje_dt = resp.porcentaje_dt;
      });

      this.dashboardAdminYear();
    }
  }

  dashboardAdminYear() {
    const data = {
      year: this.selectedValue,
    };
    this.dashboardService.dashboardAdminYear(data).subscribe((resp: any) => {
      console.log(resp);

      //START
      this.query_patient_by_genders = resp.query_patient_by_genders;

      const data_male: any = [];
      const data_female: any = [];
      let contador_hombre: number = 0;
      let contador_mujer: number = 0;
      let total_patients: number = 0;

      // Sumar la cantidad de hombres y mujeres
      this.query_patient_by_genders.forEach((item: any) => {
        contador_hombre += Number(item.hombre);
        contador_mujer += Number(item.mujer);
        data_male.push(item.hombre);
        data_female.push(item.mujer);
      });

      // Calcular el total de pacientes
      total_patients = contador_hombre + contador_mujer;

      // Verificar que el total no sea 0 para evitar división por cero
      if (total_patients > 0) {
        // Calcular el porcentaje de hombres y mujeres
        this.percentage_male = Number(
          ((contador_hombre / total_patients) * 100).toFixed(2)
        );
        this.percentage_female = Number(
          ((contador_mujer / total_patients) * 100).toFixed(2)
        );
      }

      const Patient_by_Genders = [
        {
          name: 'Hombre',
          color: '#2E37A4',
          data: data_male,
        },
        {
          name: 'Mujer',
          color: '#00D3C7',
          data: data_female,
        },
      ];

      this.chartOptionsOne.series = Patient_by_Genders;
      //END

      //START
      this.query_patients_speciality = resp.query_patients_speciality;

      const labels_spe: any = [];
      const series_spe: any = [];
      this.query_patients_speciality.forEach((patients_special: any) => {
        labels_spe.push(patients_special.name);
        series_spe.push(patients_special.count);
      });

      this.chartOptionsTwo.labels = labels_spe;
      this.chartOptionsTwo.series = series_spe;
      //END

      //START
      this.query_patients_speciality_percentage =
        resp.query_patients_speciality_percentage;

      //END

      //START
      this.query_income_year = resp.query_income_year;
      const data_income: any = [];
      this.query_income_year.forEach((element: any) => {
        // Formatear cada valor con millares y 2 decimales
        const formattedIncome = new Intl.NumberFormat('es-AR', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(element.income);

        data_income.push(formattedIncome);
      });

      this.chartOptionsOneTwo.series = [
        {
          name: 'Ingreso',
          color: '#2E37A4',
          data: data_income,
        },
      ];
      // this.chartOptionsOneTwo.labels = resp.months_name;
      this.chartOptionsOneTwo.xaxis.categories = resp.months_name;
      //END
    });
  }

  public sortData(sort: Sort) {
    const data = this.recentPatients.slice();
    const datas = this.upcomingAppointments.slice();

    if (!sort.active || sort.direction === '') {
      this.recentPatients = data;
      this.upcomingAppointments = datas;
    } else {
      this.recentPatients = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
      this.upcomingAppointments = datas.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public selectedYear() {
    console.log(this.selectedValue);
    this.dashboardAdminYear();
  }

  selecedList: data[] = [
    { value: '2024' },
    { value: '2023' },
    { value: '2022' },
    { value: '2021' },
  ];
}
