# TEKNIA — Technology Export Knowing Net Value Into Aggregation

**Definición oficial.**
**TEKNIA** es la gramática económico‑técnica que convierte **conocimiento verificable** en **valor neto
agregable**, mediante **TEKTOKs** (notas mínimas de valor técnico) **selladas en CDTL** y **trazadas** con
evidencia reproducible (DET/S1000D ISSUE 6). TEKNIA **exporta tecnología**, prioriza el **saber contextualizado**,
mide **Net Value (anti‑burbuja)** y **agrega** para habilitar carteras, pilotos e **IPO‑pre‑génesis**.

## 1) Propósito

* **Exportar** conocimiento listo para adopción (no silos).
* **Saber** con contexto: métricas, porqués y trazabilidad.
* **Valor neto**: descontar ruido y riesgo con evidencia reproducible.
* **Agregación**: de TEKTOKs a proyectos, portfolios y génesis financieras.

## 2) Principios (AQUA)

1. **Hash‑only on‑chain** (CDTL): pruebas, no datos sensibles.
2. **Reproducibilidad**: toda afirmación viene con DET y RTM.
3. **Anti‑burbuja**: Net Value = métrica verificada × descuento de riesgo.
4. **Agregación con reglas**: sin duplicados, con sinergias acotadas y umbrales.
5. **Ética y cumplimiento**: GDPR/MiCA, licencias claras, auditoría abierta.

Nota de control: el campo `domain` debe salir de un catálogo controlado (p. ej. ATA + códigos propios), versionado en el repo y opcionalmente anclado (hash-only) en CDTL para evitar divergencias.

---

## 3) Campos mínimos de un TEKTOK (schema mínimo)

```yaml
tektok:
  id: "TEKTOK-<dominio>-<slug>-<nnnn>"
  title: "Nombre corto verificable"
  owner_org: "AQUA|Socio"
  authors: [{ name: "Nombre", id: "ORCID|Git" }]
  domain: "ATA-56|ATA-02|CQH|..."
  summary: >-
    Qué resuelve, base técnica, alcance y límites, en 4–6 líneas.
  links:
    ce_id: "CE-... (S1000D-Q)"
    dm_refs: ["docs/S1000D-Q/.../DM-ARCH.yaml"]
    repo_path: "ruta/al/artefacto.principal"
  effectivity:
    aircraft_sn: "Q100-0001"
    config: "BWB-H2"
    mod_state: "MS1"
  evidence:
    det_uris: ["events/DET-...json"]
    sha256: "64_hex_de_canonical"
    cdtl_anchor:
      network: "cdtl-main-sandbox"
      tx_id: "0x..."
      block_hash: "0x..."
      height: 1234
  net_value:
    inputs:
      trl: 1..9
      quality: 0.0..1.0
      energy_saving_pct: 0..100
      co2e_avoided_kg_per_unit: 0..N
      market_readiness: 0.0..1.0
      risk_discount: 0.0..0.5
    weights:
      trl: 0.30
      quality: 0.20
      energy: 0.20
      market: 0.15
      co2e: 0.15
    score: 0.0..1.0
  circularity:
    repairability: 0.0..1.0
    recycled_content_pct: 0..100
    reuse_rate_pct: 0..100
    greenscore: 0.0..1.0
  rights:
    license: "CC-BY-4.0|Apache-2.0|Propietaria"
    usage: "Investigación|Comercial|Mixta"
  rie:
    events: ["Zenodo DOI","PR aceptado","Estándar/SC","MoU piloto"]
  date_issued: "2025-01-16T10:00:00Z"
  signature: "ed25519:base64"
```

**Requisitos mínimos (must):** `id,title,owner_org,domain,summary,links.ce_id,evidence.sha256,net_value.score`.

---

## 4) Net Value (anti‑burbuja) — fórmula canónica

Normalizaciones:

* `trl_norm = trl / 9`
* `energy_norm = min(energy_saving_pct / 30, 1)`
* `co2e_norm = min(co2e_avoided_kg_per_unit / 100, 1)`

Ponderación: `w = {trl:0.30, quality:0.20, energy:0.20, market:0.15, co2e:0.15}`.
Descuento de riesgo `β ∈ [0,0.5]`, aplicado **linealmente** como multiplicador `(1-β)`.
Si se adopta una versión no lineal (p. ej. log-odds para riesgos extremos), debe publicarse como nueva versión de la fórmula y trazarse en el DET.

`NV = (0.30*trl_norm + 0.20*quality + 0.20*energy_norm + 0.15*market + 0.15*co2e_norm) * (1-β)`

---

## 5) Sellado y verificación (CDTL/DET)

* **Canonicalización**: antes de hashear, normalizar finales de línea (LF) y asegurar `\n` final.
* **On-chain**: publicar solo el **hash** (no datos sensibles). El anclaje puede ser real o simulado (sandbox).
* **Verificación**: la evidencia (DET/RTM) debe permitir reproducir el claim (inputs → score → agregación).

Formato mínimo recomendado para un DET (machine-readable), evitando “DET vacíos”:

```json
{
  "tektok_id": "TEKTOK-...",
  "tool": "teknia-tools",
  "tool_version": "1.x",
  "schema": "tektok.schema.yaml",
  "git_commit": "<sha>",
  "dataset_sha256": "<64hex>",
  "inputs": { "trl": 7, "quality": 0.85, "energy_saving_pct": 5, "co2e_avoided_kg_per_unit": 30, "market_readiness": 0.70, "risk_discount": 0.05 },
  "weights": { "trl": 0.30, "quality": 0.20, "energy": 0.20, "market": 0.15, "co2e": 0.15 },
  "computed_score": 0.557,
  "checks": [
    { "name": "schema", "ok": true },
    { "name": "nv_recompute", "ok": true }
  ]
}
```

Comandos (pack local):

```bash
npm run validate:tektok
npm run validate:agg
npm run nv
npm run hash -- events/TEKTOK.Minted.sample.json
```

## 6) Reglas de agregación (mínimas)

* Sin duplicados por `evidence.sha256`.
* `net_value.score ≥ 0.50` y `evidence.det_uris` verificables.
* Pesos α suman 1; sinergia solo justificable como **reducción de riesgo** y acotada (por ejemplo, `ΔNV ≤ +0.05`).

Ejemplo (ilustrativo):

* Base: `NV_portfolio = Σ(alpha_i * nv_i)`
* Sinergia: `NV_portfolio' = NV_portfolio + ΔNV`, con `0 ≤ ΔNV ≤ 0.05`.

