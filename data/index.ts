import { RESTAURANTS_ALL } from "./restaurants.all";
import { BEACHES_ALL } from "./beaches.all";
import { ACTIVITIES_ALL } from "./activities.all";
import { DISCOS_ALL } from "./discos.all";
import { TRANSPORT_ALL } from "./transport.all";
import type { Place } from "./places.types";

export const DATASETS = {
  restaurants: RESTAURANTS_ALL,
  beaches: BEACHES_ALL,
  activities: ACTIVITIES_ALL,
  discos: DISCOS_ALL,
  transport: TRANSPORT_ALL,
};

export const ALL_PLACES: Place[] = [
  ...RESTAURANTS_ALL,
  ...BEACHES_ALL,
  ...ACTIVITIES_ALL,
  ...DISCOS_ALL,
  ...TRANSPORT_ALL,
];
export const places = ALL_PLACES;