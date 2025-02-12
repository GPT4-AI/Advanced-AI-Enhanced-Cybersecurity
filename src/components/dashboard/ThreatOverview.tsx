import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, ShieldAlert, AlertTriangle } from "lucide-react";

interface SystemStatus {
  status: "normal" | "warning" | "critical";
  activeThreats: number;
  systemsAffected: number;
  lastUpdated: string;
}

interface ThreatOverviewProps {
  status?: SystemStatus;
  onViewDetails?: () => void;
  onIsolateAll?: () => void;
}

const defaultStatus: SystemStatus = {
  status: "warning",
  activeThreats: 3,
  systemsAffected: 2,
  lastUpdated: new Date().toISOString(),
};

const ThreatOverview = ({
  status = defaultStatus,
  onViewDetails = () => {},
  onIsolateAll = () => {},
}: ThreatOverviewProps) => {
  const getStatusConfig = (status: SystemStatus["status"]) => {
    switch (status) {
      case "critical":
        return {
          icon: <ShieldAlert className="h-12 w-12 text-red-500" />,
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/20",
          label: "Critical Security Alert",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-12 w-12 text-yellow-500" />,
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/20",
          label: "Security Warning",
        };
      default:
        return {
          icon: <Shield className="h-12 w-12 text-green-500" />,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/20",
          label: "System Secure",
        };
    }
  };

  const statusConfig = getStatusConfig(status.status);

  return (
    <Card className="w-full bg-background border-border">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-4">
            {statusConfig.icon}
            <div>
              <Badge
                className={`${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor}`}
              >
                {statusConfig.label}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Last updated:{" "}
                {new Date(status.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="text-3xl font-bold">{status.activeThreats}</div>
            <div className="text-sm text-muted-foreground">Active Threats</div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="text-3xl font-bold">{status.systemsAffected}</div>
            <div className="text-sm text-muted-foreground">
              Systems Affected
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Button variant="outline" onClick={onViewDetails}>
              View Details
            </Button>
            {(status.status === "warning" || status.status === "critical") && (
              <Button variant="destructive" onClick={onIsolateAll}>
                Isolate All
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatOverview;
