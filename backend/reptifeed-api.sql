\echo 'Create reptifeed api?'
\prompt 'Return for yes or control-C to cancel > ' foo

\connect reptifeed

\i reptifeed-skink-diet.sql

\echo 'Create reptifeed api for test database?'
\prompt 'Return for yes or control-C to cancel > ' foo

\connect reptifeed_test

\i reptifeed-skink-diet.sql