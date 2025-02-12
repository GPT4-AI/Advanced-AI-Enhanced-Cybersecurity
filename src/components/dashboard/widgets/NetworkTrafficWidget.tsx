import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface NetworkTrafficData {
  timestamp: string;
  traffic: number;
  anomalyScore: number;
}

interface NetworkTrafficWidgetProps {
  data?: NetworkTrafficData[];
  anomalyThreshold?: number;
  title?: string;
}

const defaultData: NetworkTrafficData[] = [
  { timestamp: "00:00", traffic: 100, anomalyScore: 0.1 },
  { timestamp: "01:00", traffic: 120, anomalyScore: 0.2 },
  { timestamp: "02:00", traffic: 130, anomalyScore: 0.8 },
  { timestamp: "03:00", traffic: 200, anomalyScore: 0.9 },
  { timestamp: "04:00", traffic: 180, anomalyScore: 0.3 },
  { timestamp: "05:00", traffic: 90, anomalyScore: 0.1 },
];

const NetworkTrafficWidget = ({
  data = defaultData,
  anomalyThreshold = 0.7,
  title = "Network Traffic Analysis",
}: NetworkTrafficWidgetProps) => {
  const hasAnomalies = data.some(
    (point) => point.anomalyScore > anomalyThreshold,
  );

  return (
    <Card className="w-full h-full bg-background border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {hasAnomalies && (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Anomaly Detected
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="timestamp"
                className="text-muted-foreground text-xs"
              />
              <YAxis className="text-muted-foreground text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Line
                type="monotone"
                dataKey="traffic"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="anomalyScore"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkTrafficWidget;
