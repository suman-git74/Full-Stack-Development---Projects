# 💹 Interest Intelligence: Financial Microservices

Welcome to the command center of your financial calculation engine. This project is a multi-tier microservices architecture designed to handle interest calculations with precision and scale.

---

## 🏗 Phase 1: The Architecture (Monorepo)

This isn't just a simple app; it's a distributed system:

*   **⚡ API Gateway:** The single entry point. It orchestrates traffic and routes requests to the appropriate calculation engines.
*   **➕ Simple Interest Service:** A dedicated micro-node focused on linear growth calculations.
*   **📈 Compound Interest Service:** A high-performance service for exponential growth modeling.
*   **💻 Frontend:** A sleek interface to visualize financial projections.

---

## 🚀 Phase 2: System Deployment

### Option A: Automated Sequence (Windows)
1.  Run `run.bat` in the root folder.
2.  The script will initialize all three backend services and the frontend simultaneously.

### Option B: Manual Startup (Step-by-Step)

To see the system come online manually, run `npm install` and `node index.js` in each of these folders in order:
1.  **`simple-interest-service`** (Port 3001)
2.  **`compound-interest-service`** (Port 3002)
3.  **`api-gateway`** (Port 3000)
4.  **`frontend`** (Client-side)

---

## 🔍 Phase 3: Technical Overview

### 📡 The Gateway Protocol
The **API Gateway** acts as the brain. Instead of the frontend talking to multiple services, it sends everything to Port 3000, which then delegates to the internal network.

### 🧮 Calculation Engines
*   **Simple Interest:** Uses the standard `P * R * T / 100` logic.
*   **Compound Interest:** Implements the `P * (1 + r/n)^(nt)` formula for accurate financial modeling.

---

## 🎯 Mission Outcome
By deploying this, you've implemented a scalable microservices pattern with a unified gateway—the standard for modern enterprise applications.

**Analyze. Calculate. Grow.** 🚀
