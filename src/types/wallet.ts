

export type walletdata = {
  
  name?: string;
  email?: string; 
  wallet?:string;
};
export interface WalletProps {
  wallets: walletdata[];
  error: object | string | null;
}

