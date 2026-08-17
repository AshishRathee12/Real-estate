import type { Dispatch, SetStateAction } from "react";

export type SellProperty = {
  AboutSeller: string;
  sellingPeriod: string;
  basic: {
    purpose: string;
    category: string;
    propertyType: string;
  };
  location: Record<string, string>;
  area: string;
  pricing: string;
  images: string[];
  propertySpecific: Record<string, number>;
};

export type SellStepProps = {
  setProperty: Dispatch<SetStateAction<SellProperty>>;
  setPage: Dispatch<SetStateAction<number>>;
  //   property: any;
};
export type property = {
  property: any;
  setProperty: Dispatch<SetStateAction<SellProperty>>;
  setPage: Dispatch<SetStateAction<number>>;
};
