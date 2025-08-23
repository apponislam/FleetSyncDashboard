import { Dropdown } from "antd";

const Filter = ({ setFilter }) => {
    const menuItems = [
        { key: "driver", label: "Driver" },
        { key: "mechanic", label: "Mechanic" },
        { key: "admin", label: "Admin" },
        { key: "cook", label: "Cook" },
        { key: "fuel_provider", label: "Fuel Provider" },
    ];

    return (
        <Dropdown
            menu={{
                items: menuItems,
                onClick: (info) => {
                    setFilter(info.key);
                },
            }}
            trigger={["click"]}
            placement="bottomRight"
        >
            {/* 👇 Must be exactly one child element */}
            <div className="bg-[#00A430] px-4 rounded-full cursor-pointer flex justify-center items-center">
                <img src="/filter.png" className="h-6" alt="filter" />
            </div>
        </Dropdown>
    );
};

export default Filter;
