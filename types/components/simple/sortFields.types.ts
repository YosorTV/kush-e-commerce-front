export type TSortField = {
  label: string;
  name: HTMLInputElement['name'];
  id: number;
};

export interface ISortFields {
  data: TSortField[];
}
