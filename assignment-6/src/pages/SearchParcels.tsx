import axios from "axios";
import InputLayout from "../components/InputLayout";
import SelectorLayout from "../components/selectorLayout";
import type { Parcel, SearchFields } from "../interfaces/globalInterfaces";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { formatDate } from "../utilities/utils";
import { Link } from "react-router";
import Skeleton from "../components/Skeleton";

interface ApiResponse {
  parcels: Parcel[];
  nextCursor?: number | null; // The API should return the next page number/cursor, or null/undefined if it's the last page.
}

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const PARCEL_LIMIT = 3;
function SearchParcels() {
  const [searchQuery, setSearchQuery] = useState<SearchFields>({
    trackingId: "",
    status: "",
    sort: "",
  });
  const [activeFilters, setActiveFilters] = useState<SearchFields>(searchQuery);
  async function fetchParcels({
    pageParam = 0,
  }: {
    pageParam: number;
  }): Promise<ApiResponse> {
    // Use URLSearchParams to easily build the query string
    const params = new URLSearchParams({
      page: pageParam.toString(),
      limit: PARCEL_LIMIT.toString(),
      // Add other filters only if they have a value
    });

    if (activeFilters.trackingId) {
      params.append("trackingId", activeFilters.trackingId);
    }
    if (activeFilters.status) {
      params.append("status", activeFilters.status);
    }
    if (activeFilters.sort) {
      params.append("sort", activeFilters.sort);
    }

    // NOTE: This is a placeholder for your actual API call.
    // Replace the URL and logic with your actual backend endpoint.
    // console.log(`Fetching: ${BASE_URL}/search-parcels?${params.toString()}`);
    const response = await axios.get(
      `${BASE_URL}/search-parcels?${params.toString()}`
    );

    // Ensure your API returns data in the format { parcels: [], nextCursor: number | null }
    return response.data;
  }
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["parcels", activeFilters],
    queryFn: fetchParcels,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
  });
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({ ...prev, [name]: value }));
  };
  // Triggers the search when the form is submitted
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the page from reloading
    // Set the active filters to the current form values, which will trigger the query to re-fetch.
    setActiveFilters(searchQuery);
  };

  return (
    <>
      <main className="h-full">
        <aside>
          <form onSubmit={handleSearch}>
            <fieldset>
              <legend className="text-center text-2xl font-bold ">
                Search
              </legend>
              <div className="flex justify-between m-6 ">
                <InputLayout description="Tracking ID">
                  <input
                    name="trackingId"
                    value={searchQuery.trackingId ?? ""}
                    onChange={handleInputChange}
                    type="text"
                    className="input input-accent"
                    placeholder="TRK-YYYYMMDD-xxxxxx"
                  />
                </InputLayout>
                <SelectorLayout description="Status">
                  <select
                    name="status"
                    value={searchQuery.status ?? ""}
                    onChange={handleInputChange}
                    className="select select-primary"
                    required
                  >
                    <option disabled>Status Type</option>
                    <option value={"Requested"}>Requested</option>
                    <option value={"Approved"}>Approved</option>
                    <option value={"Dispatched"}>Dispatched</option>
                    <option value={"In Transit"}>In Transit</option>
                    <option value={"Delivered"}>Delivered</option>
                    <option value={"Cancelled"}>Cancelled</option>
                    <option value={"Returned"}>Returned</option>
                  </select>
                </SelectorLayout>
                <SelectorLayout description="Sort By Date">
                  <select
                    name="sort"
                    value={searchQuery.sort ?? ""}
                    onChange={handleInputChange}
                    className="select select-secondary "
                    required
                  >
                    <option disabled>Sort by Date</option>
                    <option value={"asc"}>Ascending</option>
                    <option value={"dsc"}>Descending</option>
                  </select>
                </SelectorLayout>
                <div className="flex place-self-center translate-y-3">
                  <button type="submit" className="btn btn-primary btn-outline">
                    {isFetching ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </aside>

        {status === "pending" ? (
          <>
            <Skeleton/>
          </>
        ) : status === "error" ? (
          <>
            <div>
              Error: {error.message} <br /> Cause: {error.cause as string}
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Tracking ID</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Status</th>
                    <th>Fee</th>
                    <th>Type</th>
                    <th>Pickup Address</th>
                    <th>Delivery Address</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pages.map((group, i) => (
                    <React.Fragment key={i}>
                      {group?.parcels?.map((parcel: Parcel, j: number) => (
                        <tr className="hover:bg-base-300" key={j}>
                          <th>{parcel.trackingId}</th>
                          <td>
                            <div className="tooltip" data-tip={parcel.sender}>
                              {parcel.sender.slice(0, 5) + "..."}
                            </div>
                          </td>
                          <td>
                            <div className="tooltip" data-tip={parcel.receiver}>
                              {parcel.receiver.slice(0, 5) + "..."}
                            </div>
                          </td>
                          <td>{parcel.status}</td>
                          <td>{parcel.fee}</td>
                          <td>{parcel.type}</td>
                          <td>{parcel.pickupAddress}</td>
                          <td>{parcel.deliveryAddress}</td>
                          <td>{formatDate(parcel.createdAt)}</td>
                          <td><Link className="btn btn-info btn-outline rounded-2xl" to={/parcel-status/ + parcel.trackingId}>Status</Link></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className=" flex justify-center items-center m-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetching}
            className="btn btn-primary btn-outline"
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
        <div className="text-center m-4">{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </main>
    </>
  );
}

export default SearchParcels;
