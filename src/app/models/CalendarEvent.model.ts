import { Timestamp } from "@firebase/firestore-types";

export interface CalendarEvent {
  id?: string;
  title: string;
  start: Timestamp;
  end: Timestamp;
}

export interface DisplayCalendarEvent {
  id?: string;
  title: string;
  start: Date;
  end: Date;
}

export interface SaveCalendarEvent {
  id?: string;
  title: string;
  start: string;
  end: string;
}
