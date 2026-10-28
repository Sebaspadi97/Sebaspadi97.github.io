---
titulo: "How many days does a patient have left in hospital?"
pregunta: "Can remaining length of stay be estimated better than with the historical average?"
hallazgo: "the model cuts error to 6.19 days, 6.4% less than the historical baseline."
descripcion: "A model that estimates how many hospital days a patient has left, with temporal validation and now in an institutional pilot."
pilar: "ml"
herramientas:
  - "Python"
  - "scikit-learn"
  - "pandas"
fecha: "Oct 2026"
repo: "https://github.com/Sebaspadi97/hospital-length-of-stay"
portada: "/img/casos/estancia/02_error_por_dias_restantes.webp"
destacado: false
orden: 2
publicar: true
etiquetaDatos: "aggregate results"
lineaEquipo: "Team project with Alexandra Castro and Kevin Alejandro Paez."
simulador: false
ficha:
  - dato: "Team"
    valor: "Alexandra Castro, Kevin Alejandro Paez and Sebastián Padilla"
  - dato: "My role"
    valor: "Data quality and preparation, leakage control, experiment tracking, error analysis by group and reproducibility"
  - dato: "Method"
    valor: "Supervised regression · CRISP-DM · temporal validation"
  - dato: "Tools"
    valor: "Python · scikit-learn · XGBoost · pandas · Power Pages"
  - dato: "Context"
    valor: "Final project for Machine Learning I, Master's in Data Science (Universidad EAN), 2026"
  - dato: "Status"
    valor: "Completed · institutional pilot underway"
sobreLosDatos: "This project uses real clinical data from a high-complexity hospital in Bogotá, processed with institutional authorization for analytical and academic purposes. Patient records are not published. Only aggregate results are shown here, with no identifiers or individual records. The data does not come from the author's employer."
licencia: "Code (by the three authors) and aggregate results: all rights reserved. Results may be cited with attribution to the three authors."
es: "estancia-hospitalaria"
---

## The question

> How many hospital days does a patient have left, given their age, sex, diagnosis-related group (DRG), severity and the days they have already spent in hospital?

In a high-complexity hospital, not knowing when a patient will be discharged makes three things harder: planning reviews, coordinating discharge and managing beds. The model does not replace clinical judgment. It gives a signal to prioritize follow-up.

- **Who decides:** bed management and clinical operations; medical decisions stay with the care team.
- **Cost of error:** underestimating creates false expectations; overestimating delays discharge planning.

## The data

We used 37,053 hospital stays from 2024 to 2026, split by year to avoid looking into the future.

```cifras
37,053 | hospital stays
8 | features
2024–2026 | coverage
```

| Year | Use | Volume |
| --- | --- | --- |
| 2024 | Historical baseline (median by DRG and severity) | 14,096 stays |
| 2025 | Training and cross-validation | 13,855 stays · 42,657 snapshots |
| 2026 | Temporal test | 9,102 stays · 28,829 snapshots |

- **Sources:** clinical management records (length of stay, DRG, severity, weight and expected stay) joined with the minimum basic data set (age and sex), with 99.99% match.
- **Snapshots:** each stay is observed on days 0, 1, 3, 7, 14, 30 and 60 while still open. The target is remaining days = final length of stay − current day.
- **Eight features:** current day, age, sex, DRG, severity, DRG weight, expected stay and 2024 historical median.
- **Fun fact:** the average stay is 8.6 days, but the median is 5. A few very long cases (up to 466 days) stretch the average.

## The approach

We compared eight algorithms against two simple baselines, and Random Forest won with the lowest mean error in validation (5.98 days).

1. **Two baselines to beat:** a constant median and the historical median by DRG and severity (2024 P50).
2. **Leak-free validation:** GroupKFold by stay, so snapshots of the same patient never land in both training and validation.
3. **Preprocessing inside the pipeline:** imputation, encoding and scaling are learned only from each training split.
4. **Ablation:** removing the baselines and the DRG raises error from 6.01 to 7.65 days, confirming their value.
5. **Final test on 2026:** the winning model is applied to a year that was not used to choose it.

