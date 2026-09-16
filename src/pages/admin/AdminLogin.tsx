import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ADMIN_EMAIL, useAdminSession } from '@/hooks/use-admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/** Codes are only accepted for five minutes. */
const CODE_TTL_MS = 5 * 60 * 1000;

export default function AdminLogin() {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminSession();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [code, setCode] = useState('');
  const [sentAt, setSentAt] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (sentAt === null) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((sentAt + CODE_TTL_MS - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) setSentAt(null);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [sentAt]);

  if (!loading && session && isAdmin) {
    return <Navigate to="/admin/postings" replace />;
  }

  const sendCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: true },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setCode('');
    setSentAt(Date.now());
    toast.success('code sent — check the inbox');
  };

  const verifyCode = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sentAt === null) {
      toast.error('the code expired — request a new one');
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code.trim(),
      type: 'email',
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate('/admin/postings', { replace: true });
  };

  const mmss = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Helmet>
        <title>Garoa — admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full max-w-sm rounded-lg border border-border/60 bg-card/80 p-8 backdrop-blur-md">
        <h1 className="font-display text-2xl text-foreground mb-6">admin sign in</h1>

        {sentAt === null ? (
          <form onSubmit={sendCode} className="space-y-4">
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
              {busy ? 'sending…' : 'send code'}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">6-digit code</Label>
              <Input
                id="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))}
                required
              />
              <p className="text-xs text-muted-foreground">expires in {mmss}</p>
            </div>
            <Button type="submit" className="w-full" disabled={busy || code.length < 6}>
              {busy ? 'checking…' : 'sign in'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setSentAt(null)}
            >
              use a different email
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
