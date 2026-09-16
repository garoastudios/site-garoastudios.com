import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ADMIN_EMAIL, useAdminSession } from '@/hooks/use-admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLogin() {
  const { session, isAdmin, loading } = useAdminSession();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  // Landing here from the emailed magic link: session hydrates from the URL
  // and this redirect takes the admin to the postings list.
  if (!loading && session && isAdmin) {
    return <Navigate to="/admin/postings" replace />;
  }

  const sendLink = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/admin/login`,
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    toast.success('link sent — check the inbox');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Helmet>
        <title>Garoa — admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full max-w-sm rounded-lg border border-border/60 bg-card/80 p-8 backdrop-blur-md">
        <h1 className="font-display text-2xl text-foreground mb-6">admin sign in</h1>

        {sent ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              we sent a sign-in link to{' '}
              <span className="font-medium text-foreground">{email.trim().toLowerCase()}</span>.
              open it on this device — it brings you straight in.
            </p>
            <p className="text-xs text-muted-foreground">
              the link expires shortly and works only once.
            </p>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setSent(false)}
            >
              use a different email
            </Button>
          </div>
        ) : (
          <form onSubmit={sendLink} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? 'sending…' : 'send sign-in link'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
