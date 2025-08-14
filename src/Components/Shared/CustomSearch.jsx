import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const CustomSearch = ({ setSearch, search }) => {



  return (
 <div className="flex items-center bg-transparent border border-black rounded-xl px-2 py-1 w-full lg:w-[234px] h-14">
  <SearchOutlined className="!text-[#6D717F] text-sm" />
  <Input
    placeholder="Search here"
    onChange={(e) => setSearch(e.target.value)}
    value={search}
    bordered={false}
    className="focus:outline-none w-full pl-2"
  />
</div>

  );
};

export default CustomSearch;