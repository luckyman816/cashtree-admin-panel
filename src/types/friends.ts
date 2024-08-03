

export type friendsdata = {
  
  userName?: string;
  friendName?: string; 
  friendEmail?:string;
};
export interface FriendsProps {
  friendss: friendsdata[];
  error: object | string | null; 
}

