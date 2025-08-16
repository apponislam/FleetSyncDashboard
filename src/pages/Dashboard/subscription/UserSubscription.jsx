
import CustomSearch from '../../../Components/Shared/CustomSearch'
import Filter from '../../../Components/Shared/Filter'
import UserSubscriptionTable from './UserSubscriptionTable'

const UserSubscription = () => {
  return (
        <div className="p-4">
      <div className="flex justify-end  mb-5 mx-2 gap-x-2"><CustomSearch></CustomSearch> <Filter></Filter> </div>

     <UserSubscriptionTable></UserSubscriptionTable>
    </div>
  )
}

export default UserSubscription