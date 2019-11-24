export interface TripAttraction {
  additionalGuide: string;
  attrName: string;
  attrRef: string;
  endHour: Time;
  startHour: Time;
}

interface Time {
  hour: string;
  minute: string;
  second: string;
}
