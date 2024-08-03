

export type leaderdata = {
  
  name?: string;
  email?: string; 
  rank?:string;
};
export interface LeaderProps {
  leaders: leaderdata[];
  error: object | string | null;
}

