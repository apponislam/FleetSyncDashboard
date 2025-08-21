import { Dropdown, Menu } from "antd";

const Filter = ({ setFilter }) => {
    const menuItems = [
        { key: "driver", label: "Driver" },
        { key: "mechanic", label: "Mechanic" },
        { key: "admin", label: "Admin" },
        { key: "cook", label: "Cook" },
        { key: "fuel_provider", label: "Fuel Provider" },
    ];

    const menu = (
        <Menu
            items={menuItems}
            onClick={(info) => {
                setFilter(info.key); // Send filter value to parent
            }}
        />
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <div className="bg-[#00A430] px-4 rounded-full cursor-pointer flex justify-center items-center">
                <img src="/filter.png" className="h-6" alt="filter" />
            </div>
        </Dropdown>
    );
};

export default Filter;
