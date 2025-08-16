
   import { PlusOutlined } from "@ant-design/icons";
import PromotionalTable from "./PromotionalTable"


const Promotional = () => {
  return (
           <div className="p-4">
      <div className="flex justify-end  my-5 mx-2 gap-x-2"> 
        
        <div className="flex items-center justify-center gap-x-2 px-8   py-2 rounded-3xl font-medium bg-[#00A430] text-white!">
            <PlusOutlined className="!text-white" />
           <button className=""> Add More</button>  </div></div>
<PromotionalTable ></PromotionalTable>
    </div>
  )
}

export default Promotional