export type TSortField = {
  label: string;
  name: HTMLInputElement['name'];
  id: number | string;
};

export interface ISortFields {
  data: TSortField[];
}
