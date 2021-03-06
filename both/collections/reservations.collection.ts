import { MongoObservable } from 'meteor-rxjs';

import { Reservation } from '../models/reservation.model';

export const Reservations = new MongoObservable.Collection<Reservation>('reservations');
