# The AI Atlas

Evidence for the AI age. Benefits and risks across every sector, made readable.

---

## Deploy in 5 minutes

### Prerequisites
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free, sign in with GitHub)
- Node.js 18+ on your machine (check with `node -v`)

### Steps

1. **Create a GitHub repo**
   - Go to github.com/new
   - Name it `ai-atlas`, set to Public, click Create
   - Clone it: `git clone https://github.com/YOUR_USERNAME/ai-atlas.git`

2. **Copy this project into it**
   - Copy every file from this folder into your cloned repo

3. **Push to GitHub**
   ```
   cd ai-atlas
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. **Deploy on Vercel**
   - Go to vercel.com/new
   - Import your `ai-atlas` repository
   - Framework: Next.js (auto-detected)
   - Click Deploy
   - Done. Your site is live at `ai-atlas-XXXX.vercel.app`

5. **Optional: custom domain**
   - In Vercel dashboard → Settings → Domains
   - Add `aiatlas.org` or whatever you register
   - Update DNS as instructed

---

## How to update content

The entire site reads from one file: `public/data.json`.

### Adding a single entry

Open any chatbot (Claude, ChatGPT, etc.) and say:

> Add this to my AI Atlas data.json. Here's the study: [paste link or describe the finding]

The chatbot will generate a JSON entry like:

```json
{
  "id": "EV-0013",
  "claim": "Your one-sentence claim here.",
  "summary": "Plain-language explanation accessible to non-experts.",
  "stat": "Key number",
  "stat_context": "What the stat measures",
  "sectors": ["education"],
  "type": "peer_reviewed",
  "impact": "harm",
  "authors": "Last, F. & Last, F.",
  "publication": "Journal Name",
  "year": 2024,
  "doi": "10.xxxx/xxxxx",
  "tags": ["tag1", "tag2"]
}
```

Paste it into the `evidence` array in `public/data.json`, push to GitHub, and Vercel auto-deploys.

### Batch updates

Accumulate findings over a week, then do one session:

> Here are 6 things I found this week. Generate AI Atlas entries for each:
> 1. [finding]
> 2. [finding]
> ...

### Entry schema reference

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| id | Yes | `EV-XXXX` | Increment from last entry |
| claim | Yes | string | One sentence, max 200 chars |
| summary | Yes | string | Plain language, max 500 chars |
| stat | Yes | string | Headline number (e.g. "64%", "6x faster", "Emerging") |
| stat_context | Yes | string | What the stat measures |
| sectors | Yes | array | From the sector list below |
| type | Yes | string | See evidence types below |
| impact | Yes | string | "benefit", "harm", or "mixed" |
| authors | Yes | string | "Last, F. & Last, F." format |
| publication | Yes | string | Journal, outlet, or org name |
| year | Yes | number | Publication year |
| doi | No | string | If peer-reviewed |
| url | No | string | If no DOI |
| tags | No | array | 2-4 keywords |

### Sectors
education, employment, politics, counterterrorism, healthcare, mental_health,
misinformation, creative_industries, criminal_justice, surveillance,
environment, finance, children_and_youth, military, social_media, journalism

### Evidence types
peer_reviewed, journalism, think_tank, industry_report,
government_report, company_disclosure, congressional_testimony,
whistleblower, legal_filing

---

## Deep Research Playbook

Use Claude's deep research feature (or equivalent) to build out each sector.
Do one sector per session. Here's the prompt template and sector-specific guidance.

### The prompt template

```
I'm building The AI Atlas, a public evidence base tracking AI's impact
across sectors. I need you to find the most important, well-sourced
evidence for the [SECTOR] sector.

For each finding, give me:
- The core factual claim (one sentence)
- A plain-language summary a college freshman would understand
- The headline statistic
- Whether this is a benefit, harm, or mixed evidence
- Full citation (authors, title, publication, year, DOI if available)
- 2-3 relevant tags

I want a balance of benefits and harms. Prioritize:
1. Peer-reviewed studies in major journals
2. Investigative journalism from credible outlets
3. Reports from established think tanks or government bodies

