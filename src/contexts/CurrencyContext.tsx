import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "ETB";

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  rate: number; // rate from USD
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$", rate: 1, label: "US Dollar" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, label: "Euro" },
  GBP: { code: "GBP", symbol: "£", rate: 0.79, label: "British Pound" },
  ETB: { code: "ETB", symbol: "Br", rate: 57, label: "Ethiopian Birr" },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (usdAmount: number) => string;
  convert: (usdAmount: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("currency") : null;
    return (stored as CurrencyCode) || "USD";
  });

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const setCurrency = (c: CurrencyCode) => setCurrencyState(c);

  const convert = (usdAmount: number) => usdAmount * CURRENCIES[currency].rate;

  const format = (usdAmount: number) => {
    const value = convert(usdAmount);
    const info = CURRENCIES[currency];
    const rounded = currency === "ETB" ? Math.round(value) : Math.round(value);
    return `${info.symbol}${rounded.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, convert, symbol: CURRENCIES[currency].symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};
