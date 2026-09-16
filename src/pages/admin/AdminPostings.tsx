import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ExternalLink, Pencil, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { fetchPostings, isClosed, missingLocales, type Posting } from '@/lib/postings';
import { formatBrt } from '@/lib/brt';
import { LOCALE_LABELS } from '@/i18n/config';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';

function StatusLabel({ posting }: { posting: Posting }) {
  if (posting.status === 'unlisted') {
    return <span className="text-muted-foreground">unlisted</span>;
  }
  if (isClosed(posting)) {
    return <span className="text-muted-foreground">closed (date passed)</span>;
  }
  if (posting.closes_at) {
    return <span className="text-accent">live until {formatBrt(posting.closes_at)}</span>;
  }
  return <span className="text-accent">live</span>;
}

export default function AdminPostings() {
  const queryClient = useQueryClient();
  const { data: postings, isLoading } = useQuery({
    queryKey: ['admin-postings'],
    queryFn: fetchPostings,
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'live' | 'unlisted' }) => {
      const { error } = await supabase.from('job_postings').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-postings'] });
      queryClient.invalidateQueries({ queryKey: ['open-postings'] });
      toast.success(variables.status === 'live' ? 'posting reopened' : 'posting closed');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-2xl sm:text-3xl text-foreground">job postings</h1>
        <Button asChild>
          <Link to="/admin/postings/new">
            <Plus aria-hidden="true" />
            new posting
          </Link>
        </Button>
      </div>

      {isLoading && <p className="text-muted-foreground">loading…</p>}

      {postings && postings.length === 0 && (
        <p className="text-muted-foreground">no postings yet.</p>
      )}

      <div className="space-y-4">
        {postings?.map((posting) => {
          const missing = missingLocales(posting);
          const title = posting.translations.br?.title ?? posting.translations.en?.title ?? '—';
          return (
            <div
              key={posting.id}
              className="rounded-md border border-border/60 bg-card/70 p-5 backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-muted-foreground">{posting.code}</p>
                  <h2 className="normal-case font-display text-lg text-foreground leading-snug">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm">
                    <StatusLabel posting={posting} />
                  </p>
                  {missing.length > 0 && (
                    <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      missing translations:
                      {missing.map((loc) => (
                        <span
                          key={loc}
                          className="inline-flex items-center gap-1 rounded bg-accent/20 px-2 py-0.5 text-accent"
                        >
                          ! {LOCALE_LABELS[loc]}
                        </span>
                      ))}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="bg-transparent">
                    <Link to={`/admin/postings/${posting.code}/edit`}>
                      <Pencil aria-hidden="true" />
                      edit
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <a href={`/br/jobs/${posting.code}`} target="_blank" rel="noreferrer">
                      <ExternalLink aria-hidden="true" />
                      view
                    </a>
                  </Button>
                  {posting.status === 'live' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                      disabled={setStatus.isPending}
                      onClick={() => setStatus.mutate({ id: posting.id, status: 'unlisted' })}
                    >
                      close
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                      disabled={setStatus.isPending}
                      onClick={() => setStatus.mutate({ id: posting.id, status: 'live' })}
                    >
                      reopen
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
