import {TripAttraction} from './tripAttraction';

export interface Trip {
  groupCount: number;
  groupType: string;
  name: string;
  travelAgency: string;
  tripDate: string;
  userRef: string;
  wage: number;
  tripAttr: TripAttraction[];
  key: string;
}
