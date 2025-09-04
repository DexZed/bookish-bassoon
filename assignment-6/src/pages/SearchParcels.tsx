import InputLayout from "../components/InputLayout";
import SelectorLayout from "../components/SelectorLayout";
type Props = {};

function SearchParcels({}: Props) {
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
                <InputLayout description="Tracking ID">
                  <input
                    type="text"
                    className="input input-accent"
                    placeholder="TRK-YYYYMMDD-xxxxxx"
                  />
                </InputLayout>
                <SelectorLayout description="Status">
                  <select
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
                <SelectorLayout description="Sort">
                  <select
                    className="select select-secondary "
                    required
                    defaultValue={""}
                  >
                    <option disabled>Sort by Date</option>
                    <option value={"asc"}>Ascending</option>
                    <option value={"dsc"}>Descending</option>
                  </select>
                </SelectorLayout>
                <div className="flex place-self-center translate-y-3">
                  <button type="submit" className="btn btn-primary btn-outline">
                    Search
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </aside>

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
              <tr className="hover:bg-base-300"></tr>
            </tbody>
          </table>
        </div>

        <div></div>
      </main>
    </>
  );
}

export default SearchParcels;
