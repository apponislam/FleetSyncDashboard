import { useState } from 'react';
import { Select } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const { Option } = Select;
const data = [
    // { name: 'Jan', uv: 4000,  amt: 2400 },
    { name: 'Jan', uv: 3000,  amt: 2400 },
    { name: 'Feb', uv: 3500, amt: 2210 },
    { name: 'Mar', uv: 2000,  amt: 2290 },
    { name: 'Apr', uv: 2780,  amt: 2000 },
    { name: 'May', uv: 1890,  amt: 2181 },
    { name: 'Jun', uv: 2890,  amt: 2500 },
    { name: 'Jul', uv: 3490,  amt: 2100 },
    { name: 'Aug', uv: 3990,  amt: 2100 },
    { name: 'Sep', uv: 3490,  amt: 2100 },
    { name: 'Oct', uv: 4490,  amt: 2100 },
    { name: 'Nov', uv: 3490,  amt: 2100 },
    { name: 'Dec', uv: 2490,  amt: 2100 },
];
const CustomTooltip = ({ payload}) => {
    if (payload && payload.length) {
        const value = payload[0].value;

        return (
            <div className='flex items-center gap-1'
                style={{
                    backgroundColor: 'black',
                    padding: '10px',
                    borderRadius: '5px',
                    color: '#fff',
                    fontSize: '14px',
                }}
            >

                <p className="h-2 w-2 bg-primary rounded-full"></p> <p>{`${value}tn`}</p>
            </div>
        );
    }

    return null;
};

export default function SalesChart() {
    const [selectedYear, setSelectedYear] = useState('Year');

    const handleYearChange = (value) => {
        setSelectedYear(value);
    };

    return (
        <div className="my-4 bg-bgColor shadow-md rounded-lg px-3 pt-1 text-textGray ">
            <div className="flex items-center justify-between my-4 ">
                <h1 className="font-bold text-[20px]">Sold Fertiliser  <span className='font-normal'>Statistics</span></h1>
                <div className="flex justify-center items-center gap-7">
                   
                    <div>
                        <Select value={selectedYear} onChange={handleYearChange} className="w-32 h-[30px] ">
                            <Option value="2025">2025</Option>
                            <Option value="2026">2026</Option>
                            <Option value="2027">2027</Option>
                            <Option value="2028">2028</Option>
                            <Option value="2029">2029</Option>
                            <Option value="2030">2030</Option>
                        </Select>
                    </div>
                </div>
            </div>
              <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
               <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6DBD44" stopOpacity={1} />
        <stop offset="100%" stopColor="#6DBD44" stopOpacity={0} />
      </linearGradient>
    </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          
             <Tooltip content={<CustomTooltip />} />
          <Area   dataKey="uv" stroke="#6DBD44" fill="none" />
        </AreaChart>
      </ResponsiveContainer>
        </div>
    );
}
