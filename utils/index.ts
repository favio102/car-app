import { CarProps, QueryParamsProps } from "@/types";

export async function fetchCars(
  filters: QueryParamsProps
): Promise<CarProps[]> {
  const { manufacturer, year, model, limit, fuel } = filters;
  const headers: Record<string, string> = {
    "x-rapidapi-key": process.env.X_RAPID_API_KEY || "",
    "x-rapidapi-host": process.env.X_RAPID_API_HOST || "",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    { headers: headers }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
  const result = await response.json();
  return result as CarProps[];
}

export const calculateCarRent = (city_mpg: number, year: number): string => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string): string => {
  const url = new URL(`https://cdn.imagin.studio/getimage`);
  const { make, year, model } = car;
  const customerKey = process.env.KEY_CAR_IMAGE_API || "default_customer-key";

  url.searchParams.append("customer", customerKey);
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  if (angle) {
    url.searchParams.append("angle", `${angle}`);
  }

  return url.toString();
};

export const updateSearchParams = (type: string, value: string): string => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};
