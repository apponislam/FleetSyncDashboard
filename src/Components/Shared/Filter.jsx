import { Dropdown, Menu } from "antd";

const Filter = () => {
  const menuItems = [
    { key: "driver", label: "Driver" },
    { key: "company", label: "Company" },
    { key: "mechanic", label: "Mechanic" },
    { key: "active", label: "Active" },
    { key: "ban", label: "Ban" },
  ];

  const menu = (
    <Menu
      items={menuItems}
      onClick={(info) => {
        console.log("Selected:", info.key);
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
