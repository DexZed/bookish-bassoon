import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = { data: object[]; dataKey: string };

function BarChartTable({ data, dataKey }: Props) {
  const getIntroOfPage = (label: string) => {
    switch (label) {
      case "Requested":
        return "Requested Parcels";

      case "Approved":
        return "Approved Parcels";
      case "Pending":
        return "Pending Parcels";
      case "Dispatched":
        return "Dispatched Parcels";
      case "In Transit":
        return "In Transit Parcels";
      case "Delivered":
        return "Delivered Parcels";
      case "Cancelled":
        return "Cancelled Parcels";
      case "Returned":
        return "Returned Parcels";
      case "Total Parcels":
        return "Total Parcels";

      default:
        break;
    }
  };
  const CustomToolTip = ({ active, payload, label }:any) => {
    const isVisible = active && payload && payload.length;
  return (
    <div className="card w-full h-full bg-base-100 shadow-xl rounded-xl flex flex-col justify-center items-center gap-2 m-6" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
        <>
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p>
          <p className="desc">Shows the no of {label} Parcels</p></>
      )}
    </div>
  );
  };
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={CustomToolTip}/>
          <Legend />
          <Bar
            dataKey={dataKey}
            fill="#BBDCE5"
            activeBar={<Rectangle fill="#ECEEDF" stroke="#CFAB8D" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default BarChartTable;