The differences between Random Forest, XGBoost and HistGradientBoosting are small, so the choice follows the pre-declared rule and is not presented as a clear superiority.

![Mean absolute error in 2025 cross-validation for 8 algorithms and 2 baselines: Random Forest 5.98, XGBoost 5.99, HistGradientBoosting 6.01; historical P50 baseline 6.23; unpruned tree 7.69.](/img/casos/estancia/01_comparacion_modelos.webp "The top six models are within 0.12 days of each other; the unpruned tree is the clear case of overfitting (chart labels in Spanish).")

## The findings

> On the 2026 test, Random Forest lowers mean error to 6.19 days, 6.4% less than the historical baseline. But it doesn't win everywhere.

| Metric (2026 test) | Random Forest | Historical P50 | Constant median |
| --- | --- | --- | --- |
| MAE (days) | **6.19** | 6.62 | 7.34 |
| RMSE (days) | **12.10** | 13.24 | 14.81 |
| R² | **0.24** | 0.09 | −0.14 |
| Within ±3 days | 46.8% | **53.5%** | 51.6% |
| Bias (predicted − actual) | **−0.6 d** | −4.4 d | −5.1 d |

- **Short stays:** with 7 days or fewer remaining, the simple baseline is more accurate than the model.
- **Long stays, the big challenge:** with more than 28 days remaining, error rises to 28.7 days and the model underestimates by about 24 days on average.
- **The unit changes the conclusion:** if each stay counts equally (instead of each snapshot), the baseline comes out slightly ahead (4.69 vs. 4.78 days).
- **By severity:** error ranges from 2.3 days at low severity to 8.7 at high severity.

![Mean absolute error on the 2026 test by days actually remaining: with 3 days or fewer the model misses by 3.7 vs. 2.1 for the baseline; with more than 28 days, 28.7 vs. 37.1.](/img/casos/estancia/02_error_por_dias_restantes.webp "The model starts beating the baseline at 8 remaining days, exactly where bed planning is hardest (chart labels in Spanish).")

## The recommended decision

> Use the model as an informative, supervised aid to prioritize discharges, never as a discharge date.

- Show each estimate with an uncertainty band, not as an exact number.
- Trigger an alert when a patient belongs to a group with high error risk (long stays, high severity).
- Do not use the estimated date for irreversible operational commitments.
- Agree with the clinical team on an acceptable error threshold and which is costlier: underestimating or overestimating.

The model is already in an institutional pilot; following those patients will measure its real-world performance.

## Limitations

These results come from a retrospective test, not a guarantee of accuracy on active patients.

- **Discharge DRG:** the final diagnostic group may include information from after the simulated day; in practice only a provisional, less complete DRG exists.
- **Test set not fully untouched:** 2026 was consulted during earlier iterations. A later, unseen cohort is needed.
- **Moderate overfitting:** Random Forest shows a 1.1-day gap between training (4.88) and validation (5.98).
- **Partial coverage:** not every patient meets the conditions to receive an estimate.
- **Fairness:** differences by sex do not prove discrimination; they may come from the mix of diagnoses and severity.
- **Impact not measured:** lower error does not mean fewer bed-days. That requires measuring the pilot.

## Team and my role

Team project with Alexandra Castro and Kevin Alejandro Paez. My work focused on data quality and preparation, information leakage control, experiment tracking and error analysis by group. I took part in the full development and in the final defense.

| Member | Program | Main contribution |
| --- | --- | --- |
| **Sebastián Padilla** | Master's in Data Science | Data quality and preparation, leakage control, experiment tracking, error analysis by group and reproducibility |
| Alexandra Castro | Specialization in Machine Learning | Models, cross-validation, overfitting, metrics and algorithm comparison |
| Kevin Alejandro Paez | Master's in Data Science | Operational problem, data flow, features, institutional application and pilot follow-up |

The team used ChatGPT to support organization, code review and documentation; all results were verified by the team.
