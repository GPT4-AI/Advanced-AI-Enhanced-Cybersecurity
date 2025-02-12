import React from "react";
import NetworkTrafficWidget from "./widgets/NetworkTrafficWidget";
import ActiveThreatsWidget from "./widgets/ActiveThreatsWidget";
import UserBehaviorWidget from "./widgets/UserBehaviorWidget";
import ResponseStatusWidget from "./widgets/ResponseStatusWidget";

interface MetricsGridProps {
  networkData?: any;
  threatsData?: any;
  behaviorData?: any;
  responseData?: any;
}

const MetricsGrid = ({
  networkData,
  threatsData,
  behaviorData,
  responseData,
}: MetricsGridProps = {}) => {
  return (
    <div className="w-full h-full bg-background p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
        <div className="w-full h-full min-h-[350px]">
          <NetworkTrafficWidget data={networkData} />
        </div>
        <div className="w-full h-full min-h-[350px]">
          <ActiveThreatsWidget threats={threatsData} />
        </div>
        <div className="w-full h-full min-h-[350px]">
          <UserBehaviorWidget
            activities={behaviorData?.activities}
            behaviorData={behaviorData?.data}
          />
        </div>
        <div className="w-full h-full min-h-[350px]">
          <ResponseStatusWidget playbooks={responseData} />
        </div>
      </div>
    </div>
  );
};

export default MetricsGrid;
