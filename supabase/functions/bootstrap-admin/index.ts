import { createClient } from 'npm:@supabase/supabase-js@2';

const ADMIN_EMAIL = 'contato@garoastudios.com';

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false } },
  );

  const { data: list, error: listError } = await supabase.auth.admin.listUsers({ perPage: 200 });
  if (listError) {
    return new Response(JSON.stringify({ error: listError.message }), { status: 500 });
  }

  const existing = list.users.find((user) => user.email?.toLowerCase() === ADMIN_EMAIL);
  if (existing) {
    return new Response(JSON.stringify({ status: 'exists' }), {
      headers: { 'content-type': 'application/json' },
    });
  }

  const { error } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    email_confirm: true,
  });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ status: 'created' }), {
    headers: { 'content-type': 'application/json' },
  });
});
