import React, { useState } from "react";
import { ConfigProvider, Select } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useGetUserAccountCreationQuery } from "../../../redux/features/dashboard/dashboardApi";

const { Option } = Select;

export default function Chart() {
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

    const { data, error, isLoading } = useGetUserAccountCreationQuery(filters);

    const chartData = React.useMemo(() => {
        if (!data) return [];

        const hasDailyData = data.some((item) => item._id && item._id.split("-").length === 3);

        if (hasDailyData) {
            return data.map((item) => {
                const dateParts = item._id.split("-");
                return {
                    name: `${dateParts[2]}`,
                    user: item.totalCount,
                };
            });
        } else {
            return data.map((item) => {
                const monthNum = parseInt(item._id.split("-")[1]);
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                return {
                    name: monthNames[monthNum - 1],
                    user: item.totalCount,
                };
            });
        }
    }, [data]);

    console.log("data", data);
    console.log(error);
    console.log(isLoading);

    return (
        <div className="my-8 mt-8 bg-bgColor shadow-md rounded-lg px-3 pt-1 text-textGray ">
            <div className="flex items-center justify-between my-4 ">
                <h1 className="text-4xl font-medium text-[#1A1A1A]">Total Growth of User</h1>
                <div className="flex flex-col   gap-y-4">
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
            </div>
            <ResponsiveContainer width="100%" height={260}>
                <BarChart width={20} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} strokeWidth={0.68} />
                    <XAxis dataKey="name" axisLine={false} />
                    <YAxis axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="user" fill="#00A430" barSize={30} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
