

type Props = {}

function SearchParcels({}: Props) {
  return (
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
      <tr className="hover:bg-base-300">
        <th>1232141</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
        <td>200</td>
        <td>Other</td>
        <td>123 avenue</td>
        <td>456 avenue</td>
        <td>26th May 2023</td>
      </tr>
    </tbody>
  </table>
</div>
    </>
  )
}

export default SearchParcels