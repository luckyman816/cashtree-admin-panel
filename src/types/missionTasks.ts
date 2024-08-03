

export type Missionsdata = {
  
  mission?:string;
  name?: string;
  email?: string; 
};
export interface missionsProps {
  missions: Missionsdata[];
  error: object | string | null;
}

