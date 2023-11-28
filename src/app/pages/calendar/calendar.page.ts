import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { IonModal, ModalController } from '@ionic/angular';
import { BookingComponent } from '../../components/booking/booking.component';
import { DataService } from '../../services/data.service';
import { DisplayCalendarEvent } from '../../models/CalendarEvent.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  @ViewChild('modal') calendarBooking: IonModal;

  calendarOptions: CalendarOptions = {
    customButtons: {
      createButton: {
        text: 'Skapa',
        click: () => {
          this.createModal('', '', '', '');
        }
      }
    },
    views: {
      timeGridWeek: {
        dayHeaderFormat: (args) => {
          const date = new Date(args.date.year, args.date.month, args.date.day);
          return formatDate(date, 'E dd/MM', 'en-US').toString();
        },
      },
    },
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay today',
      center: 'title',
      right: 'createButton prev,next'
    },
    buttonText: {
      dayGridMonth: 'Månad',
      timeGridWeek: 'Vecka',
      timeGridDay: 'Dag',
      today: 'Idag'
    },
    weekNumbers: true,
    weekText: 'V ',
    weekends: false,
    plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
    events: [],
    slotMinTime: '08:00',
    slotMaxTime: '18:00',
    nowIndicator: true,
    selectable: true,
    select: (e) => {
      this.createModal('', e.startStr, e.endStr, '');
    },
    eventClick: (e) => {
      this.createModal(e.event._def.publicId, e.event.startStr, e.event.endStr, e.event.title);
    },
    eventTimeFormat: {
      hour: '2-digit', //2-digit, numeric
      minute: '2-digit', //2-digit, numeric
      meridiem: false, //lowercase, short, narrow, false (display of AM/PM)
      hour12: false //true, false
    },
    slotLabelFormat: {
      hour: '2-digit', //2-digit, numeric
      minute: '2-digit', //2-digit, numeric
      meridiem: false, //lowercase, short, narrow, false (display of AM/PM)
      hour12: false //true, false
    }

  };

  private events: DisplayCalendarEvent[] = [];

  constructor(
    public modalController: ModalController,
    public dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getEvents()
      .subscribe(res => {
        this.events = [];
        res.map(x => {
          const instance = {
            id: x.id,
            title: x.title,
            start: x.start.toDate(),
            end: x.end.toDate()
          };

          this.events.push(instance);
        });

        this.calendarOptions.events = this.events;
      });
  }

  ionViewWillEnter() {
    // Fixes an issue with Ionic and FullCalendar where the calendar does not display correctly until the window is resized
    setTimeout(() => {
      this.fullcalendar.getApi().render();
    }, 100);

  }

  async createModal(id: string, start: string, end: string, title: string) {
    if (start === '') {
      start = new Date().toISOString();
    }
    if (end === '') {
      end = new Date().toISOString();
    }

    const modal = await this.modalController.create({
      component: BookingComponent,
      componentProps: {
        id: id,
        startDate: start,
        endDate: end,
        creator: title
      }
    });

    // modal.onDidDismiss().then((modalData) => {
    //   if (modalData !== null) {
    //     console.log('data from modal', modalData);
    //   }
    // });

    return await modal.present();
  }
}
