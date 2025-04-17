import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Trash, Edit, Clock, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CodeBlock from "./CodeBlock";

interface ApiCardProps {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  createdAt: string;
  onDelete?: (id: string) => void;
  className?: string;
}

export default function ApiCard({
  id,
  name,
  description,
  endpoint,
  createdAt,
  onDelete,
  className,
}: ApiCardProps) {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const { toast } = useToast();

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const copyEndpoint = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard.writeText(endpoint);
    setCopied(true);
    toast({
      description: "Endpoint copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onDelete) {
      onDelete(id);
    }
  };

  const testApi = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setApiResponse(data);
      setShowResponseDialog(true);

      // Optionally log
      // console.log("API Response:", data);
    } catch (error) {
      // console.error("Error calling API:", error);
      toast({
        title: "Error",
        description: "Failed to call the API. See console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TooltipProvider>
        <Card
          className={cn(
            "overflow-hidden transition-all duration-300 h-full flex flex-col bg-card border-muted/50",
            "hover:shadow-lg hover:border-primary/20",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className
          )}
        >
          <CardContent className="px-5  flex flex-col h-full">
            <div className="mb-4">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-2xl font-semibold text-primary line-clamp-1">
                  {name}
                </h3>
                <Badge
                  variant="outline"
                  className="font-normal flex items-center gap-1 text-xs"
                >
                  <Clock className="h-3 w-3" />
                  {formattedDate}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {description}
              </p>
            </div>

            <div className="mt-auto mb-6">
              <div className="text-xs text-muted-foreground mb-1 font-medium">
                Endpoint
              </div>
              <div className="flex items-center gap-2 bg-muted/50 rounded-md p-2.5 text-sm group">
                <code className="truncate flex-1 text-foreground font-mono">
                  {endpoint}
                </code>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={copyEndpoint}
                      aria-label="Copy endpoint to clipboard"
                    >
                      <Copy
                        className={cn(
                          "h-4 w-4",
                          copied ? "text-green-500" : "text-muted-foreground"
                        )}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? "Copied!" : "Copy endpoint"}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-auto justify-between items-center">
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="rounded-full h-9 px-4 shadow-sm hover:shadow-md transition-all"
                      asChild
                    >
                      <Link
                        href={`/dashboard/api/${id}`}
                        className="flex items-center gap-1.5"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>View</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View API details</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-9 px-4 border-muted hover:bg-secondary/80 hover:text-secondary-foreground transition-all"
                      asChild
                    >
                      <Link
                        href={`/dashboard/api/edit/${id}`}
                        className="flex items-center gap-1.5"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit this API</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      className="rounded-full h-9 px-4 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all"
                      onClick={testApi}
                      disabled={isLoading}
                      aria-label="Test API"
                    >
                      <Play className="h-4 w-4 mr-1.5" />
                      <span>{isLoading ? "Testing..." : "Test"}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Test this API endpoint</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-full h-9 px-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    onClick={handleDelete}
                    aria-label="Delete API"
                  >
                    <Trash className="h-4 w-4 mr-1.5" />
                    <span>Delete</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete this API</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>

      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-visible">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              API Response: {name}
            </DialogTitle>
            <DialogDescription>
              Response from testing the endpoint: {endpoint}
            </DialogDescription>
          </DialogHeader>
          <div
            className="-mt-4"
            style={{
              maxHeight: "52vh",
              overflow: "auto",
              fontSize: "1rem",
              scrollbarWidth: "thin",
              scrollbarColor: "#b2a47b #f7f3e8",
            }}
          >
            {apiResponse && (
              <CodeBlock
                code={JSON.stringify(apiResponse, null, 2)}
                language="json"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
