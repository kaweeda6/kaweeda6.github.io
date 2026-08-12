export const BOOK_APPOINTMENT_URL = 'https://app.nexhealth.com/appt/thrive-dental-queens?lid=324493&rwg_token=AFd1xnGNillcXUGOOUKK5stHKAb-R4afFfav9AFwwLLnPtaJk19wGGaej6GSJYPdzjxmFqkjhDjjVNvj5OghPg9um4xucdiw1A%3D%3D'

// Office hours — single source of truth. Formatting is applied at the call
// site, but days/times live here so a schedule change is a one-file edit.
export interface OfficeHoursRow {
  days: string;
  hours: string; // e.g. '9:00 AM – 7:00 PM'; empty string = closed
  open: boolean;
}

export const OFFICE_HOURS: OfficeHoursRow[] = [
  { days: 'Tuesday', hours: '9:00 AM – 7:00 PM', open: true },
  { days: 'Wednesday', hours: '9:00 AM – 5:00 PM', open: true },
  { days: 'Thursday', hours: '9:00 AM – 6:00 PM', open: true },
  { days: 'Saturday – Sunday', hours: '9:00 AM – 3:00 PM', open: true },
  { days: 'Monday & Friday', hours: '', open: false },
];

export const PHONE_DISPLAY = '(718) 225-6677';
export const PHONE_TEL = 'tel:+1-718-225-6677';
export const ADDRESS_LINE = '41-02 Bell Blvd, Bayside, NY 11361';
export const MAPS_URL = 'https://maps.app.goo.gl/yz2gipKBB3Dfp7Tg9';
