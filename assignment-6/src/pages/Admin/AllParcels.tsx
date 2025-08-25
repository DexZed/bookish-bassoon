function AllParcels() {
  const arr=[1,2,3,4,5]
  return (
    <>
      <article>
        <h2 className="text-3xl font-bold text-center mb-4 mt-4">
          All Parcels
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>company</th>
                <th>location</th>
                <th>Last Login</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((_,idx)=>(
                <tr key={idx}>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>Blue</td>
              </tr>
              ))}
            </tbody>
            
          </table>
        </div>
      </article>
    </>
  );
}

export default AllParcels;
