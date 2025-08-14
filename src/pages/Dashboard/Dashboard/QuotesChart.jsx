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
            backgroundColor: "#00A430",
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
            borderTop: "6px solid #00A430",
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
            border: "4px solid #00A430",
            marginTop: "2px",
            zIndex: 1,
          }}
        ></div>
      </div>
    );
  }
  return null;
};

export default function QuotesChart() {
  const [selectedMonth, setSelectedMonth] = useState("Monthly");

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };
  const roles = [
    { name: "Driver", percent: 64 },
    { name: "Company", percent: 64 },
    { name: "Mechanics", percent: 64 },
    { name: "Cook", percent: 64 },
    { name: "Fuel Provider", percent: 64 },
  ];
  return (
    <div className="flex flex-col mt-10  items-center lg:flex-row gap-4">
      <div className=" w-full shadow-md rounded-lg px-4 py-8 ">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-medium text-[#1A1A1A]">My Reveneu</h1>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  optionFontSize: 14,
                  optionPadding: "8px 16px",
                  controlHeight: 36, // vertical padding
                  borderRadius: 0, // flat corners
                  colorText: "#1A1A1A",
                  selectorBg: "#ffffff",
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
                background: "#ffffff",
                height: "40px",
                padding: "6px 0",
                fontWeight: 600,
                borderRadius: 14,
                border: "1px solid #E6F9F1",
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
                <stop offset="0%" stopColor="#00A430" stopOpacity={1} />
                <stop offset="50%" stopColor="#00A430" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="uv" />
            <XAxis dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#008A4F"
              strokeWidth={2}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="lg:w-md w-full bg-white p-4 h-fit pb-4 rounded-xl shadow-md">
        <h2 className="text-3xl text-[#1F1F1F] font-semibold mb-4">
          Active Role
        </h2>

        {roles.map((role, idx) => (
          <div key={idx} className="mb-4">
            {/* Role Title & Percentage */}
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#2B2B37] text-xl font-semibold">
                {role.name}
              </span>
              <span className="text-green-600 font-medium">
                {role.percent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${role.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
