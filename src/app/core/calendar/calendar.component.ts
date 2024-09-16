import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es'; // Importa el idioma español
import { DataService } from 'src/app/shared/data/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  public routes = routes;
  options: any;
  events: any[] = [];

  constructor(private data: DataService) {
    this.data.getEvents().subscribe((events: any) => {
      this.events = events;
      this.options = { ...this.options, ...{ events: events.data } };
    });

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
}
