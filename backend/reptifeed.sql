\echo 'Delete and recreate reptifeed db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE reptifeed;
CREATE DATABASE reptifeed;
\connect reptifeed

\i reptifeed-schema.sql

\echo 'Delete and recreate reptifeed_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE reptifeed_test;
CREATE DATABASE reptifeed_test;
\connect reptifeed_test

\i reptifeed-schema.sql