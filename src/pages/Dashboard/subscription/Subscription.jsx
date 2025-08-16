import { Tabs, ConfigProvider } from "antd";
import TabLabel1 from "./TabLabel1";
import UserSubscription from "./UserSubscription";
import TabLabel2 from "./TabLabel2";
import SubscriptionManagment from "./SubscriptionManagment";

const Subscription = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemActiveColor: "#00A430", // Active text color
            itemSelectedColor: "#00A430", // Selected tab text color
            itemHoverColor: "#00A430", // Hover text color
            inkBarColor: "#00A430", // The underline color for active tab
          },
        },
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: <TabLabel1 />,
            key: "1",
            children: <UserSubscription />,
          },
          {
            label: <TabLabel2 />,
            key: "2",
            children: <SubscriptionManagment />,
          },
        ]}
      />
    </ConfigProvider>
  );
};

export default Subscription;
