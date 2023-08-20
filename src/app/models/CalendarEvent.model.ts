import { Timestamp } from "@firebase/firestore-types";

export interface CalendarEvent {
  title: string;
  start: Timestamp;
  end: Timestamp;
}

export interface DisplayCalendarEvent {
  title: string;
  start: Date;
  end: Date;
}

export interface SaveCalendarEvent {
  title: string;
  start: string;
  end: string;
}
