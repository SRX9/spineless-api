"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ApiCard from "@/components/ui/ApiCard";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle, Eye, ExternalLink, Trash2, Copy } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";



export default function APIsPage() {
  const [apis, setApis] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteApiId, setDeleteApiId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

  // Function to fetch user's APIs
  const fetchApis = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('api_endpoints')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApis(data || []);
    } catch (error: any) {
      console.error("Error fetching APIs:", error);
      toast({
        title: "Error loading APIs",
        description: error.message || "There was an error loading your APIs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an API
  const deleteApi = async () => {
    if (!deleteApiId) return;
    
    setIsDeleting(true);
    try {
      // Delete from api_schemas first (foreign key constraint)
      const { error: schemaError } = await supabase
        .from('api_schemas')
        .delete()
        .eq('api_endpoint_id', deleteApiId);
      
      if (schemaError) throw schemaError;
      
      // Then delete the API endpoint
      const { error } = await supabase
        .from('api_endpoints')
        .delete()
        .eq('id', deleteApiId);
      
      if (error) throw error;
      
      // Update the local state
      setApis(apis.filter(api => api.id !== deleteApiId));
      
      toast({
        title: "API deleted successfully",
        description: "Your API has been permanently deleted.",
      });
      
      setDeleteDialogOpen(false);
    } catch (error: any) {
      console.error("Error deleting API:", error);
      toast({
        title: "Error deleting API",
        description: error.message || "There was an error deleting your API.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteApiId(null);
    }
  };

  // Copy API endpoint to clipboard
  const copyEndpoint = (api: any) => {
    const formattedPath = api.endpoint_path.startsWith('/') ? api.endpoint_path.substring(1) : api.endpoint_path;
    navigator.clipboard.writeText(`${window.location.origin}/api/spineless/${api.id}/${formattedPath}`);
    toast({
      title: "Endpoint copied",
      description: "API endpoint URL copied to clipboard.",
    });
  };

  // Load APIs on component mount
  useEffect(() => {
    fetchApis();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Your APIs</h1>
          <p className=" text-white pt-2 ">Manage your Spineless API collection</p>
        </div>
        <Button  asChild>
          <Link href="/dashboard/create">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New API
          </Link>
        </Button>
      </div>


      {/* API Cards Listing */}
      {apis.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 opacity-90">
          <img src="/ghibli/soot-sprite.png" alt="No APIs" className="w-24 h-24 mb-4 animate-bounce" />
          <div className="text-lg font-semibold text-primary mb-2">No APIs found</div>
          <div className="text-muted-foreground mb-4">You haven’t created any mock APIs yet.</div>
          <Button asChild variant="default" className="rounded-full px-6 py-2 bg-primary/80 hover:bg-primary">
            <Link href="/dashboard/create">
              <PlusCircle className="h-5 w-5 mr-2" /> Create your first API
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {apis.map(api => (
            <ApiCard
              key={api.id}
              id={api.id}
              name={api.name || api.endpoint_path}
              description={api.description || "No description provided"}
              endpoint={`${typeof window !== "undefined" ? window.location.origin : ""}/api/spineless/${api.id}/${api.endpoint_path.startsWith("/") ? api.endpoint_path.substring(1) : api.endpoint_path}`}
              createdAt={api.created_at}
              onDelete={() => {
                setDeleteApiId(api.id);
                setDeleteDialogOpen(true);
              }}
              className="shadow-none border border-muted/40 backdrop-blur-sm"
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm border-[#5C9EAD]/20">
          <DialogHeader>
            <DialogTitle className="text-[#2D5362]">Delete API</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this API? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={deleteApi}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete API"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
