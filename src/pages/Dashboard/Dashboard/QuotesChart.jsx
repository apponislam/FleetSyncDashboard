import React, { useState } from "react";
import { ConfigProvider, Select } from "antd";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useGetGeneralStatsQuery } from "../../../redux/api/generalStatsApi";
import { useGetRevenueQuery } from "../../../redux/features/dashboard/dashboardApi";

const { Option } = Select;

// const data = [
//     { name: "Jan", uv: 3000 },
//     { name: "Feb", uv: 3500 },
//     { name: "Mar", uv: 2000 },
//     { name: "Apr", uv: 2780 },
//     { name: "May", uv: 1890 },
//     { name: "Jun", uv: 2890 },
//     { name: "Jul", uv: 3490 },
//     { name: "Aug", uv: 3990 },
//     { name: "Sep", uv: 3490 },
//     { name: "Oct", uv: 4490 },
//     { name: "Nov", uv: 3490 },
//     { name: "Dec", uv: 2490 },
// ];

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
                    transform: "translateY(-50%)",
                }}
            >
                {/* Tooltip Box */}
                <div
                    style={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: "14px",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                        zIndex: 2,
                        marginBottom: "8px",
                    }}
                >
                    {payload[0].value}
                </div>

                {/* Pointer Container (30x30px) - FULL ROUND */}
                <div
                    style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#000000",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "#00A430",
                            border: "3px solid #fff",
                        }}
                    ></div>
                </div>
            </div>
        );
    }
    return null;
};

export default function QuotesChart() {
    const { data: activeRole, error, isLoading } = useGetGeneralStatsQuery();

    const currentYear = new Date().getFullYear();

    const [filters, setFilters] = useState({ year: currentYear });

    const handleYearChange = (year) => {
        setFilters((prev) => ({ ...prev, year }));
    };

    const handleMonthSelect = (month) => {
        if (month >= 1 && month <= 12) {
            setFilters((prev) => ({ ...prev, month }));
        } else {
            setFilters((prev) => {
                const { month: _, ...rest } = prev;
                return rest;
            });
        }
    };

    const monthOptions = [
        <Option key="placeholder" value={null}>
            Month
        </Option>,
        <Option value={1}>January</Option>,
        <Option value={2}>February</Option>,
        <Option value={3}>March</Option>,
        <Option value={4}>April</Option>,
        <Option value={5}>May</Option>,
        <Option value={6}>June</Option>,
        <Option value={7}>July</Option>,
        <Option value={8}>August</Option>,
        <Option value={9}>September</Option>,
        <Option value={10}>October</Option>,
        <Option value={11}>November</Option>,
        <Option value={12}>December</Option>,
    ];

    console.log(filters);

    const { data: revenueData, error: revenueError, isLoading: revenueLoading } = useGetRevenueQuery(filters);

    const chartData = React.useMemo(() => {
        if (!revenueData) return [];

        if (revenueData.type === "monthly-daily-breakdown") {
            return revenueData.dayData.map((day) => ({
                name: `Day ${day.day}`,
                uv: day.totalRevenue,
                fullDate: `${day.year}-${day.month.toString().padStart(2, "0")}-${day.day.toString().padStart(2, "0")}`,
            }));
        } else if (revenueData.type === "yearly") {
            // For yearly data with monthData
            return revenueData.monthData.map((month) => ({
                name: new Date(month.year, month.month - 1).toLocaleString("default", { month: "short" }),
                uv: month.totalRevenue,
                fullDate: `${month.year}-${month.month.toString().padStart(2, "0")}`,
            }));
        }

        return [];
    }, [revenueData]);

    console.log(revenueLoading);
    console.log(revenueError);

    if (isLoading) return <p className="">Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const mainRoles = activeRole?.activeRole || [];

    return (
        <div className="flex flex-col mt-10  items-center lg:flex-row gap-4">
            <div className=" w-full shadow-md rounded-lg px-4 py-8 ">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-medium text-[#1A1A1A]">My Reveneu</h1>
                    <div className="flex items-center gap-2">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        optionFontSize: 14,
                                        optionPadding: "8px 16px",
                                        controlHeight: 36,
                                        borderRadius: 0,
                                        colorText: "#1A1A1A",
                                        selectorBg: "#ffffff",
                                    },
                                },
                            }}
                        >
                            <Select
                                value={filters.year}
                                onChange={handleYearChange}
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
                                {Array.from({ length: 10 }, (_, i) => {
                                    const year = new Date().getFullYear() - 5 + i;
                                    return (
                                        <Option key={year} value={year}>
                                            {year}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </ConfigProvider>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        optionFontSize: 14,
                                        optionPadding: "8px 16px",
                                        controlHeight: 36,
                                        borderRadius: 0,
                                        colorText: "#1A1A1A",
                                        selectorBg: "#ffffff",
                                    },
                                },
                            }}
                        >
                            <Select
                                value={filters.month || null}
                                onChange={handleMonthSelect}
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
                                {monthOptions}
                            </Select>
                        </ConfigProvider>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00A430" stopOpacity={1} />
                                <stop offset="50%" stopColor="#00A430" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} strokeWidth={0.68} />
                        <YAxis dataKey="uv" axisLine={false} />
                        <XAxis dataKey="name" axisLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#00A430", strokeWidth: 2, strokeDasharray: "5 5" }} />
                        <Area type="monotone" dataKey="uv" stroke="#008A4F" strokeWidth={2} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="lg:w-md w-full bg-white p-4 h-fit pb-4 rounded-xl shadow-md">
                <h2 className="text-3xl text-[#1F1F1F] font-semibold mb-4">Active Role</h2>

                {mainRoles.map((role, idx) => (
                    <div key={idx} className="mb-4">
                        {/* Role Title & Percentage */}
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[#2B2B37] text-xl font-semibold">{role.role}</span>
                            <span className="text-green-600 font-medium">{role.percentage}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${role.percentage}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
