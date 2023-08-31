import { Database } from './utils/database.types';

export type carType = {
  title: string;
  vehicleType: string;
  gallons: number;
  image: string;
  transmission: string;
  capacity: number;
  price: number;
  id: number;
};

export type Car = {
  booked_dates: string[] | null;
  borrower_id: number | null;
  capacity: Database['public']['Enums']['capacity'];
  car_id: string;
  car_title: string;
  car_type: Database['public']['Enums']['car_type'];
  fuel_capacity: number;
  location: string;
  owner_id: string;
  price: number;
  short_description: string;
  transmission: Database['public']['Enums']['transmission'];
  images: string[] | null;
};

export type ToastProps = {
  type: 'success' | 'error';
  message: string;
};
