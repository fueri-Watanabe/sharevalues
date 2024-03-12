import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const BarChartComponent = ({ values }: { values: any }) => {
  const data = [
    {
      lowName: "低い",
      lowValue: values.lowValue,
      justName: "ジャスト",
      justValue: values.justValue,
      highName: "高い",
      highValue: values.highValue,
    },
  ];

  return (
    <>
      <BarChart
        width={500}
        height={170}
        data={data}
        layout="vertical"
        stackOffset="expand"
      >
        <XAxis type="number" hide />
        <YAxis type="category" hide />
        <Bar dataKey="lowValue" stackId="a" className="fill-red-900">
          <LabelList dataKey="lowName" fill="white" position="top" />
        </Bar>
        <Bar dataKey="justValue" stackId="a" fill="#285A64">
          <LabelList dataKey="justName" fill="white" position="top" />
        </Bar>
        <Bar dataKey="highValue" stackId="a" className="fill-sky-600">
          <LabelList dataKey="highName" fill="white" position="top" />
        </Bar>
      </BarChart>
    </>
  );
};
export default BarChartComponent;
