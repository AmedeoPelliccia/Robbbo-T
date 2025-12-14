# IDEALEEU.EU

<a><img src="https://img.shields.io/badge/CI-Structure-blue"></a>
<a><img src="https://img.shields.io/badge/CI-Links-blue"></a>
<a><img src="https://img.shields.io/badge/UTCS-QS→FWD→UE→FE→CB→QB-grey"></a>

Website: <a href="https://www.idealeeu.eu">https://www.idealeeu.eu/</a>

---

## What is IDEALEEU?

**IDEALEEU** is a strategic and technical framework designed to help complex industries **make progress on problems that cannot be solved by a single actor**.

It focuses on situations where:

* uncertainty is systemic,
* responsibilities are distributed,
* safety and regulation matter,
* and value is created long before products are delivered.

IDEALEEU does not propose products or technologies.
It provides a **common structure to understand problems, measure progress, and recognize value** across organizations.

---

## The core problem IDEALEEU addresses

Many large programs fail not because of a lack of ideas, but because:

* uncertainty is fragmented,
* contributions are invisible or unrewarded,
* competition discourages knowledge sharing,
* and strategic decisions are made without clear evidence.

This is especially true in domains such as:

* civil aerospace,
* energy transition,
* safety-critical infrastructure,
* regulated industrial ecosystems.

IDEALEEU addresses this by treating progress as **reduction of uncertainty**, not as accumulation of documents or promises.

---

## NKU — Net Knowledge Unit

At the foundation of IDEALEEU is the **NKU (Net Knowledge Unit)**.

**NKU = New Knowledge Understanding in Network Knots of Uncertainty**

An NKU is:

* the smallest verifiable gain in understanding,
* that reduces uncertainty at a specific **knot**,
* within a network of interdependent uncertainties.

A knot is where multiple concerns intersect (e.g. technology × certification × cost × operations).

An NKU exists only if:

* the uncertainty is explicitly stated,
* evidence is provided,
* residual uncertainty is bounded,
* and downstream impact is identified.

Information without uncertainty reduction is **not** an NKU.

---

## Knots: how IDEALEEU frames complex problems

IDEALEEU models complex challenges as **networks of knots**, not as linear roadmaps.

Examples of knots:

* transitioning civil aerospace to carbon-neutral or net-positive operation,
* certifying disruptive technologies under existing regulations,
* aligning industrial transformation with long asset lifecycles,
* coordinating infrastructure, policy, and market adoption.

Knots cannot be solved by one technology or one company.
They require **distributed contributions**, each reducing part of the uncertainty.

---

## TEKTOK — value exchange and governance

While NKUs describe **knowledge value**, **TEKTOKs** describe **value exchange**.

A **TEKTOK** is the governed, auditable wrapper that captures:

* which NKUs are shared,
* under what rights and obligations,
* within which context (licence, SLA, program, policy),
* and with what risk allocation.

In simple terms:

* **NKU** defines *what is known*,
* **TEKTOK** defines *how that knowledge is exchanged and used*.

This separation avoids conflating knowledge creation with contracts or pricing.

---

## Why this matters for large programs

In traditional models:

* only final deliverables are rewarded,
* early uncertainty resolution is unpaid,
* losing bidders subsidize the winner,
* and strategic knowledge is kept opaque.

IDEALEEU enables:

* recognition of contributions **before competition outcomes**,
* fair compensation for uncertainty reduction,
* collaboration without loss of attribution,
* and more credible, lower-risk programs.

This is essential for transitions that span decades and institutions.

---

## IDEALEEU and AMPEL360

AMPEL360 is an example of a challenge space where IDEALEEU applies.

No single organization can design, certify, fund, and operate a net-positive aerospace system alone.

IDEALEEU provides:

* a shared problem framing,
* a way to map strategic knots,
* a method to value contributions from many actors,
* and a governance language compatible with regulation and procurement.

IDEALEEU does **not** replace programs like AMPEL360.
It defines the **conditions under which such programs can be built coherently**.

---

## What this repository contains

This repository contains:

* conceptual definitions (NKU, TEKTOK, knots),
* methodological foundations,
* mathematical and systems modeling references,
* example application domains (e.g. energy capture, control, transition pathways).

It is a **foundation repository**, not a product repository.

---

## What this repository is not

This repository is not:

* marketing material,
* a product catalogue,
* a business pitch deck,
* or a finished solution.

It is a **shared intellectual and operational framework**.

---

## Who this is for

