import EditableListCompanies from "./EditableListCompanies";
import EditableListTrucks from "./EditableListTrucks";

const Promotion = () => {
  const promotionData = {
  "companies": ["Company One", "Company Two", "Company Three", "Company Four"],
  "trucks": ["Truck One", "Truck Two", "Truck Three", "Truck Four"]
}
  return (
    <div className="p-6 grid grid-cols-1 gap-8">
      <EditableListCompanies initialItems={promotionData.companies} />
      <EditableListTrucks initialItems={promotionData.trucks} />
    </div>
  );
};

export default Promotion;