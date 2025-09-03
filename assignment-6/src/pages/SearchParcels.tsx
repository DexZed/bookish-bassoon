import { useEffect, useMemo, useState } from "react";
import InputLayout from "../components/InputLayout";
import SelectorLayout from "../components/SelectorLayout";
import type { Parcel } from "../interfaces/globalInterfaces";
type Props = {};
const PAGE_SIZE = 10;
function SearchParcels({}: Props) {
  const [all, setAll] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0); // 0-based
  const [filters, setFilters] = useState<{
    trackingId: string;
    status: string; // empty = all
    sort: "asc" | "dsc";
  }>({
    trackingId: "",
    status: "",
    sort: "asc",
  });
  // 1) Fetch everything once (server need not support pagination)
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:3000/search-parcels", {
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Parcel[] = await res.json();
        setAll(data);
      } catch (e: any) {
        if (e?.name !== "AbortError") setError(String(e));
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);
  const filtered = useMemo(() => {
    let out = all;

    const q = filters.trackingId.trim().toLowerCase();
    if (q) out = out.filter((p) => p.trackingId?.toLowerCase().includes(q));

    if (filters.status) out = out.filter((p) => p.status === filters.status);

    switch (filters.sort) {
      case "dsc":
        out = [...out].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "asc":
        out = [...out].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
    }

    return out;
  }, [all, filters]);
  useEffect(() => setPage(0), [filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () =>
    setFilters({ trackingId: "", status: "", sort: "dsc" });

  const next = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const prev = () => setPage((p) => Math.max(p - 1, 0));

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Oops: {error}</p>;
  return (
    <>
      <main>
        <aside>
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="text-center text-2xl font-bold ">
                Search
              </legend>
              <div className="flex justify-between m-6 ">
                <InputLayout
                  description="Tracking ID"
                  // errorDescription={
                  //   errors.trackingId && `${errors.trackingId?.message}`
                  // }
                >
                  <input
                    // {...register("trackingId", {
                    //   validate: validateTrackingId,
                    // })}
                    type="text"
                    className="input input-accent"
                    placeholder="TRK-YYYYMMDD-xxxxxx"
                  />
                </InputLayout>
                <SelectorLayout
                  description="Status"
                  // errorDescription={
                  //   errors.status && `${errors.status?.message}`
                  // }
                >
                  <select
                    // {...register("status")}
                    className="select select-primary"
                    required
                    defaultValue={""}
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
                <SelectorLayout
                  description="Sort"
                  // errorDescription={errors.sort && `${errors.sort?.message}`}
                >
                  <select
                    //{...register("sort")}
                    className="select select-secondary "
                    required
                    defaultValue={""}
                  >
                    <option disabled>Sort by Date</option>
                    <option value={"asd"}>Ascending</option>
                    <option value={"dsc"}>Descending</option>
                  </select>
                </SelectorLayout>
                <div className="flex place-self-center translate-y-3">
                  <button type="submit" className="btn btn-primary btn-outline">
                    {/* {isSubmitting ? "Searching..." : "Search"} */} Search
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </aside>
        {/* {isPending ? (
          <>
            <div>Loading...</div>
          </>
        ) : isError ? (
          <>
            <div>Error: {error.message}</div>
          </>
        ) : ( */}
        <>
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
                </tr>
              </thead>
              <tbody>
                {/* row 2 */}
                {data?.parcels.map((parcel: Parcel, idx: number) => {
                  return (
                    <tr className="hover:bg-base-300" key={idx}>
                      <td>{parcel.trackingId}</td>
                      <td>{parcel.sender}</td>
                      <td>{parcel.receiver}</td>
                      <td>{parcel.status}</td>
                      <td>{parcel.fee}</td>
                      <td>{parcel.type}</td>
                      <td>{parcel.pickupAddress}</td>
                      <td>{parcel.deliveryAddress}</td>
                      <td>{parcel.createdAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
        {/* )} */}
        <div>
          <button
            onClick={() => loadMore()}
            className="btn btn-primary btn-outline"
            //disabled={!data?.hasMore}
          >
            {/* {isFetching ? "Loading..." : "Load More"} */} Load More
          </button>
        </div>
      </main>
    </>
  );
}

export default SearchParcels;
