// contexts/ApiContext.tsx
"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { petApi } from "./services/petApi";
import { PetFormData } from "./Form";

type ApiData = {
  totalPremium: number;
  breakdown: {
    basePremium: number;
    ageAdjustment: number;
    preExistingConditionsAdjustment: number;
    coverageLevelAdjustment: number;
  };
  // Add other fields based on your API response
};

type ApiContextType = {
  data: ApiData;
  loading: boolean;
  error: string | null;
  fetchData: (formData: PetFormData) => Promise<void>;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ApiData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (formData: PetFormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await petApi.calculatePremium(formData);
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <ApiContext.Provider value={{ data, loading, error, fetchData }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
