export interface RatingItem {
  name: "1 star" | "2 star" | "3 star" | "4 star" | "5 star";
  count: number;
}
export interface AppData {
  image: string;
  title: string;
  companyName: string;
  id: string;
  description: string;
  size: number;
  reviews: number;
  ratingAvg: number;
  downloads: number;
  isInstalled: boolean;
  ratings: RatingItem[];
}
