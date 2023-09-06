interface CabinData {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}
interface CreateCabinData {
  description: string;
  discount: string;
  maxCapacity: string;
  name: string;
  regularPrice: string;
}
export type { CabinData, CreateCabinData };
