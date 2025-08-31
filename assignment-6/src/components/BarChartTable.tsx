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

type Props = {data:object[],dataKey:string};

function BarChartTable({data,dataKey}: Props) {
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
          <Tooltip />
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
