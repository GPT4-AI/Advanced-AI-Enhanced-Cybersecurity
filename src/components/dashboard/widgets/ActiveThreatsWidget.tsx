import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield, ShieldAlert, AlertOctagon } from "lucide-react";

interface Threat {
  id: string;
  name: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  status: "active" | "investigating" | "contained";
  description: string;
}

interface ActiveThreatsWidgetProps {
  threats?: Threat[];
  onIsolate?: (threatId: string) => void;
  onInvestigate?: (threatId: string) => void;
}

const defaultThreats: Threat[] = [
  {
    id: "1",
    name: "Suspicious Login Attempt",
    severity: "high",
    timestamp: "2024-03-21T10:30:00Z",
    status: "active",
    description: "Multiple failed login attempts from unknown IP address",
  },
  {
    id: "2",
    name: "Unusual Data Transfer",
    severity: "medium",
    timestamp: "2024-03-21T10:25:00Z",
    status: "investigating",
    description: "Large data transfer detected during non-business hours",
  },
  {
    id: "3",
    name: "Malware Detection",
    severity: "critical",
    timestamp: "2024-03-21T10:20:00Z",
    status: "active",
    description: "Potential ransomware signature detected",
  },
];

const getSeverityIcon = (severity: Threat["severity"]) => {
  switch (severity) {
    case "critical":
      return <AlertOctagon className="h-5 w-5 text-red-500" />;
    case "high":
      return <ShieldAlert className="h-5 w-5 text-orange-500" />;
    case "medium":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "low":
      return <Shield className="h-5 w-5 text-green-500" />;
  }
};

const getSeverityColor = (severity: Threat["severity"]) => {
  switch (severity) {
    case "critical":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "high":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "medium":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "low":
      return "bg-green-500/10 text-green-500 border-green-500/20";
  }
};

const ActiveThreatsWidget = ({
  threats = defaultThreats,
  onIsolate = () => {},
  onInvestigate = () => {},
}: ActiveThreatsWidgetProps) => {
  return (
    <Card className="w-full h-full bg-background border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          Active Threats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-4">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(threat.severity)}
                      <h4 className="font-medium">{threat.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {threat.description}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${getSeverityColor(threat.severity)}`}
                  >
                    {threat.severity}
                  </Badge>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onIsolate(threat.id)}
                    >
                      Isolate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onInvestigate(threat.id)}
                    >
                      Investigate
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(threat.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActiveThreatsWidget;
