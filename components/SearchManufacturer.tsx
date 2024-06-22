import { SearchManufacturerProps } from "@/types";
import {
  ComboboxButton,
  Combobox,
  ComboboxInput,
  Transition,
  ComboboxOption,
} from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { manufacturers } from "@/constants";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLocaleLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox>
        <div className="relative w-full">
          <ComboboxButton className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              alt="Car logo"
              className="ml-4"
            />
          </ComboboxButton>
          <ComboboxInput
            className="search-manufacturer__input"
            placeholder="Voslkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOption>
              {
                filteredManufacturers.map((item) => (
                  <ComboboxOption
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {item}
                  </ComboboxOption>
                ))
              }
            </ComboboxOption>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
