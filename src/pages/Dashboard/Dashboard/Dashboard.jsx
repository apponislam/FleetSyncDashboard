import Card from "./Card"
import Chart from "./Chart"
import QuotesChart from "./QuotesChart"



const Dashboard = () => {
  return (
      <div className="">
            <div className="col-span-4">
                <Card />
            </div>
                <div className=" col-span-8">
                <QuotesChart />
            </div>
            <div className="col-span-8 ">
                <Chart />
            </div>

          
          
            
        </div>
  )
}

export default Dashboard
