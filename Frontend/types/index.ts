export interface signup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface signin {
  email: string;
  password: string;
}

export interface eventType {
  id: string; 
  title: string;
  description: string;
  start: string;
  end: string;
}