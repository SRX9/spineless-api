"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { UsageTable } from "@/components/usage-table";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { RequestVolumeChart } from "@/components/ui/request-volume-chart";
import { 
  IconServer, 
  IconClock, 
  IconCalendar, 
  IconGauge, 
  IconTrendingDown, 
  IconTrendingUp 
} from "@tabler/icons-react";

// Define the structure of our log data based on api_requests table
export interface ApiRequestLog {
  id: string;
  request_time: string;
  api_endpoint_id: string;
  response_status: number;
  response_time_ms: number;
  api_endpoints: { endpoint_path: string } | null;
}

// Helper to check for valid Date object
const isValid = (date: Date) => date instanceof Date && !isNaN(date.getTime());

// Define columns for DataTable - Remains the same
const columns: ColumnDef<ApiRequestLog>[] = [
  {
    accessorKey: "request_time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timestamp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("request_time"));
      return (
        <div className="font-medium">
          {isValid(date) ? date.toLocaleString() : "Invalid Date"}
        </div>
      );
    },
  },
  {
    accessorKey: "api_endpoint_id",
    header: "API Endpoint Path",
    cell: ({ row }) => {
      const endpointData = row.original.api_endpoints;
      const path = endpointData?.endpoint_path ?? "N/A";
      return <div className="font-mono">{path}</div>;
    },
  },
  {
    accessorKey: "response_status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: number = row.getValue("response_status");
      let variant:
        | "default"
        | "destructive"
        | "secondary"
        | "outline"
        | null
        | undefined = "secondary";
      if (status >= 200 && status < 300) variant = "default";
      if (status >= 400 && status < 500) variant = "destructive";
      if (status >= 500) variant = "destructive";
      return <Badge variant={variant ?? "outline"}>{status ?? "N/A"}</Badge>;
    },
  },
  {
    accessorKey: "response_time_ms",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duration (ms)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("response_time_ms"));
      return (
        <div className="text-right font-medium">
          {isNaN(amount) ? "N/A" : amount.toFixed(0)}
        </div>
      );
    },
  },
];

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalRequests, setTotalRequests] = useState<number | null>(null);
  const [avgResponseTime, setAvgResponseTime] = useState<number | null>(null);
  const [requestsToday, setRequestsToday] = useState<number | null>(null);
  const [requestsUsed, setRequestsUsed] = useState<number>(0);
  const [requestsLimit, setRequestsLimit] = useState<number>(10);
  const [requestLogs, setRequestLogs] = useState<ApiRequestLog[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([{ id: "request_time", desc: true }]);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!user) {
          console.log("No active session found. Redirecting to login.");
          router.push("/auth/signin");
          return;
        }

        const userId = user.id;

        const supabase = createSupabaseBrowserClient();

        // Fetch usage quotas for today
        try {
          const today = new Date().toISOString().split('T')[0];
          const { data: usageData, error: usageError } = await supabase
            .from('usage_quotas')
            .select('requests_used, requests_limit')
            .eq('user_id', userId)
            .eq('date', today)
            .single();
          if (!usageError && usageData) {
            setRequestsUsed(usageData.requests_used);
            setRequestsLimit(usageData.requests_limit);
          } else {
            setRequestsUsed(0);
            setRequestsLimit(10);
          }
        } catch (e) {
          console.error('Error fetching usage quotas:', e);
        }

        // Fetch total count for pagination
        const { count: totalCount } = await supabase
          .from("api_requests")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId);
        setTotalRequests(totalCount ?? 0);
        setRowCount(totalCount ?? 0);

        // Fetch paginated logs
        const from = pageIndex * pageSize;
        const to = from + pageSize - 1;
        // Determine sorting column and direction
        let sortCol = sorting[0]?.id ?? "request_time";
        let sortDesc = sorting[0]?.desc ?? true;
        // Only allow sorting on known columns
        const allowedSortCols = ["request_time", "response_status", "response_time_ms"];
        if (!allowedSortCols.includes(sortCol)) sortCol = "request_time";
        const { data: logsData, error: logsError } = await supabase
          .from("api_requests")
          .select(
            `
                id,
                request_time,
                api_endpoint_id, 
                response_status,
                response_time_ms
            `
          )
          .eq("user_id", user.id)
          .order(sortCol, { ascending: !sortDesc })
          .range(from, to);

        if (logsError) {
          console.error("Error fetching request logs:", logsError);
          throw new Error(`Failed to fetch request logs: ${logsError.message}`);
        }

        if (!logsData || logsData.length === 0) {
          setRequestLogs([]);
          setAvgResponseTime(0);
          setRequestsToday(0);
          // setLoading(false); // No need to set loading false here, finally block handles it
          console.log("No request logs found for user.");
          return; // Exit early if no logs
        }

        console.log("Fetched logs data (Step 1):", logsData);

        // --- Step 2: Fetch corresponding API Endpoint Paths ---
        const uniqueEndpointIds = new Set(
          logsData.map((log) => log.api_endpoint_id).filter((id) => id)
        ); // Get unique, non-null IDs
        const endpointIds = Array.from(uniqueEndpointIds); // Convert Set to Array safely
        let endpointPathMap: { [key: string]: string } = {};

        if (endpointIds.length > 0) {
          const { data: endpointsData, error: endpointsError } = await supabase
            .from("api_endpoints")
            .select("id, endpoint_path") // Select correct column name
            .in("id", endpointIds);

          if (endpointsError) {
            console.error("Error fetching endpoint paths:", endpointsError);
            // Decide how to handle partial errors: continue without paths or throw?
            // Let's continue but log the error.
          } else if (endpointsData) {
            console.log("Fetched endpoints data (Step 2):", endpointsData);
            endpointPathMap = endpointsData.reduce((acc, ep) => {
              acc[ep.id] = ep.endpoint_path; // Use correct column name for mapping
              return acc;
            }, {} as { [key: string]: string });
          }
        }

        // --- Step 3: Merge Paths into Logs and Set State ---
        const validLogs: ApiRequestLog[] = logsData.map((log) => ({
          id: log.id,
          request_time: log.request_time,
          api_endpoint_id: log.api_endpoint_id,
          response_status: Number(log.response_status), // Ensure numeric
          response_time_ms: Number(log.response_time_ms), // Ensure numeric type
          // Merge the path using the map
          api_endpoints: log.api_endpoint_id
            ? {
                endpoint_path:
                  endpointPathMap[log.api_endpoint_id] ?? "Unknown Path",
              }
            : null,
        }));

        console.log("Merged logs with paths:", validLogs);
        setRequestLogs(validLogs);

        // --- Calculate Aggregates (Using validLogs which now includes path info if needed later) ---
        const totalResponseTime = validLogs.reduce(
          (sum, log) => sum + log.response_time_ms,
          0
        );
        setAvgResponseTime(
          validLogs.length > 0
            ? Math.round(totalResponseTime / validLogs.length)
            : 0
        );

        const twentyFourHoursAgo = new Date(
          Date.now() - 24 * 60 * 60 * 1000
        ).toISOString();
        const todayCount = validLogs.filter((log) => {
          const reqDate = new Date(log.request_time);
          return isValid(reqDate) && reqDate >= new Date(twentyFourHoursAgo);
        }).length;
        setRequestsToday(todayCount);
      } catch (err: any) {
        console.error("Failed to fetch usage data:", err);
        let message = "Failed to load usage data.";
        if (err.message) {
          message += ` Reason: ${err.message}`;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (authLoading) return;
    fetchData();
  }, [router, authLoading, user, pageIndex, pageSize]);

  if (error && !loading) {
    return (
      <div className="p-4 m-4 text-destructive-foreground bg-destructive rounded-md">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 font-ghibli">
      <div className="*:data-[slot=card]:from-primary/5 w-auto max-w-[1400px] *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card max-w-[350px]">
          <CardHeader>
            <CardDescription>Total Requests</CardDescription>
            <CardTitle className="font-ghibli text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalRequests ?? "0"}
            </CardTitle>
            <CardAction>
              <IconServer className="w-10 h-10 text-primary" />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              All-time API requests for your endpoints
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card max-w-[350px]">
          <CardHeader>
            <CardDescription>Avg. Response Time</CardDescription>
            <CardTitle className="font-ghibli text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {avgResponseTime ?? "0"} ms
            </CardTitle>
            <CardAction>
              <IconClock className="w-10 h-10 text-primary" />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
               <IconTrendingDown className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Average from recent requests
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card max-w-[350px]">
          <CardHeader>
            <CardDescription>Requests Today</CardDescription>
            <CardTitle className="font-ghibli text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              +{requestsToday ?? "0"}
            </CardTitle>
            <CardAction>
              <IconCalendar className="w-10 h-10 text-primary" />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Requests in the last 24 hours
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card max-w-[350px]">
          <CardHeader>
            <CardDescription>Quota Remaining</CardDescription>
            <CardTitle className="font-ghibli text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {requestsLimit - requestsUsed}
            </CardTitle>
            <CardAction>
              <IconGauge className="w-10 h-10 text-primary" />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {requestsUsed} of {requestsLimit} used
            </div>
            <div className="text-muted-foreground">
              Daily quota status
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 pt-2 grid-cols-1">
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-primary font-ghibli">
              Request Volume (Last 100)
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {loading ? (
              <Skeleton className="h-[350px] w-full" />
            ) : (
              <div className="h-[350px]">
                <RequestVolumeChart logs={requestLogs} />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-primary font-ghibli">
              Recent API Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : requestLogs.length > 0 ? (
              <UsageTable
                columns={columns}
                data={requestLogs}
                pageIndex={pageIndex}
                pageSize={pageSize}
                rowCount={rowCount}
                sorting={sorting}
                onSortingChange={setSorting}
                onPageChange={setPageIndex}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setPageIndex(0); // Reset to first page on size change
                }}
              />
            ) : (
              <div className="text-center text-muted-foreground p-4">
                No recent API logs found for your endpoints.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
