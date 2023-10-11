import { GuestData } from "./guests-types";

interface BookingData {
  id: number;
  status: string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  guests: GuestData;
  cabins: { name: string };
}
export type { BookingData };
