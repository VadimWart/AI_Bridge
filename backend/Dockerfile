# Slim Python Image
FROM python:3.12-slim

# Installiere uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Set working directory
WORKDIR /app

# Copy only the dependency files first (caching!)
COPY pyproject.toml uv.lock ./

# Install dependencies (without creating venv, use system Python in the container)
RUN uv sync --frozen --no-dev

# Copy the rest of the code
COPY . .

# Start command
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
