
import CustomSearch from "../../../Components/Shared/CustomSearch"
import Filter from "../../../Components/Shared/Filter"
import VerificationTable from "./VerificationTable"


const Verifications = () => {
  return (
          <div className="p-4">
      <div className="flex justify-end  mb-5 mx-2 gap-x-2"><CustomSearch></CustomSearch> <Filter></Filter> </div>

     <VerificationTable></VerificationTable>
    </div>
  )
}

export default Verifications