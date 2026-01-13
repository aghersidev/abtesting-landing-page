# Pixel Reborn Landing Page

This repo contains a **landing page for Pixel Reborn** videogame, it is made with **React, TypeScript and Vite**, and highlights usage of A/B testing and event tracking with **GrowthBook** and **Umami**.

---

## Pre-requisites

* **Node.js** and **npm**
* **Docker** y **Docker Compose** (to self host Umami and GrowthBook)

---

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/abtesting-landing-page.git
cd abtesting-landing-page
```

2. **Install dependencies**:

```bash
npm ci
```

3. **Environment variables**:

Modify the `.env` file with your own values:

```env
REACT_APP_UMAMI_SITE_ID=umami-site-id
REACT_APP_UMAMI_URL=https://server-umami.com
REACT_APP_GB_CLIENT_KEY=growthbook-client-key
```

> Note: these are public keys for the scripts to talk to the servers.

4. **Launch app in dev mode**:

```bash
npm run dev
```

Your app will be live on something like `http://localhost:5173`.

---

## Launch self-hosted Umamim and GrowthBook

### Umami

```bash
docker run -d \
  -e DATABASE_URL=postgres://umami:umami@localhost:5432/umami \
  -e UMAMI_ALLOWED_ORIGINS=https://localhost:5173 \
  -p 3000:3000 \
  --name umami umami/umami
```

Access `http://localhost:3000` to add  your **site** and get the `siteId`.

---

### GrowthBook

```yaml
version: "3.8"
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: gbuser
      POSTGRES_PASSWORD: gbpass
      POSTGRES_DB: growthbook
    ports:
      - "5432:5432"

  growthbook-api:
    image: growthbook/growthbook-api:latest
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgres://gbuser:gbpass@postgres:5432/growthbook
      PORT: 3100
    ports:
      - "3100:3100"

  growthbook-ui:
    image: growthbook/growthbook-ui:latest
    depends_on:
      - growthbook-api
    environment:
      REACT_APP_GB_API_HOST: http://localhost:3100
    ports:
      - "3000:3000"
```

Access `http://localhost:3000` to create experiments and genereate the **clientKey**.

---

### Configure Feature Flags

1. Log into **GrowthBook UI**.
2. Create a **Feature Flag** called:

```
mediaType
```

3. Define two variations:

* `"trailer"`
* `"images"`

---

## Usage

* App runs with **A/B testing GrowthBook** and **tracking with Umami**.
* `useUmami` sends eventos and views.

---

## Licence

This project is under **MIT License**. Read the LICENSE.
