\echo 'Create reptifeed api?'
\prompt 'Return for yes or control-C to cancel > ' foo

\connect reptifeed

DROP TABLE blue_tongue_skink_diet;
\i reptifeed-skink-diet.sql

\echo 'Create reptifeed api for test database?'
\prompt 'Return for yes or control-C to cancel > ' foo

\connect reptifeed_test

DROP TABLE blue_tongue_skink_diet;
\i reptifeed-skink-diet.sql