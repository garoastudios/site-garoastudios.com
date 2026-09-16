import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { fetchPostingByCode, type PostingStatus } from '@/lib/postings';
import { brtLocalToIso, isoToBrtLocal } from '@/lib/brt';
import { LOCALES, LOCALE_LABELS, type Locale } from '@/i18n/config';
import AdminLayout from './AdminLayout';
import MarkdownField from '@/components/admin/MarkdownField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type LocaleForm = {
  title: string;
  body_md: string;
  apply_label: string;
  back_label: string;
  seo_title: string;
  seo_description: string;
};

const EMPTY: LocaleForm = {
  title: '',
  body_md: '',
  apply_label: '',
  back_label: '',
  seo_title: '',
  seo_description: '',
};

const emptyForms = () =>
  LOCALES.reduce(
    (acc, loc) => ({ ...acc, [loc]: { ...EMPTY } }),
    {} as Record<Locale, LocaleForm>,
  );

export default function AdminPostingEditor() {
  const { code } = useParams<{ code: string }>();
  const isNew = !code;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: posting, isLoading } = useQuery({
    queryKey: ['admin-posting', code],
    queryFn: () => fetchPostingByCode(code as string),
    enabled: !isNew,
  });

  const [applyUrl, setApplyUrl] = useState('');
  const [status, setStatus] = useState<PostingStatus>('live');
  const [closesMode, setClosesMode] = useState<'never' | 'date'>('never');
  const [closesLocal, setClosesLocal] = useState('');
  const [forms, setForms] = useState<Record<Locale, LocaleForm>>(emptyForms);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!posting) return;
    setApplyUrl(posting.apply_url);
    setStatus(posting.status);
    setClosesMode(posting.closes_at ? 'date' : 'never');
    setClosesLocal(posting.closes_at ? isoToBrtLocal(posting.closes_at) : '');
    const next = emptyForms();
    for (const loc of LOCALES) {
      const tr = posting.translations[loc];
      if (tr) {
        next[loc] = {
          title: tr.title,
          body_md: tr.body_md,
          apply_label: tr.apply_label,
          back_label: tr.back_label,
          seo_title: tr.seo_title,
          seo_description: tr.seo_description,
        };
      }
    }
    setForms(next);
  }, [posting]);

  const missing = useMemo(
    () => LOCALES.filter((loc) => !forms[loc].title.trim()),
    [forms],
  );

  const update = (loc: Locale, field: keyof LocaleForm, value: string) =>
    setForms((prev) => ({ ...prev, [loc]: { ...prev[loc], [field]: value } }));

  const save = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!forms.br.title.trim() || !forms.br.body_md.trim()) {
      toast.error('the Brazilian Portuguese version is required');
      return;
    }
    if (closesMode === 'date' && !closesLocal) {
      toast.error('pick a closing date and time');
      return;
    }

    setSaving(true);
    try {
      const closesAt = closesMode === 'date' ? brtLocalToIso(closesLocal) : null;
      let postingId = posting?.id;
      let postingCode = posting?.code;

      if (isNew) {
        const { data: newCode, error: codeError } = await supabase.rpc('next_job_posting_code');
        if (codeError) throw codeError;

        const { data: inserted, error: insertError } = await supabase
          .from('job_postings')
          .insert({ code: newCode as string, apply_url: applyUrl.trim(), status, closes_at: closesAt })
          .select('id, code')
          .single();
        if (insertError) throw insertError;
        postingId = inserted.id;
        postingCode = inserted.code;
      } else {
        const { error: updateError } = await supabase
          .from('job_postings')
          .update({ apply_url: applyUrl.trim(), status, closes_at: closesAt })
          .eq('id', postingId as string);
        if (updateError) throw updateError;
      }

      const filled = LOCALES.filter((loc) => forms[loc].title.trim());
      const rows = filled.map((loc) => ({
        posting_id: postingId as string,
        locale: loc,
        ...forms[loc],
      }));
      if (rows.length > 0) {
        const { error: trError } = await supabase
          .from('job_posting_translations')
          .upsert(rows, { onConflict: 'posting_id,locale' });
        if (trError) throw trError;
      }

      const emptied = LOCALES.filter((loc) => !forms[loc].title.trim());
      if (emptied.length > 0) {
        const { error: delError } = await supabase
          .from('job_posting_translations')
          .delete()
          .eq('posting_id', postingId as string)
          .in('locale', emptied);
        if (delError) throw delError;
      }

      queryClient.invalidateQueries({ queryKey: ['admin-postings'] });
      queryClient.invalidateQueries({ queryKey: ['admin-posting', postingCode] });
      queryClient.invalidateQueries({ queryKey: ['open-postings'] });
      toast.success(isNew ? `posting ${postingCode} created` : 'changes saved');
      navigate('/admin/postings');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'could not save the posting');
    } finally {
      setSaving(false);
    }
  };

  if (!isNew && isLoading) {
    return (
      <AdminLayout>
        <p className="text-muted-foreground">loading…</p>
      </AdminLayout>
    );
  }

  if (!isNew && !posting) {
    return (
      <AdminLayout>
        <p className="text-muted-foreground">posting not found.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <Button asChild variant="ghost" size="sm" className="-ml-3 mb-2">
            <Link to="/admin/postings">
              <ArrowLeft aria-hidden="true" />
              all postings
            </Link>
          </Button>
          <h1 className="font-display text-2xl sm:text-3xl text-foreground">
            {isNew ? 'new posting' : `edit ${posting?.code}`}
          </h1>
          {isNew && (
            <p className="mt-1 text-sm text-muted-foreground">
              the code is assigned automatically on save (year + sequential number).
            </p>
          )}
        </div>
      </div>

      <form onSubmit={save} className="space-y-10">
        <section className="space-y-5 rounded-md border border-border/60 bg-card/70 p-6">
          <div className="space-y-2">
            <Label htmlFor="apply-url">apply button link</Label>
            <Input
              id="apply-url"
              type="url"
              placeholder="https://forms.gle/…"
              value={applyUrl}
              onChange={(event) => setApplyUrl(event.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              the site adds its own tracking tag to this link automatically.
            </p>
          </div>

          <div className="space-y-2">
            <Label>visibility</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={status === 'live' ? 'default' : 'outline'}
                size="sm"
                className={status === 'live' ? '' : 'bg-transparent'}
                onClick={() => setStatus('live')}
              >
                live
              </Button>
              <Button
                type="button"
                variant={status === 'unlisted' ? 'default' : 'outline'}
                size="sm"
                className={status === 'unlisted' ? '' : 'bg-transparent'}
                onClick={() => setStatus('unlisted')}
              >
                unlisted (closed)
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>stays up</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={closesMode === 'never' ? 'default' : 'outline'}
                size="sm"
                className={closesMode === 'never' ? '' : 'bg-transparent'}
                onClick={() => setClosesMode('never')}
              >
                until I close it
              </Button>
              <Button
                type="button"
                variant={closesMode === 'date' ? 'default' : 'outline'}
                size="sm"
                className={closesMode === 'date' ? '' : 'bg-transparent'}
                onClick={() => setClosesMode('date')}
              >
                until a date and time
              </Button>
            </div>
            {closesMode === 'date' && (
              <div className="space-y-2 pt-2">
                <Label htmlFor="closes-at">closes at (Brasília time)</Label>
                <Input
                  id="closes-at"
                  type="datetime-local"
                  value={closesLocal}
                  onChange={(event) => setClosesLocal(event.target.value)}
                />
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <Tabs defaultValue="br">
            <TabsList className="flex-wrap h-auto">
              {LOCALES.map((loc) => (
                <TabsTrigger key={loc} value={loc} className="gap-1">
                  {LOCALE_LABELS[loc]}
                  {loc === 'br' && <span className="text-accent">*</span>}
                  {missing.includes(loc) && loc !== 'br' && (
                    <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold leading-none">
                      !
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {LOCALES.map((loc) => (
              <TabsContent key={loc} value={loc} className="space-y-5 pt-6">
                <div className="space-y-2">
                  <Label htmlFor={`title-${loc}`}>posting title</Label>
                  <Input
                    id={`title-${loc}`}
                    value={forms[loc].title}
                    onChange={(event) => update(loc, 'title', event.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    leave empty to skip this language — visitors then see English, or Brazilian
                    Portuguese.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`body-${loc}`}>body</Label>
                  <MarkdownField
                    id={`body-${loc}`}
                    value={forms[loc].body_md}
                    onChange={(value) => update(loc, 'body_md', value)}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`apply-${loc}`}>apply button label</Label>
                    <Input
                      id={`apply-${loc}`}
                      value={forms[loc].apply_label}
                      onChange={(event) => update(loc, 'apply_label', event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`back-${loc}`}>back button label</Label>
                    <Input
                      id={`back-${loc}`}
                      value={forms[loc].back_label}
                      onChange={(event) => update(loc, 'back_label', event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`seo-title-${loc}`}>browser tab / search title</Label>
                    <Input
                      id={`seo-title-${loc}`}
                      value={forms[loc].seo_title}
                      onChange={(event) => update(loc, 'seo_title', event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`seo-desc-${loc}`}>search description</Label>
                    <Input
                      id={`seo-desc-${loc}`}
                      value={forms[loc].seo_description}
                      onChange={(event) => update(loc, 'seo_description', event.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <div className="flex flex-wrap gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? 'saving…' : isNew ? 'create posting' : 'save changes'}
          </Button>
          <Button asChild type="button" variant="outline" className="bg-transparent">
            <Link to="/admin/postings">cancel</Link>
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
