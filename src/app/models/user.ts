import {Favorite} from './favorite';
import {Rated} from './rated';
import {CheckedAttr} from './checkedAttr';

export interface User {
  key: string;
  email: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  favorites: Favorite[];
  ratedAttr: Rated[];
  checkedAttr: CheckedAttr[];
}
