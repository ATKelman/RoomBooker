import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent  implements OnInit {
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() creator: string;

  constructor(
    private modalController: ModalController,
    public dataService: DataService) {
  }

  ngOnInit() {
  }

  async cancel() {
    await this.modalController.dismiss(false);
  }

  async save() {
    // Send to database then dismiss
    // To convert Date to Timestamp we have to re-cast the Date a new Date
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    const event = {
      title: this.creator,
      start: start,
      end: end
    };

    this.dataService.addEvent(event);

    await this.modalController.dismiss(true);
  }
}