IDEALEEU is relevant to:

* system architects and chief engineers,
* program and portfolio leaders,
* regulators and certification bodies,
* infrastructure and energy stakeholders,
* investors focused on long-term, real assets.

If you work on problems where **no single actor has the full answer**, IDEALEEU is designed for you.

---

## Getting started

* Read the TEKNIA Manifesto: `docs/TEKNIA/TEKNIA-Manifesto.md`
* Explore the methodological tools: `tools/teknia-tools/`
* Review example uncertainty knots and NKUs
* Engage by proposing or resolving a knot

---

## Repository Structure

This repository is organized into the following main sections:

### Projects
* [PROJECTS/AMPEL360/](./PROJECTS/AMPEL360/) — Manned aerospace systems with quantum-enhanced capabilities
* [PROJECTS/INFRANET/](./PROJECTS/INFRANET/) — Infrastructure and network systems

### Products
* [PRODUCTS/](./PRODUCTS/) — Strategic product lines organized by operational characteristics

### Environments
* [ENVIRONMENTS/](./ENVIRONMENTS/) — Digital and physical operational contexts

### Fields
* [FIELDS/](./FIELDS/) — Specialized domain categories

### Documentation
* [docs/TEKNIA/](./docs/TEKNIA/) — TEKNIA framework documentation
  * [docs/TEKNIA/TEKNIA-Manifesto.md](./docs/TEKNIA/TEKNIA-Manifesto.md) — Core manifesto
* [docs/PLAYBOOKS/](./docs/PLAYBOOKS/) — Operational playbooks
  * [docs/PLAYBOOKS/H2_SAFETY.md](./docs/PLAYBOOKS/H2_SAFETY.md) — Hydrogen safety procedures
* [docs/ROADMAP.md](./docs/ROADMAP.md) — Project roadmap

### Governance
* [governance/COMPLIANCE/](./governance/COMPLIANCE/) — Compliance documentation
  * [governance/COMPLIANCE/MoC/](./governance/COMPLIANCE/MoC/) — Means of Compliance
  * [governance/COMPLIANCE/MoC/examples/](./governance/COMPLIANCE/MoC/examples/) — MoC examples
* [governance/MAL-EEM/](./governance/MAL-EEM/) — Machine Learning Ethics, Empathy, Explainability, and Mitigation
  * [governance/MAL-EEM/checklist.md](./governance/MAL-EEM/checklist.md) — MAL-EEM checklist

### Tools
* [tools/teknia-tools/](./tools/teknia-tools/) — TEKNIA methodological tools
  * [tools/teknia-tools/schemas/](./tools/teknia-tools/schemas/) — JSON schemas
  * [tools/teknia-tools/examples/](./tools/teknia-tools/examples/) — Usage examples
  * [tools/teknia-tools/scripts/](./tools/teknia-tools/scripts/) — Automation scripts
  * [tools/teknia-tools/events/](./tools/teknia-tools/events/) — Event definitions
  * [tools/teknia-tools/tektoks/](./tools/teknia-tools/tektoks/) — TEKTOK implementations
  * [tools/teknia-tools/aggregations/](./tools/teknia-tools/aggregations/) — Data aggregations
* [tools/CLI/](./tools/CLI/) — Command-line interface tools
* [tools/templates/](./tools/templates/) — Document templates

### Continuous Integration
* [ci/gates/](./ci/gates/) — CI gate enforcement
  * [ci/gates/FCR_1_checklist.md](./ci/gates/FCR_1_checklist.md) — Feature Completion Report checklist
  * [ci/gates/FCR_2_checklist.md](./ci/gates/FCR_2_checklist.md) — UTCS traceability checklist
  * [ci/gates/NAME_LOCK_ALLOWLIST.md](./ci/gates/NAME_LOCK_ALLOWLIST.md) — Name-lock enforcement
* [ci/workflows/](./ci/workflows/) — CI/CD workflow definitions

### Scripts
* [scripts/](./scripts/) — Automation and utility scripts

### Supporting Documentation
* [CONTRIBUTING.md](./CONTRIBUTING.md) — Contribution guidelines
* [SECURITY.md](./SECURITY.md) — Security and responsible disclosure
* [.ASI-T2-STRUCTURE-VERIFICATION.md](./.ASI-T2-STRUCTURE-VERIFICATION.md) — Repository structure verification

---

## Guiding principle

> **Progress is not measured by how much we claim to know,
> but by how much uncertainty we can responsibly remove together.**

