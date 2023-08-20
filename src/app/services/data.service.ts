import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CalendarEvent, DisplayCalendarEvent } from '../models/CalendarEvent.model';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private firestore: Firestore
  ) { }

  getEvents() {
    const eventCollection = collection(this.firestore, `events`);
    return collectionData(eventCollection) as Observable<CalendarEvent[]>;
  }

  addEvent(event: DisplayCalendarEvent) {
    const eventCollection = collection(this.firestore, `events`);
    return addDoc(eventCollection, event);
  }
}
