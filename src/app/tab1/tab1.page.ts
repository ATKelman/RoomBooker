import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { IonModal, ModalController } from '@ionic/angular';
import { BookingComponent } from '../components/booking/booking.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  @ViewChild('modal') calendarBooking: IonModal;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    weekends: false,
    plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
    events: [
      { title: 'event 1', start: '2023-08-17 08:30', end: '2023-08-17 10:00' },
      { title: 'Gustav', start: '2023-08-18 13:30', end: '2023-08-18 15:00' },
    ],
    slotMinTime: '08:00',
    slotMaxTime: '18:00',
    nowIndicator: true,
    selectable: true,
    select: (e) => {
      this.createModal(e.startStr, e.endStr, '', '');
    }

  };

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    // Fixes an issue with Ionic and FullCalendar where the calendar does not display correctly until the window is resized
    setTimeout(() => {
      this.fullcalendar.getApi().render();
    }, 100);

  }

  async createModal(start: string, end: string, creator: string, description: string) {
    const modal = await this.modalController.create({
      component: BookingComponent,
      componentProps: {
        startDate: start,
        endDate: end,
        creator: creator,
        description: description
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
