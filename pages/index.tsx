import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { HomeProps, FilterProps } from "@/types";
import { GetServerSidePropsContext } from "next";

export default function Home({ allCars }: HomeProps) {
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  const router = useRouter();

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold"> Car Catalogue</h1>
          <p>Explore the cars you might like.</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} key={car.id} />
              ))}
            </div>
            <ShowMore
              pageNumber={(Number(router.query.limit) || 10) / 10}
              isNext={(Number(router.query.limit) || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold text-center">
              No results... <br /> Try to search a different car
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}

export async function getServerSideProps({ query }) {
  const allCars = await fetchCars({
    manufacturer: query.manufacturer || "",
    year: query.year || 2025,
    fuel: query.fuel || "",
    limit: query.limit || 10,
    model: query.model || "",
  });

  const allCarsWithIds = allCars.map((car) => ({ ...car, id: uuidv4() }));
  return {
    props: {
      allCars: allCarsWithIds,
    },
  };
}
