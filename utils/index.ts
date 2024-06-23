export async function fetchCars() {
  const headers = {
    "x-rapidapi-key": "",
    "x-rapidapi-host": "",
  };

  const response = await fetch(
    "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla",
    { headers: headers }
  );
  const result = await response.json();
  return result;
}
