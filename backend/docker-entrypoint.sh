#!/bin/bash

set -e
# Apply database migrations
poetry run alembic upgrade head
# Launch server
poetry run uvicorn app.main:make_app --factory --host=0.0.0.0 --port=8080 --reload