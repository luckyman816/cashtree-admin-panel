

export type dailyUsersdata = {
  
  date?:string;
  name?: string;
  email?: string; 
};
export interface dailyUsersProps {
  dailyUsers: dailyUsersdata[];
  error: object | string | null;
}

