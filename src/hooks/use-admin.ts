import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const ADMIN_EMAIL = 'contato@garoastudios.com';

/** Tracks the admin session. `isAdmin` mirrors the backend's allow-list check. */
export function useAdminSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const email = session?.user?.email?.toLowerCase() ?? null;

  return {
    session,
    loading,
    email,
    isAdmin: email === ADMIN_EMAIL,
  };
}
