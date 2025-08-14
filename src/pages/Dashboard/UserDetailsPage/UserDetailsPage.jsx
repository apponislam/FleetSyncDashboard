import React from 'react'
import CustomSearch from '../../../Components/Shared/CustomSearch'
import Filter from '../../../Components/Shared/Filter'
import UserManagementTable from './UserManagementTable'


const UserDetailsPage = () => {
  return (
       <div className="p-4">
      <div className="flex justify-end  mb-5 mx-2 gap-x-2"><CustomSearch></CustomSearch> <Filter></Filter> </div>

     <UserManagementTable></UserManagementTable>
    </div>
  )
}

export default UserDetailsPage;