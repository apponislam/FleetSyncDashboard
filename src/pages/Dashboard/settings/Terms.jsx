
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Terms = () => {
  return (
     <div>

               <div className="flex items-center my-10 text-2xl">
        <Link to={'/settings'} className="text-xl"><FaArrowLeft className="text-[#00A430] mr-2 cursor-pointer" /></Link>

        <h2 className="text-[#00A430]  font-semibold">
          Terms and Conditions
        </h2>
      </div>

        <div className=" bg-white shadow rounded-2xl p-6 md:p-12 text-gray-600 md:text-lg font-medium space-y-8">
            <div className="self-stretch text-justify justify-start  md:leading-7 tracking-tight">Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.</div>
            <div className="self-stretch text-justify justify-start   md:leading-7 tracking-tight">Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. </div>

         <div className="flex  items-end ">
<button className="bg-[#00A430] hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium">
            Edit Details
          </button>
</div>

        </div>
    </div>
  )
}

export default Terms