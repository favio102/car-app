import { CustomFilter, Hero, SearchBar } from "@/components";
import { fetchCars } from "@/utils";

export default function Home({ allCars }) {
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

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
          <div className="home_filters-container">
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>we have cars</section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">no cars</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const allCars = await fetchCars();
  return {
    props: {
      allCars,
    },
  };
}
