# Digital MRF: Smarter Waste Tracking System

A lightweight, offline-first digital solution designed for rural Material Recovery Facilities (MRFs). This tool simplifies waste inflow tracking, classification, and reporting to help local facilities operate more transparently and efficiently.

---

## 🌍 Problem Statement

Rural MRFs often face challenges such as:

- Manual, error-prone paper-based tracking
- No real-time view of operations
- Difficulty generating stakeholder-friendly reports
- Poor coordination between intake, sorting, and dispatch
- Lack of data insights to optimize performance

---

## ✅ Features

### 1. Real-Time Dashboard Monitoring

- Instant visibility into intake, processing status, and efficiency
- Interactive charts show weekly trends and composition breakdowns
- Progress tracking across all processing stages (sorting, QC, dispatch)

### 2. Streamlined Waste Entry System

- Replaces paper logs with intuitive digital forms
- Captures source, weight, type, and condition
- Offline-first: continue logging even without internet
- Reduces errors and improves data reliability

### 3. Smart Classification Management

- Batch-based system for organizing sorted materials
- Integrated quality control workflows
- Tracks destinations, quantities, and sorting performance
- Improves material recovery through insights

### 4. Automated Reporting

- Generates weekly/monthly reports automatically
- Stakeholder-specific formats (SHGs, PDOs, Gram Panchayats)
- Improves transparency and community trust
- Supports regulatory compliance

---

## 🚀 Key Benefits

- **Transparency**: Real-time visibility for all stakeholders
- **Efficiency**: Replaces manual work with streamlined digital workflows
- **Accuracy**: Minimizes data loss and entry errors
- **Accessibility**: Simple, mobile-friendly UI for rural users
- **Offline Support**: Works in low-connectivity environments
- **Scalability**: Designed to grow with operational needs

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Build Tool**: Vite

> ⚠️ Currently, the app is frontend-only and runs on static mock data for demo purposes.

---

### Suggested Tables:

- `waste_entries`: logs intake with weight, type, and source
- `classification_batches`: tracks sorting and QC
- `processing_status`: monitors workflow progress
- `reports`: stores generated report data per period

You can connect your backend to replace the mock data with real-time queries and enable persistent storage for facility operations.

---

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/szaid47/rural-waste-monitor
cd rural-waste-monitor

# Install dependencies
npm install

# Run the dev server
npm run dev
```
