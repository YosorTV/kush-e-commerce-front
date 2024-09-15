declare global {
  interface Window {
    LiqPayCheckoutCallback: () => void;
  }

  interface LiqPayCheckoutType {
    init: (options: { data: string; signature: string; embedTo: string; mode: string }) => {
      on: (event: string, callback: (data: any) => void) => void;
    };
  }

  const LiqPayCheckout: LiqPayCheckoutType;
}

export {};
