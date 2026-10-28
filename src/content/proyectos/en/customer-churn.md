---
titulo: "Which customers are about to leave?"
pregunta: "Who should you contact before they stop buying?"
hallazgo: "contacting the top 15.5% by expected value wins; contacting everyone loses money."
descripcion: "A churn model on synthetic data that ends in an economic decision: who to contact and with what action."
pilar: "ml"
herramientas:
  - "Python"
  - "scikit-learn"
  - "pandas"
fecha: "Oct 2026"
repo: "https://github.com/Sebaspadi97/customer-churn-retention"
portada: "/img/casos/abandono/03_curva_ganancia.webp"
destacado: true
orden: 1
publicar: true
etiquetaDatos: "synthetic data"
simulador: true
ficha:
  - dato: "Author"
    valor: "Sebastián Padilla (solo project)"
  - dato: "Method"
    valor: "Supervised classification · cross-validation · permutation importance · profit curve"
  - dato: "Tools"
    valor: "Python · scikit-learn · pandas · matplotlib"
  - dato: "Data"
    valor: "Synthetic: 20,000 customers of TiendaLab, a fictional online store"
  - dato: "Status"
    valor: "Version 1 complete · version 2 with an uplift model"
sobreLosDatos: "Synthetic data. TiendaLab is a fictional online store, and its 20,000 customers were generated with code published in the repository. No row belongs to a real person or company, and there is no payment data or data from the author's employer. Money figures depend on fictional assumptions: they are analytical findings, not real-world impact."
licencia: "Data, tables and charts under CC BY 4.0. Code: all rights reserved."
es: "abandono-de-clientes"
---

## The question

> Which customers will stop buying in the next 90 days, which ones are worth contacting, and with what action?

Retention costs money: coupons, free shipping, staff time. Contacting everyone wastes budget on people who would have stayed anyway, and contacting no one lets valuable customers walk away.

## The data

I generated 20,000 customers as of June 30, 2026; 16.8% churn between July and September.

```cifras
20,000 | customers
14 | features
16.8% | churn within 90 days
```

- **14 features:** city, tenure, channel (app or web), loyalty program, orders in the last 12 months, days since last purchase, average order value, categories, % of orders with a discount, % of late deliveries, returns, support tickets, last purchase rating and email open rate.
- **Label:** churn = no purchase in the following 90 days.
- **Hidden rules:** churn was generated from recency, frequency, late deliveries, support tickets, poor ratings, loyalty, channel, discount hunting, new customers and email engagement, plus noise. The model never sees these rules. If it recovers them in its importance ranking, the method works.

## The approach

Three algorithms tied, and I chose the simplest one: logistic regression.

| Model | CV AUC | CV PR-AUC | Training AUC |
| --- | --- | --- | --- |
| Random Forest | 0.819 | 0.565 | 0.903 |
| **Logistic regression** | **0.819** | **0.563** | **0.821** |
| HistGradientBoosting | 0.818 | 0.561 | 0.867 |
| Baseline (average rate) | 0.500 | 0.168 | 0.500 |

1. **Split:** 75% training, 25% test (5,000 customers), stratified; 5-fold cross-validation.
2. **Pre-declared selection rule:** best PR-AUC wins, unless a simpler model is within one standard deviation.
3. **Why logistic regression:** just as accurate, no overfitting (Random Forest drops from 0.90 to 0.82), easy to explain and the best calibrated (Brier score 0.104). Calibration matters because the probability turns into money.
4. **Economic decision:** expected value of contacting = probability × effectiveness × value at risk − cost. Fictional assumptions: 25% margin, COP 5,000 per contact and 25% effectiveness.

## The findings

> The model finds the customers who leave, but profit depends on which ones you contact.

**What predicts churn.** Days since last purchase is the strongest signal; late deliveries, the most actionable. Purchase frequency and support tickets come next.

![Permutation importance bars: days since last purchase (0.297) far ahead of late deliveries (0.044), orders in 12 months and support tickets.](/img/casos/abandono/01_que_pesa_mas.webp "Permutation importance of the features (chart labels in Spanish)")

**Who it reaches.** In the top 10% risk group, 2 out of 3 customers do churn: 3.9 times the average.

![Capture curve: contacting the riskiest 20% reaches 58% of the customers who churn.](/img/casos/abandono/02_curva_captura.webp "Churn capture curve (chart labels in Spanish)")

**How much it earns.** On the 5,000 test customers, contacting everyone loses COP 10.2 million. The rule "contact if expected value is above zero" selects 15.5% and earns COP 2.8 million, close to the best possible result in hindsight (COP 2.9 million).

![Profit curve: ranking by expected value peaks at COP 2.8 million contacting 16%; contacting everyone ends at minus COP 10.2 million.](/img/casos/abandono/03_curva_ganancia.webp "Net campaign profit by share of customers contacted (chart labels in Spanish)")

```simulador
```

**Value matters as much as risk.** With the same number of contacts, ranking by expected value earns 2.5 times more than ranking by probability alone (COP 2.8 million vs. 1.1 million).

**Contact cost matters more than the model.** At COP 2,000 per contact, it pays to reach half the base; at COP 15,000 with 15% effectiveness, no campaign is profitable.

## The recommended decision

> Score the full base every month, contact only customers with positive expected value, and pick the action based on why they are at risk.

| Suggested action | % of contacted customers |
| --- | --- |
| Service recovery (apology + free shipping) | 62% |
| Reactivation (reminder + new arrivals) | 29% |
| Loyalty program invitation | 5% |
| New customer onboarding (guided second purchase) | 2% |
| Targeted coupon in their category | 1% |

- **Fix the cause:** if late deliveries drive most contacts, improving logistics may be worth more than any coupon.
- **Measure for real:** keep a control group that is not contacted; the 25% effectiveness is an assumption only an experiment can confirm.

## Limitations

These results show the method, not performance in a real store.

- **Synthetic data:** the model learns rules that were also written in code; with real data, AUC will probably be lower.
- **A single snapshot:** in production, validate with later time periods.
- **Churn is not campaign response:** version 2 is an *uplift* model with a control group.
- **Importance is not causation:** permutation importance shows association.
- **Fictional money assumptions:** that is why the sensitivity table is published.
