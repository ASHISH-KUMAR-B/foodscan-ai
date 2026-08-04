# FoodScan AI

Turn a photo of a packaged food label into structured, actionable health insights — ingredients, nutrition facts, allergen detection, a health score, and AI-generated safety notes — in seconds.

## What it does

1. Upload or capture a photo of a food label (ingredients panel + nutrition facts).
2. OCR extracts raw text from the image.
3. The text is cleaned, parsed, and structured into a proper ingredient list and nutrition table.
4. Ingredients are matched against a dictionary to detect allergens, restricted additives, and category info.
5. A health score and safety verdict are calculated from nutrition values and ingredient risk.
6. Optionally, AI generates supplementary per-ingredient notes and tips.
7. Every scan is saved to the user's history for later reference.

## Tech stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- TanStack Query (React Query)
- React Hook Form + Zod
- i18next (multi-language: English, Hindi, Kannada, Tamil, Telugu, Malayalam)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Multer (image upload handling)

**OCR**
- **Primary engine:** PaddleOCR, served via a separate Python (FastAPI) microservice
- **Fallback engine:** Tesseract.js, used automatically if the PaddleOCR service is unreachable
- OpenCV-based image preprocessing (adaptive thresholding, polarity correction) in the Tesseract path

**AI**
- Cloudflare Workers AI, used for supplementary ingredient safety notes and tips (on-demand, not part of the core scan)

## Architecture overview

Image
│
▼
OCR (PaddleOCR primary → Tesseract fallback)
│
▼
OCR text cleanup (structural fixes: brackets, commas, line-wrap artifacts)
│
▼
Ingredient extraction + compound ingredient splitting
│
▼
Ingredient dictionary matching (category, risk, allergen, restricted-status)
│
▼
Nutrition table parsing (label-aware, decimal/bounds-aware merge across passes)
│
▼
Health score + verdict + safety status calculation
│
▼
Saved to MongoDB, returned to frontend
│
▼
(Optional, on-demand) AI-generated ingredient notes + tips via Cloudflare AI


The backend runs **two independent scan pipelines** side by side:
- `/api/ai/analyze` — Tesseract-based (original implementation)
- `/api/ai/analyze-paddle` — PaddleOCR-based (primary path going forward)

Both share the same downstream ingredient parsing, nutrition parsing, and health-scoring logic — only the OCR extraction step differs.

## Project structure

foodscan-ai/
├── client/ # React frontend (Vite)
│ └── src/
│ ├── api/ # Shared axios instance + endpoint constants
│ ├── components/ # Shared UI components
│ ├── context/ # Auth + Theme context providers
│ ├── features/ # Feature-based modules (auth, scanner, history, profile, settings)
│ ├── i18n/ # i18next config + locale JSON files
│ └── pages/ # Top-level route pages (Home, Dashboard)
│
├── server/ # Express backend
│ ├── controllers/
│ ├── models/ # Mongoose schemas (User, Scan)
│ ├── routes/
│ ├── middleware/ # Auth middleware, file upload handling
│ ├── services/
│ │ ├── ocr/ # Tesseract + PaddleOCR service clients, OCR pipelines
│ │ ├── parser/ # OCR cleanup, ingredient parser, nutrition parser
│ │ ├── scanner/ # Orchestrates OCR → parsing → analysis (per engine)
│ │ └── ai/ # Cloudflare AI integration for ingredient safety notes
│ ├── analysis/ # Ingredient dictionary matching, health scoring, safety status
│ └── ocrservice/ # Python FastAPI microservice wrapping PaddleOCR
│
└── README.md


## Getting started

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB (local or Atlas)
- A Cloudflare account with Workers AI access (for AI insights feature)

### 1. Backend setup

```bash
cd server
npm install
```

Create a `.env` file in `server/` with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_MODEL=your_cloudflare_model_name

OCR_SERVICE_URL=http://localhost:8001


Run the backend:
```bash
npm run dev
```

### 2. OCR microservice setup (PaddleOCR)

```bash
cd server/ocrservice
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

The Node backend expects this service to be running at the URL set in `OCR_SERVICE_URL`. If it's unreachable, scans automatically fall back to Tesseract (no Python service required for the app to function, just for the primary/higher-quality OCR path).

### 3. Frontend setup

```bash
cd client
npm install
npm run dev
```

## Key features

- **Dual OCR engine with automatic fallback** — PaddleOCR for accuracy, Tesseract as a resilient backup.
- **Structural OCR cleanup** — handles common OCR artifacts (missing brackets, dropped commas at ingredient boundaries, line-wrap issues) independent of which engine produced the text.
- **Ingredient dictionary matching** — recognizes ingredients, flags allergens and restricted additives, handles compound ingredients with sub-ingredient lists.
- **Health scoring** — calculated from nutrition values (sugar, sodium, fat, fiber, protein) and ingredient risk.
- **Safety status** — separate from the health score; flags allergens and restricted ingredients explicitly (`Safe` / `Caution` / `Unsafe`).
- **AI-powered insights (on-demand)** — supplementary per-ingredient notes and tips generated via Cloudflare AI, clearly labeled as AI-generated and never overriding the deterministic health score/tips.
- **Scan history** — every scan is saved per-user, with list, detail view, and delete.
- **Multi-language support** — English, Hindi, Kannada, Tamil, Telugu, Malayalam across the entire UI.
- **JWT authentication** — protected routes on both frontend and backend.

## API overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in, returns JWT |
| GET | `/api/auth/profile` | Get current user's profile (protected) |
| POST | `/api/ai/analyze` | Scan an image (Tesseract pipeline, protected) |
| POST | `/api/ai/analyze-paddle` | Scan an image (PaddleOCR pipeline, protected) |
| POST | `/api/ai/insights/:scanId` | Get AI-generated ingredient notes/tips for a saved scan (protected) |
| GET | `/api/history` | List the current user's saved scans (protected) |
| GET | `/api/history/stats` | Aggregate scan stats for dashboard/profile (protected) |
| GET | `/api/history/:id` | Get one saved scan's full detail (protected) |
| DELETE | `/api/history/:id` | Delete a saved scan (protected) |

## Known limitations / open items

- No automated test suite yet — all testing so far has been manual, against real label photos.
- Deployment is not yet configured; the project currently runs locally only.
- The "Unsafe" safety verdict path has not yet been exercised against a real product with a flagged/restricted additive.
- Product name and brand are not currently extracted from labels — the UI has placeholders for these fields but the backend does not populate them yet.

## License

Not yet decided.