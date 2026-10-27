# Reproduce el modelo ganador del caso de abandono (misma partición y modelo del repo)
# y exporta, para los 5.000 clientes de prueba: probabilidad, valor en riesgo y si abandonó.
import sys, json
import numpy as np, pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

SRC, OUT = sys.argv[1], sys.argv[2]
MARGEN, COSTO, EF = 0.25, 5000, 0.25
df = pd.read_csv(SRC, encoding="utf-8-sig")
y = df.abandono_90d; X = df.drop(columns=["id_cliente", "abandono_90d"])
CAT = ["ciudad", "canal_principal"]; NUM = [c for c in X.columns if c not in CAT]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)
pre = ColumnTransformer([("num", StandardScaler(), NUM), ("cat", OneHotEncoder(handle_unknown="ignore"), CAT)])
m = Pipeline([("pre", pre), ("m", LogisticRegression(max_iter=2000))]).fit(X_tr, y_tr)
p = m.predict_proba(X_te)[:, 1]
v = (X_te.ticket_promedio_cop * X_te.pedidos_12m * MARGEN).values
a = y_te.values

# Comprobación contra las cifras publicadas del caso
ev = p * EF * v - COSTO
sel = ev > 0
gan_regla = (a * EF * v - COSTO)[sel].sum()
gan_todos = (a * EF * v - COSTO).sum()
print("contactar %:", round(sel.mean() * 100, 1), "| regla COP:", round(gan_regla), "| todos COP:", round(gan_todos))
for c, e in [(2000, .25), (15000, .15)]:
    s = p * e * v - c > 0
    print(f"costo {c} ef {e}: contacta {s.mean()*100:.1f} %  gana {(a*e*v-c)[s].sum():,.0f}")

# Exporta compacto: probabilidad (3 decimales), valor en riesgo (miles de COP, 1 decimal), abandono 0/1
data = {
  "note": "Clientes de prueba del caso ¿Qué clientes están por irse? (datos sintéticos de TiendaLab). p = probabilidad de abandono (regresión logística), v = valor en riesgo en miles de COP, a = abandonó (1) o no (0).",
  "margin": MARGEN,
  "p": [round(float(x), 3) for x in p],
  "v": [round(float(x) / 1000, 1) for x in v],
  "a": [int(x) for x in a],
}
json.dump(data, open(OUT, "w"), separators=(",", ":"), ensure_ascii=False)
