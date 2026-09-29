# Noor Mohideen — Editorial Portfolio (React + Tailwind CSS + Framer Motion)

A static frontend portfolio web application for **Noor Mohideen** (AI Solution Architect & MSc AI Candidate at the University of Edinburgh), built with **React 18**, **Tailwind CSS**, and **Framer Motion**, inspired directly by high-end architectural design portfolios and deployed to **GitHub Pages**.

---

## ⚡ Single Source of Truth: `src/data/resume.yaml`

All content is managed through a single static YAML file:
* **Location**: `src/data/resume.yaml`
* **Zero code changes**: Update your bio, add a project, edit job bullets, or update contact links simply by editing this clean YAML file.
* **Instant HMR**: In local development, saving `resume.yaml` updates the portfolio immediately without refreshing.

---

## 🎨 Architectural Design & Motion (Inspired by Reference Portfolio)

The portfolio adopts an editorial design system:
1. **Cover / Hero**:
   - Bold title `Portfolio.` with author name and sub-headline.
   - Generative concentric system geometry representing agent topology.
   - Live Architecture Inspector demonstrating dual-mode routing.
2. **Profile & About**:
   - Editorial `Hello.` greeting with a two-column layout.
   - Education, experience, and capability breakdowns with high typographical discipline.
3. **Contents Index**:
   - The iconic horizontal `.01`, `.02`, `.03` gallery strips with domain indicators and quick jump links.
4. **Deep Dive Case Studies**:
   - `.01 Decision & Comparison Agent` (Autonomous Reasoning)
   - `.02 Multi-Source Coding Pipeline` (Agentic Synthesis)
   - `.03 Multi-Agent Data Warehousing` (MCP Orchestration)
   - Detailed breakdown into **Main Idea**, **Challenges**, **Architectural Strategy**, and **System Info** with topology schematics.
5. **Interactive Capabilities Matrix**:
   - Real-time search and filterable categories with fluid Framer Motion `layout` reordering animations and sliding tab indicators.
6. **Closing / Contact**:
   - Minimalist bold `Thanks.` with instant copy-to-clipboard email and phone triggers.

---

## 🚀 Running Locally

```bash
cd portfolio
npm install
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🚢 Deploying to GitHub Pages

An automated GitHub Actions workflow is located at `.github/workflows/deploy.yml`:
1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio with YAML and editorial motion design"
   git push origin main
   ```
2. GitHub Actions will automatically bundle the static site and publish it to:
   **`https://life-with-magic.github.io/noor-mohideen-portfolio/`**
