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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface UserActivity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  riskLevel: "low" | "medium" | "high";
  avatar: string;
}

interface UserBehaviorWidgetProps {
  activities?: UserActivity[];
  behaviorData?: Array<{ time: string; anomalyScore: number }>;
}

const defaultActivities: UserActivity[] = [
  {
    id: "1",
    user: "John Doe",
    action: "Multiple failed login attempts",
    timestamp: "2 minutes ago",
    riskLevel: "high",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  {
    id: "2",
    user: "Jane Smith",
    action: "Accessed sensitive files",
    timestamp: "5 minutes ago",
    riskLevel: "medium",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  },
  {
    id: "3",
    user: "Bob Wilson",
    action: "Normal system access",
    timestamp: "10 minutes ago",
    riskLevel: "low",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
  },
];

const defaultBehaviorData = [
  { time: "00:00", anomalyScore: 20 },
  { time: "04:00", anomalyScore: 35 },
  { time: "08:00", anomalyScore: 25 },
  { time: "12:00", anomalyScore: 45 },
  { time: "16:00", anomalyScore: 30 },
  { time: "20:00", anomalyScore: 60 },
  { time: "24:00", anomalyScore: 40 },
];

const UserBehaviorWidget = ({
  activities = defaultActivities,
  behaviorData = defaultBehaviorData,
}: UserBehaviorWidgetProps) => {
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <Card className="w-full h-full bg-background border-border">
      <CardHeader>
        <CardTitle>User Behavior Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[150px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={behaviorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="anomalyScore"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Separator className="my-4" />

        <ScrollArea className="h-[120px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <Avatar>
                  <img src={activity.avatar} alt={activity.user} />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{activity.user}</p>
                    <Badge className={getRiskBadgeColor(activity.riskLevel)}>
                      {activity.riskLevel}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default UserBehaviorWidget;
