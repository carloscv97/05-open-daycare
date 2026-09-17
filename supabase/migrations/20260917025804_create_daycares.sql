create table public.daycares (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  constraint daycares_name_not_blank check (btrim(name) <> '')
);

create unique index daycares_name_normalized_key
  on public.daycares (lower(btrim(name)));

alter table public.daycares enable row level security;

insert into public.daycares (name)
values
  ('Guardería Sala Soles'),
  ('Guardería Arcoíris'),
  ('Guardería Pequeños Exploradores');
