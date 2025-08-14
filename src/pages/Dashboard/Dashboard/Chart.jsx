import { useState } from "react";
import { ConfigProvider, Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { Option } = Select;

const data = [
  { name: "Jan",  user: 6700 },
  { name: "Feb",  user: 5100 },
  { name: "Mar",  user: 3800 },           
  { name: "Apr",user: 3950 },
  { name: "May", user: 5400 },
  { name: "Jun",  user: 5100 },
  { name: "Jul",  user: 5800 },
  { name: "Aug",  user: 4600 },
  { name: "Sep",  user: 4450 },
  { name: "Oct",  user: 5400 },
  { name: "Nov",  user: 4200 },
  { name: "Dec",  user: 3550 },
];

export default function Chart() {
  const [selectedMonth, setSelectedMonth] = useState("Monthly");

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  return (
    <div className="my-8 mt-8 bg-bgColor shadow-md rounded-lg px-3 pt-1 text-textGray ">
      <div className="flex items-center justify-between my-4 ">
        <h1 className="text-4xl font-medium text-[#1A1A1A]">
          Total Growth of User 
        </h1>
        <div className="flex flex-col   gap-y-4">
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    optionFontSize: 14,
                    optionPadding: "8px 12px",
                    colorText: "#1A1A1A",
                    selectorBg: "#FFFFFF",
                    borderRadius: 4,
                    controlHeight: 30,
                  },
                },
              }}
            >
              <Select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="w-26 font-semibold text-[#1A1A1A]"
                dropdownStyle={{
                  fontSize: "14px",
                  padding: "8px 12px",
                }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 14,
                border: "1px solid #E6F9F1",
                  padding: "16px 0",
                  height: "40px",
                  boxShadow: "none",
                  fontWeight: 600,
                }}
                bordered={false}
              >
                <Option value="Monthly">Monthly</Option>
                <Option value="January">January</Option>
                <Option value="February">February</Option>
                <Option value="March">March</Option>
              </Select>
            </ConfigProvider>
          </div>
      
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart width={20} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="user"
            fill="#00A430"
            barSize={30}
            radius={[4, 4, 0, 0]}
          />
      
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
