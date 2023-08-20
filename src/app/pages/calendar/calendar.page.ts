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
          this.createModal('', '', '');
        }
      }
    },
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'timeGridWeek,timeGridDay today',
      center: 'title',
      right: 'createButton prev,next'
    },
    weekends: false,
    plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
    events: [],
    slotMinTime: '08:00',
    slotMaxTime: '18:00',
    nowIndicator: true,
    selectable: true,
    select: (e) => {
      this.createModal(e.startStr, e.endStr, '');
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
        const test = res[0].start.toDate();

        this.events = [];
        res.map(x => {
          const instance = {
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

  async createModal(start: string, end: string, creator: string) {
    if (start === '') {
      start = new Date().toISOString();
    }
    if (end === '') {
      end = new Date().toISOString();
    }

    console.log('creating modal', start);
    const modal = await this.modalController.create({
      component: BookingComponent,
      componentProps: {
        startDate: start,
        endDate: end,
        creator: creator
      }

    });

    modal.onDidDismiss().then((modalData) => {
      if (modalData !== null) {
        console.log('data from modal', modalData);
      }
    });

    return await modal.present();
  }
}
