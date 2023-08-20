import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent  implements OnInit {
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() creator: string;
  @Input() description: string;

  constructor(private modalController: ModalController) {

  }

  ngOnInit() {
  }


  async cancel() {
    await this.modalController.dismiss(false);
  }

  async save() {
    // Send to database then dismiss

    await this.modalController.dismiss(true);
  }
}
