import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Bell, Settings, User, AlertCircle } from "lucide-react";

interface SystemStatus {
  status: "normal" | "warning" | "critical";
  message: string;
  timestamp: string;
}

interface HeaderProps {
  systemStatus?: SystemStatus;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
}

const defaultSystemStatus: SystemStatus = {
  status: "normal",
  message: "All systems operational",
  timestamp: new Date().toISOString(),
};

const Header = ({
  systemStatus = defaultSystemStatus,
  onSettingsClick = () => {},
  onNotificationsClick = () => {},
  onProfileClick = () => {},
}: HeaderProps) => {
  const getStatusColor = (status: SystemStatus["status"]) => {
    switch (status) {
      case "critical":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <header className="w-full h-16 px-6 bg-background border-b border-border flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">Security Dashboard</h1>
        </div>
        <Badge
          variant="secondary"
          className={`${getStatusColor(systemStatus.status)} text-white`}
        >
          {systemStatus.status === "normal" ? (
            "System Normal"
          ) : (
            <span className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {systemStatus.status.charAt(0).toUpperCase() +
                systemStatus.status.slice(1)}
            </span>
          )}
        </Badge>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationsClick}
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onSettingsClick}>
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onProfileClick}>
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
