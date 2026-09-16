import { Link, Navigate, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { useAdminSession } from '@/hooks/use-admin';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { loading, isAdmin, email, session } = useAdminSession();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground/70">
        loading…
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <div className="min-h-screen bg-background/60">
      <Helmet>
        <title>Garoa — admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 px-4 py-4">
          <Link to="/admin/postings" className="font-display text-lg text-foreground">
            garoa admin
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-muted-foreground">{email}</span>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent"
              onClick={() => supabase.auth.signOut()}
            >
              <LogOut aria-hidden="true" />
              sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
    </div>
  );
}