Skip opinion pieces, blog posts, and anything without verifiable sourcing.
Find 10-15 entries for this sector.
```

### Sector-by-sector research notes

**Education** — Your strongest sector. Key threads: cognitive offloading studies, AI tutoring RCTs, academic integrity research, accessibility gains for disabled students, the writing skills debate. Sources to prioritize: UPenn/Wharton working papers, Digital Promise, UNESCO AI in education reports.

**Children & Youth** — Your professional territory. Key threads: emotional deskilling, AI companion apps (Character.AI, Replika), COPPA enforcement gaps, age verification failures, developmental impact studies. Sources: Common Sense Media (you already have the connection), 5Rights Foundation, UK Children's Commissioner reports, Joan Ganz Cooney Center.

**Mental Health** — Key threads: AI therapy tools (Woebot, Wysa) efficacy studies, parasocial AI relationships, AI-generated self-harm content, diagnostic accuracy for depression/anxiety screening. Both significant benefits and harms here.

**Misinformation** — Well-documented sector. Key threads: deepfake detection arms race, LLM-generated disinformation at scale, the Vosoughi virality study you already have, platform moderation failures, election integrity. Sources: MIT Media Lab, Stanford Internet Observatory, Oxford Internet Institute.

**Healthcare** — Strong benefit-heavy sector. Key threads: diagnostic imaging (you have McKinney), drug discovery (AlphaFold, you have this), clinical trial optimization, health equity concerns (training data bias in dermatology), FDA AI device approvals. Sources: Nature Medicine, JAMA, The Lancet Digital Health.

**Employment** — Key threads: hiring bias (you have Amazon), workforce displacement projections, upskilling programs, gig economy algorithmic management, AI coding productivity studies. Sources: MIT Work of the Future, Brookings, WEF Future of Jobs reports.

**Criminal Justice** — Key threads: predictive policing (you have Richardson), facial recognition error rates by race (NIST studies), bail/sentencing algorithms (COMPAS/ProPublica), recidivism prediction. Sources: ACLU, Brennan Center, NIST FRVT.

**Politics** — Key threads: deepfakes in elections (you have Sensity), AI-generated campaign content, micro-targeted political ads, AI in legislative drafting, authoritarian surveillance deployments. Sources: Freedom House, Brookings, Carnegie Endowment.

**Environment** — Key threads: weather prediction (you have Google DeepMind), energy consumption of AI training, AI for biodiversity monitoring, precision agriculture, climate modeling. Both significant benefits (prediction) and costs (compute energy).

**Surveillance** — Key threads: facial recognition bans/moratoriums, China social credit documentation, workplace monitoring, biometric data collection, law enforcement body cam AI. Sources: EFF, Access Now, Human Rights Watch.

**Creative Industries** — Key threads: copyright litigation (NYT v. OpenAI), artist displacement, music generation, deepfake pornography, AI-generated content flooding platforms. Sources: US Copyright Office, Authors Guild, Music Artists Coalition.

**Finance** — Key threads: algorithmic trading flash crashes, AI credit scoring bias, fraud detection improvements, robo-advisory performance, insurance risk modeling. SEC reports, Federal Reserve working papers.

**Journalism** — Key threads: AI-generated news articles, newsroom layoffs correlated with AI adoption, fact-checking automation, source verification tools. Sources: Reuters Institute, Nieman Lab, Columbia Journalism Review.

### Research session workflow

1. Open Claude with deep research enabled
2. Paste the prompt template with your target sector
3. Review the output — verify every DOI and URL works
4. Format into data.json entries
5. Push to GitHub
6. Move to next sector

At 10-15 entries per sector across 13 active sectors, you'll have 130-195 entries. That's a credible, launchable evidence base.

---

## Project structure

```
ai-atlas/
├── app/
│   ├── layout.js        ← SEO metadata, html wrapper
│   ├── page.js          ← Server component, reads data.json
│   ├── atlas.js         ← Client component, all UI
│   └── globals.css      ← Minimal reset
├── public/
│   └── data.json        ← THE CONTENT FILE (edit this)
├── package.json
├── next.config.js
└── README.md
```

---

## License

Content is CC BY 4.0. Code is MIT.
