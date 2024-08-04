export type TFiltersState = {
  isOpen: boolean;
  options: {
    price?: [number, number];
    sortBy?: string;
    materials?: string[];
    categories?: string[];
    sizes?: string[];
  };
  onToggle: () => void;
  onFilter: ({
    key,
    value,
  }: {
    key: string;
    value: string | string[] | number | number[];
  }) => void;
  onReset: () => void;
};
