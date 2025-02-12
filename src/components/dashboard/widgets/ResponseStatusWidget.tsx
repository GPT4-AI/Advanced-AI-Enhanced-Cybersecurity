import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, XCircle } from "lucide-react";

interface ResponsePlaybook {
  id: string;
  name: string;
  status: "running" | "paused" | "completed" | "failed";
  progress: number;
  target: string;
}

interface Props {
  playbooks?: ResponsePlaybook[];
}

const defaultPlaybooks: ResponsePlaybook[] = [
  {
    id: "1",
    name: "Network Isolation",
    status: "running",
    progress: 45,
    target: "Server-001",
  },
  {
    id: "2",
    name: "Data Backup",
    status: "paused",
    progress: 70,
    target: "Database-Main",
  },
  {
    id: "3",
    name: "Malware Scan",
    status: "completed",
    progress: 100,
    target: "Workstation-003",
  },
];

const ResponseStatusWidget = ({ playbooks = defaultPlaybooks }: Props) => {
  const getStatusColor = (status: ResponsePlaybook["status"]) => {
    switch (status) {
      case "running":
        return "bg-blue-500";
      case "paused":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full h-full bg-background border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Response Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {playbooks.map((playbook) => (
            <div
              key={playbook.id}
              className="p-4 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium">{playbook.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Target: {playbook.target}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(playbook.status)} text-white`}
                >
                  {playbook.status.charAt(0).toUpperCase() +
                    playbook.status.slice(1)}
                </Badge>
              </div>
              <div className="space-y-2">
                <Progress value={playbook.progress} className="h-2" />
                <div className="flex justify-end space-x-2">
                  {playbook.status === "running" && (
                    <Button size="sm" variant="outline">
                      <Pause className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                  )}
                  {playbook.status === "paused" && (
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4 mr-1" />
                      Resume
                    </Button>
                  )}
                  {(playbook.status === "running" ||
                    playbook.status === "paused") && (
                    <Button size="sm" variant="destructive">
                      <XCircle className="h-4 w-4 mr-1" />
                      Stop
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseStatusWidget;
