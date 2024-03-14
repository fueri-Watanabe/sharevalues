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
        width={400}
        height={170}
        data={data}
        layout="vertical"
        stackOffset="expand"
        className="text-xs"
      >
        <XAxis type="number" hide />
        <YAxis type="category" hide />
        {data[0].lowValue > 0 && (
          <Bar
            dataKey="lowValue"
            stackId="a"
            className="fill-blue-500 dark:fill-blue-800"
          >
            <LabelList dataKey="lowName" fill="white" position="inside" />
          </Bar>
        )}
        {data[0].justValue > 0 && (
          <Bar
            dataKey="justValue"
            stackId="a"
            className="fill-slate-500 dark:fill-slate-800"
          >
            <LabelList dataKey="justName" fill="white" position="inside" />
          </Bar>
        )}
        {data[0].highValue > 0 && (
          <Bar
            dataKey="highValue"
            stackId="a"
            className="fill-red-500 dark:fill-red-800"
          >
            <LabelList dataKey="highName" fill="white" position="inside" />
          </Bar>
        )}
      </BarChart>
    </>
  );
};
export default BarChartComponent;
