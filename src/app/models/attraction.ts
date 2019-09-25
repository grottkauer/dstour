export interface Attraction {
  additionalInformation: string;
  name: string;
  key: string;
  shortInformation: string;
  longInformation: string;
  owner: string;
  coordinateX: number;
  coordinateY: number;
  city: string;
  email: string;
  phone: Phone;
  type: AttractionType;
  webpage: string;
}

export interface AttractionType {
  typeName: string;
}

export interface Phone {
  number: string;
}
