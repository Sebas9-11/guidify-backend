export interface User {
  id?: number;
  name: string;
  last_name: string;
  phone: string;
  email: string;
  document: string;
  diploma?: string;
  professional_card?: string;
  photo?: string;
  city_id: number;
  department_id: number;
  rol_id: number;
  password: string;
}

export interface Service {
  id?: number;
  title: string;
  description: string;
  date: date;
  in_person?: boolean;
  virtual?: boolean;
  city_id: number;
  department_id: number;
  user_id: number;
  payment_id: number;
}

export interface City {
  id?: number;
  name: string;
  department_id: number;
}

export interface Department {
  id?: number;
  name: string;
}

export interface Rol {
  id?: number;
  name: string;
}

export interface Payment {
  id?: number;
  name: string;
}