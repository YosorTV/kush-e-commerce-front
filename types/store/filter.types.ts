export type TFiltersState = {
  isOpen: boolean;
  options: {
    price?: string;
    sortBy?: string;
    materials?: string[];
    categories?: string[];
    sizes?: string[];
  };
  onToggle: () => void;
  onFilter: ({ key, value }: { key: string; value: string | string[] }) => void;
  onReset: () => void;
};
