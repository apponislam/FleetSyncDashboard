import { useState } from "react";
import { ConfigProvider, Select } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Option } = Select;

const data = [
  { name: "Jan", uv: 3000 },
  { name: "Feb", uv: 3500 },
  { name: "Mar", uv: 2000 },
  { name: "Apr", uv: 2780 },
  { name: "May", uv: 1890 },
  { name: "Jun", uv: 2890 },
  { name: "Jul", uv: 3490 },
  { name: "Aug", uv: 3990 },
  { name: "Sep", uv: 3490 },
  { name: "Oct", uv: 4490 },
  { name: "Nov", uv: 3490 },
  { name: "Dec", uv: 2490 },
];
const CustomTooltip = ({ payload, active }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        {/* Tooltip Box */}
        <div
          style={{
            backgroundColor: "#F8E45C",
            color: "#000000",
            fontWeight: "bold",
            fontSize: "14px",
            padding: "8px 14px",
            borderRadius: "8px",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
            zIndex: 2,
          }}
        >
          {payload[0].value}
        </div>

        {/* ▼ Downward Arrow */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "6px solid #F8E45C",
            marginTop: "2px",
          }}
        ></div>

        {/* Dot */}
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: "4px solid #F8E45C",
            marginTop: "2px",
            zIndex: 1,
          }}
        ></div>
      </div>
    );
  }
  return null;
};

export default function UserdetailsChart() {
  const [selectedMonth, setSelectedMonth] = useState("Monthly");

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  return (
    <div className="mt-10  shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-[#1A1A1A]">Corrected Prediction Growth</h1>
        <ConfigProvider
          theme={{
            components: {
              Select: {
                optionFontSize: 14,
                optionPadding: "8px 16px",
                controlHeight: 36, // vertical padding
                borderRadius: 0, // flat corners
                colorText: "#1A1A1A",
                selectorBg: "#F8E45C",
              },
            },
          }}
        >
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="w-26 font-semibold text-[#1A1A1A]"
            variant="borderless"
            style={{
              background: "linear-gradient(to right, #DDB861, #F8E45C)",
              height: "40px",
              padding: "6px 0",
              fontWeight: 600,
              borderRadius: 0,
              display: "flex",
              alignItems: "center",
              gap: 0,
            }}
            popupMatchSelectWidth={false}
            styles={{
              popup: {
                root: {
                  color: "#1A1A1A",
                  fontSize: 14,
                  padding: "8px 12px",
                },
              },
            }}
          >
            <Option value="Monthly">Monthly</Option>
            <Option value="January">January</Option>
            <Option value="February">February</Option>
            <Option value="March">March</Option>
          </Select>
        </ConfigProvider>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="uv" />
          <XAxis dataKey="name" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#0B3666"
            strokeWidth={2}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}