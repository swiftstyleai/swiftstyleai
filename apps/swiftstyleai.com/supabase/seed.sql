SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.6 (Ubuntu 15.6-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
  ('00000000-0000-0000-0000-000000000000', 'a8ded790-e04b-4808-8574-1da106aa5924', 'authenticated', 'authenticated', 'namvhoang02@gmail.com', '$2a$10$Dbf2MUfOGsCOrZ5WBJ.Sjuexll6ffvvjoju/WSl8XToaGjaQ1r1pS', '2024-05-27 18:00:07.211429+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-05-30 07:00:47.019414+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "a8ded790-e04b-4808-8574-1da106aa5924", "email": "namvhoang02@gmail.com", "display_name": "Demo", "email_verified": true, "phone_verified": false}', NULL, '2024-05-27 18:00:07.13133+00', '2024-05-31 06:11:19.259747+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
  ('00000000-0000-0000-0000-000000000000', 'f3a67e5b-9d18-4699-a16a-66610da0a7b3', 'authenticated', 'authenticated', 'admin@swiftstyleai.com', '$2a$10$CKLfGlXWfBj.cH0I5uwMeel72QXSkL06mMrnuooYx9LnJ5o2ukJGy', '2024-06-11 16:38:38.140049+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-06-11 16:38:38.147457+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "f3a67e5b-9d18-4699-a16a-66610da0a7b3", "email": "admin@swiftstyleai.com", "display_name": "Admin", "email_verified": true, "phone_verified": false}', NULL, '2024-06-11 16:38:37.933536+00', '2024-06-11 16:38:38.156849+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);

--
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."characters" ("id", "user_id", "created_at", "updated_at", "sharing", "is_default", "is_active", "name", "description") VALUES
  ('dc824092-3e0e-4a46-a0d2-30722bc2bc92', 'a8ded790-e04b-4808-8574-1da106aa5924', '2024-07-15 11:50:00+00', NULL, 'private', TRUE, TRUE, 'Tweet Style', 'Guidelines for crafting concise, engaging, and shareable tweets within the character limit.'),
  ('f1d164f5-6602-43c1-9136-0726a8ef803d', 'a8ded790-e04b-4808-8574-1da106aa5924', '2024-07-15 12:00:00+00', NULL, 'private', FALSE, TRUE, 'Personal Profile', 'Detailed instructions about your personal preferences and writing style.'),
  ('7372ec3c-fa8e-4179-9198-8b70db1d88d1', 'a8ded790-e04b-4808-8574-1da106aa5924', '2024-07-15 12:10:00+00', NULL, 'private', FALSE, TRUE, 'Humorous Style', 'Guidelines for crafting witty, light-hearted, and amusing responses.'),
  ('c48546bf-0e99-4474-ad41-b2b814f5b1c7', 'a8ded790-e04b-4808-8574-1da106aa5924', '2024-07-15 12:20:00+00', NULL, 'private', FALSE, FALSE, 'SwiftStyle AI Project', 'Insights and details about the SwiftStyle AI project.'),
  ('0f4d6bdd-f2d6-488a-aaed-12b9f95cc0e3', 'f3a67e5b-9d18-4699-a16a-66610da0a7b3', '2024-07-15 12:30:00+00', NULL, 'private', TRUE, TRUE, 'Casual', 'A relaxed and friendly writing style for personal communications.');

--
-- Data for Name: instructions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."instructions" ("id", "user_id", "character_id", "created_at", "updated_at", "text") VALUES
  ('30924462-131f-4cf1-96a4-c1764cc8ecba', 'a8ded790-e04b-4808-8574-1da106aa5924', 'dc824092-3e0e-4a46-a0d2-30722bc2bc92', '2024-07-15 12:00:00+00', NULL, 'Act as a Twitter expert.'),
  ('3398a6c1-4892-478e-bd7b-d53d6f84f4ee', 'a8ded790-e04b-4808-8574-1da106aa5924', 'dc824092-3e0e-4a46-a0d2-30722bc2bc92', '2024-07-15 12:01:00+00', NULL, 'Ensure your tweet do not include hashtags.'),
  ('46acafc9-4c1a-4352-bd7c-60be291683a9', 'a8ded790-e04b-4808-8574-1da106aa5924', 'dc824092-3e0e-4a46-a0d2-30722bc2bc92', '2024-07-15 12:02:00+00', NULL, 'Keep tweet content under 280 characters.'),
  ('b12da892-6a17-47c0-b11b-465957cc1c46', 'a8ded790-e04b-4808-8574-1da106aa5924', 'dc824092-3e0e-4a46-a0d2-30722bc2bc92', '2024-07-15 12:03:00+00', NULL, 'Pay attention to the name of the person replying to identify the context and respond appropriately.'),
  ('86536cf2-136e-4719-9ef9-e06fceea2aa3', 'a8ded790-e04b-4808-8574-1da106aa5924', 'dc824092-3e0e-4a46-a0d2-30722bc2bc92', '2024-07-15 12:04:00+00', NULL, 'Follow any criteria specified in brackets () in the input.'),

  ('40b4e7e0-2d4f-411e-ada7-eaea7da8fdd6', 'a8ded790-e04b-4808-8574-1da106aa5924', 'f1d164f5-6602-43c1-9136-0726a8ef803d', '2024-07-15 12:15:00+00', NULL, 'Your name is Leo Hoang.'),
  ('913c8f15-ba46-45ab-8d41-3d02b23b7349', 'a8ded790-e04b-4808-8574-1da106aa5924', 'f1d164f5-6602-43c1-9136-0726a8ef803d', '2024-07-15 12:16:00+00', NULL, 'You are a full-stack developer.'),
  ('d56ffed2-1f91-4ea3-8381-2f864721617a', 'a8ded790-e04b-4808-8574-1da106aa5924', 'f1d164f5-6602-43c1-9136-0726a8ef803d', '2024-07-15 12:17:00+00', NULL, 'Your X (formerly Twitter) account is @iamleohoang.'),

  ('e7c90e0a-24ce-4a23-81cf-5f48e01f9f13', 'a8ded790-e04b-4808-8574-1da106aa5924', '7372ec3c-fa8e-4179-9198-8b70db1d88d1', '2024-07-15 12:25:00+00', NULL, 'Use a playful and light-hearted tone.'),
  ('940a7a09-b2c3-42f2-9a1a-a295ea760da5', 'a8ded790-e04b-4808-8574-1da106aa5924', '7372ec3c-fa8e-4179-9198-8b70db1d88d1', '2024-07-15 12:30:00+00', NULL, 'Incorporate humor, wit, and clever wordplay.'),
  ('1014ddb9-5e89-4403-8583-cf5bd551686d', 'a8ded790-e04b-4808-8574-1da106aa5924', '7372ec3c-fa8e-4179-9198-8b70db1d88d1', '2024-07-15 12:35:00+00', NULL, 'Avoid any offensive or inappropriate jokes.'),
  ('f509c1f7-0ae9-4ba2-8754-919a43e44309', 'a8ded790-e04b-4808-8574-1da106aa5924', '7372ec3c-fa8e-4179-9198-8b70db1d88d1', '2024-07-15 12:40:00+00', NULL, 'Ensure your tweet is engaging and relevant to the original tweet or context.'),

  ('174dd79e-3bc9-4fa1-b3d9-68db4dde74f3', 'a8ded790-e04b-4808-8574-1da106aa5924', 'c48546bf-0e99-4474-ad41-b2b814f5b1c7', '2024-07-15 12:50:00+00', NULL, 'You are working on a project named SwiftStyle AI.'),
  ('6ba57641-16ad-4abd-b035-5c3d192b5cd5', 'a8ded790-e04b-4808-8574-1da106aa5924', 'c48546bf-0e99-4474-ad41-b2b814f5b1c7', '2024-07-15 12:51:00+00', NULL, 'SwiftStyle AI tailors content to your unique style, ensuring every piece reflects your personal or brand voice.'),
  ('162c35d5-822a-41cf-baa4-f8232057715e', 'a8ded790-e04b-4808-8574-1da106aa5924', 'c48546bf-0e99-4474-ad41-b2b814f5b1c7', '2024-07-15 12:52:00+00', NULL, 'The projects X (formerly Twitter) account is @swiftstyleai.'),

  ('c71fa73c-8467-470f-b05f-48100e46a5c8', 'f3a67e5b-9d18-4699-a16a-66610da0a7b3', '0f4d6bdd-f2d6-488a-aaed-12b9f95cc0e3', '2024-07-15 12:45:00+00', NULL, 'Use casual language and include some slang.');
