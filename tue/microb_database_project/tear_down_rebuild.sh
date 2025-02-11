#!/bin/bash
sqlite3 db.sqlite < tear_down_db.sql;
sqlite3 db.sqlite < schema.sql
