

export type boostersdata = {
  
  date?: string; 
  name?: string;
  email?:string;
  refill?:string;
  double?:string;
};
export interface boostersProps {
  boosters: boostersdata[];
  error: object | string | null; 
}

