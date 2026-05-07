# Real Estate Optimizer

A web application that helps real estate investors find undervalued properties near zoning transition zones — neighborhoods where policy trends suggest the area will be rezoned to higher-value classifications.

---

## Quick Start (Complete Beginner Guide)

### What you need
- A computer running Windows, Mac, or Linux
- Node.js installed (free download at nodejs.org — get the "LTS" version)
- About 5 minutes

---

## Part 1 — Running the App for the First Time

Follow these steps exactly, one at a time:

### Step 1 — Open a terminal window
- **Windows**: Press the Windows key, type `cmd`, press Enter
- **Mac**: Press Cmd + Space, type `Terminal`, press Enter

### Step 2 — Navigate to the app folder
Type the following and press Enter:
```
cd C:\Projects\Realestateoptimizer
```

### Step 3 — Install the app's dependencies (first time only)
Type this and press Enter. Wait for it to finish (takes 1–2 minutes):
```
npm install
```
You'll see a lot of text scroll by — that's normal. Wait until you get your cursor back.

### Step 4 — Start the app
Type this and press Enter:
```
npm run dev
```
You'll see a message like:
```
VITE ready in 197ms
Local: http://localhost:5173/
```

### Step 5 — Open the app in your browser
Open any web browser (Chrome, Firefox, Edge, Safari) and go to:
```
http://localhost:5173
```
The app will appear. **Leave the terminal window open** — closing it stops the app.

### Step 6 — To stop the app
Go back to the terminal window and press **Ctrl + C**.

---

## Part 2 — Using the App

The search form has 4 steps. Click "Continue" after each one.

**Step 1 — Location**
Type a ZIP code, city, or neighborhood name. Best results: Use a 5-digit ZIP code (e.g., `30312`).

**Step 2 — Budget**
Drag the two slider handles to set your price range, or type numbers in the Min/Max boxes.

**Step 3 — Property Type**
Click the types of properties you want. You can select multiple. Highlighted = selected.

**Step 4 — Investment Horizon**
Pick how many years you plan to hold the property. Then click **"Analyze Properties"**.

After 2–3 seconds, you'll see a list of scored property cards.

**The 6 Investment Scores:**
| Score | What it means |
|-------|--------------|
| Zoning Transition | How likely is the area to be rezoned to a higher-value type? |
| Neighborhood Growth | Is the area's population and income growing? |
| Voting & Policy | Do local politicians support development? |
| Price-to-Value | Is this property cheaper than similar nearby rezoned areas? |
| Infrastructure | Are transit or major developments planned nearby? |
| Rental Income | Will rent cover costs while you hold the property? |

---

## Part 3 — Setting Up a Zillow API Key (Optional)

By default the app uses **simulated demo data**. An API key connects it to real Zillow listings.

### How to get a free key (5 minutes)

1. Go to `https://rapidapi.com` and create a free account
2. Search for **"Zillow56"** in the search bar and click the first result
3. Click the **"Pricing"** tab and subscribe to the **"Basic"** (free) plan — no credit card needed
4. Click the **"Endpoints"** tab — on the right side, copy the value next to **"X-RapidAPI-Key"**

### How to enter the key in the app

1. Open the app at `http://localhost:5173`
2. Click **"🔑 API Key"** in the top menu bar
3. Paste your key into the input field
4. Click **"Save API Key"**
5. The status pill turns green: **"API Key ✓"**

---

## Disclaimers

- All data without an API key is **simulated for demonstration**
- Scores are estimates, not investment guarantees
- This is **not financial advice** — consult a licensed professional before investing
- Your API key is stored only in your browser, never uploaded anywhere
