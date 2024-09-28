export interface IPaginateController {
  total: number;
  disabled: boolean;
  perPage?: number;
  onClick?: () => Promise<void>;
}
