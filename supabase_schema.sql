-- Enable UUID extension if needed (optional for this schema as we use text IDs for some)
create extension if not exists "uuid-ossp";

-- Solutions Table
create table if not exists solutions (
    id text primary key,
    title text not null,
    description text not null,
    image text not null,
    icon text not null
);

-- Products Table
create table if not exists products (
    id text primary key,
    name text not null,
    category text not null,
    description text not null,
    image text not null,
    video text
);

-- Partner Benefits Table
create table if not exists partner_benefits (
    id serial primary key,
    title text not null,
    description text not null,
    icon text not null
);

-- News Items Table
create table if not exists news_items (
    id text primary key,
    title text not null,
    date date not null,
    category text not null,
    summary text not null,
    image text not null
);

-- Partner Applications Table (NEW)
create table if not exists partner_applications (
    id serial primary key,
    name text not null,
    phone text not null,
    company text,
    target_city text,
    message text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) - Optional: Enable public read access
alter table solutions enable row level security;
create policy "Public solutions are viewable by everyone" on solutions for select using (true);

alter table products enable row level security;
create policy "Public products are viewable by everyone" on products for select using (true);

alter table partner_benefits enable row level security;
create policy "Public partner_benefits are viewable by everyone" on partner_benefits for select using (true);

alter table news_items enable row level security;
create policy "Public news_items are viewable by everyone" on news_items for select using (true);

alter table partner_applications enable row level security;
-- Allow anyone to insert applications (anonymous submission)
create policy "Public can insert applications" on partner_applications for insert with check (true);
-- Only authenticated users (admins) can view applications - for now we might leave it open or restricted
-- For simplicity in this demo, we won't add a view policy for public, so data is write-only for public
