"use client";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, CheckSquare2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isPending]);

  if (isPending) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg">
            <CheckSquare2 className="h-5 w-5" />
          </div>
          <h1 className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">TaskManager</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted-foreground">{session?.user?.email}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => signOut().then(() => router.push("/login"))}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
