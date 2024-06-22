export type TFiltersState = {
  isOpen: boolean;
  options: {
    price: number;
    sortValue: string;
    materials: string[];
  };
  onToggle: () => void;
  onFilter: ({ key, value }: { key: string; value: string | string[] }) => void;
  onReset: () => void;
};
