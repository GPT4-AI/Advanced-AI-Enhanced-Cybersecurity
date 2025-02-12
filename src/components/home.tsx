import React from "react";
import Header from "./dashboard/Header";
import ThreatOverview from "./dashboard/ThreatOverview";
import MetricsGrid from "./dashboard/MetricsGrid";

interface HomeProps {
  systemStatus?: {
    status: "normal" | "warning" | "critical";
    message: string;
    timestamp: string;
    activeThreats: number;
    systemsAffected: number;
  };
  networkData?: any;
  threatsData?: any;
  behaviorData?: any;
  responseData?: any;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onViewDetails?: () => void;
  onIsolateAll?: () => void;
}

const defaultSystemStatus = {
  status: "warning" as const,
  message: "Potential security threats detected",
  timestamp: new Date().toISOString(),
  activeThreats: 3,
  systemsAffected: 2,
};

const Home = ({
  systemStatus = defaultSystemStatus,
  networkData,
  threatsData,
  behaviorData,
  responseData,
  onSettingsClick = () => {},
  onNotificationsClick = () => {},
  onProfileClick = () => {},
  onViewDetails = () => {},
  onIsolateAll = () => {},
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header
        systemStatus={systemStatus}
        onSettingsClick={onSettingsClick}
        onNotificationsClick={onNotificationsClick}
        onProfileClick={onProfileClick}
      />
      <main className="container mx-auto p-4 space-y-4">
        <ThreatOverview
          status={systemStatus}
          onViewDetails={onViewDetails}
          onIsolateAll={onIsolateAll}
        />
        <MetricsGrid
          networkData={networkData}
          threatsData={threatsData}
          behaviorData={behaviorData}
          responseData={responseData}
        />
      </main>
    </div>
  );
};

export default Home;
