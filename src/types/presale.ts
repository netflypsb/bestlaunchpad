export interface Presale {
  id: number;
  name: string;
  tokenSymbol: string;
  website: string;
  ethereumContractAddress: string;
  bscContractAddress?: string;
}

export interface SelectedPresale extends Presale {
  selected: boolean;
}