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
    return collectionData(eventCollection, { idField: 'id'}) as Observable<CalendarEvent[]>;
  }

  addEvent(event: DisplayCalendarEvent) {
    const eventCollection = collection(this.firestore, `events`);
    return addDoc(eventCollection, event);
  }

  updateEvent(event: DisplayCalendarEvent) {
    const eventDocRef = doc(this.firestore, `events/${event.id}`);
    return updateDoc(eventDocRef, { title: event.title, start: event.start, end: event.end });
  }

  deleteEvent(id: string) {
    const eventDocRef = doc(this.firestore, `events/${id}`);
    return deleteDoc(eventDocRef);
  }
}
