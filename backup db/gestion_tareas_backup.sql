--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12 (Debian 15.12-0+deb12u2)
-- Dumped by pg_dump version 15.12 (Debian 15.12-0+deb12u2)

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
-- Name: task_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_status_enum AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'DONE'
);


ALTER TYPE public.task_status_enum OWNER TO postgres;

--
-- Name: tasks_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tasks_status_enum AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'DONE'
);


ALTER TYPE public.tasks_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    task_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone,
    content character varying
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    assignee_id integer,
    created_by integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    taskid character varying,
    title character varying,
    description character varying,
    committed_date timestamp without time zone,
    start_date timestamp without time zone,
    status public.tasks_status_enum DEFAULT 'OPEN'::public.tasks_status_enum NOT NULL
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, task_id, user_id, created_at, content) FROM stdin;
1	3	2	2025-10-03 05:59:40.479	Este es un comentario nuevo desde postman.
2	3	2	2025-10-03 06:00:08.874	Este es un comentario nuevo desde postman. P@
3	3	2	2025-10-03 06:00:11.837	Este es un comentario nuevo desde postman. P3
4	2	2	2025-10-03 06:01:11.797	Este es un comentario nuevo desde postman. P3
5	2	2	2025-10-03 06:07:13.894	Este es un comentario nuevo desde postman. P2
6	2	2	2025-10-03 06:07:17.248	Este es un comentario nuevo desde postman. P1
7	2	2	2025-10-03 15:22:15.635	Este es un comentario nuevo desde postman. P1
8	2	4	2025-10-03 17:10:25.688	Este es un comentario nuevo desde postman. Soy Admin.
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, assignee_id, created_by, created_at, updated_at, taskid, title, description, committed_date, start_date, status) FROM stdin;
3	2	2	\N	\N	e164c179-bc29-4893-af9c-9a19973c2dfa	Test 2	Test 2	\N	\N	OPEN
2	2	2	2025-09-13 06:11:10.666442	2025-09-13 06:11:10.666442	0474764d-e2ef-458e-854a-962223ac0b8d	Test 1	Test 1	\N	\N	IN_PROGRESS
4	\N	\N	2025-10-03 12:18:45.885	2025-10-03 12:18:45.885	d1f0b8e3-2409-4992-9677-90f458895832	Tarea desde postman 3	postman hizo esto 3.	\N	\N	OPEN
5	\N	\N	2025-10-03 12:20:12.388	2025-10-03 12:20:12.388	65295f7d-3764-417f-b9b5-1c4e643d23de	Tarea desde postman 3	postman hizo esto 3.	\N	\N	OPEN
6	\N	\N	2025-10-03 12:20:53.469	2025-10-03 12:20:53.469	5aec4972-9483-4d17-ac6b-6880fc68cb15	Tarea desde postman 6	postman hizo esto.	\N	\N	OPEN
7	\N	\N	2025-10-03 12:23:39.777	2025-10-03 12:23:39.777	d6d000a4-1485-48be-9240-4aa6dcc475e8	Tarea desde postman 6	postman hizo esto.	\N	\N	OPEN
8	3	3	2025-10-03 12:25:42.933	2025-10-03 12:25:42.933	ab8a9242-efe7-4638-b00e-feb28d78e7fd	Tarea desde postman 6	postman hizo esto.	\N	\N	OPEN
9	3	3	2025-10-03 12:29:03.52	2025-10-03 12:29:03.52	c627a5e7-66b8-479d-bd60-c4dc074c5198	Tarea desde postman 6	postman hizo esto.	\N	\N	OPEN
10	3	3	2025-10-03 12:30:13.967	2025-10-03 12:30:13.967	0b9a3e7c-91ff-4718-b862-7329f5732dbd	Tarea desde postman 6	postman hizo esto.	\N	\N	OPEN
11	3	3	2025-10-03 12:32:04.095	2025-10-03 12:32:04.095	e938a320-c003-4b42-95c5-e3068d7a4dea	Tarea desde postman 6	postman hizo esto.	\N	\N	OPEN
12	3	3	2025-10-03 12:32:34.801	2025-10-03 12:32:34.801	56bf6575-4052-4185-bea7-01e145fa0234	Tarea desde postman 6	postman hizo esto.	2025-10-09 18:00:00	2025-10-02 18:00:00	OPEN
13	3	3	2025-10-03 12:35:14.46	2025-10-03 12:35:14.46	49f8958e-7f1d-4d2f-a968-7af6f89d8f24	Tarea desde postman 6	postman hizo esto.	2025-10-09 18:00:00	2025-10-02 18:00:00	OPEN
14	2	3	2025-10-03 17:04:04.017	2025-10-03 17:04:04.017	83918496-a8cd-4ecf-ab0f-00f8d2b0ef46	Tarea desde postman. 	Creada por id 3.	2025-10-09 18:00:00	2025-10-02 18:00:00	OPEN
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, created_at, updated_at, username, email, password, role) FROM stdin;
2	2025-09-13 04:26:38.239176	2025-09-13 04:26:38.239176	Julian	julian@julian.com	Test123	worker
3	2025-10-03 06:03:54.409927	2025-10-03 06:03:54.409927	Angel	angel@angel.com	Test123	worker
4	2025-10-03 06:04:31.91784	2025-10-03 06:04:31.91784	Admin	admin@admin.com	Test123	admin
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 8, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 14, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments FK_18c2493067c11f44efb35ca0e03; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "FK_18c2493067c11f44efb35ca0e03" FOREIGN KEY (task_id) REFERENCES public.tasks(id);


--
-- PostgreSQL database dump complete
--

