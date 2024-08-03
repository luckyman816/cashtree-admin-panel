

export type userdata = {
  
  userName?: string;
  email?: string; 
  number?:string;
  id?:string;
  point?:string;
  epoint?:string;
  wallet?:string;
};
export interface UsersProps {
  users: userdata[];
  error: object | string | null;
}

