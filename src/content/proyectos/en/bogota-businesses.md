---
titulo: "Where are Bogotá's new businesses born?"
pregunta: "Which districts and sectors create the most businesses, and who leads them?"
hallazgo: "Ciudad Bolívar creates businesses at more than twice the rate of Chapinero."
descripcion: "Where and in what sectors Bogotá's businesses are born, using open data from the first quarter of 2026."
pilar: "data"
herramientas:
  - "Python"
  - "pandas"
fecha: "Oct 2026"
repo: "https://github.com/Sebaspadi97/bogota-business-births"
portada: "/img/casos/emprendimiento/01_tasa_creacion_localidad.webp"
destacado: false
orden: 3
publicar: true
etiquetaDatos: "open data"
simulador: false
ficha:
  - dato: "Author"
    valor: "Sebastián Padilla (solo project)"
  - dato: "Method"
    valor: "Descriptive analysis · rate and share indicators · data quality audit"
  - dato: "Tools"
    valor: "Python · pandas · matplotlib"
  - dato: "Source"
    valor: "Bogotá Open Data · Business Dynamics (Dinámica Empresarial), March 2026 release"
  - dato: "Status"
    valor: "Version 1 complete · to be extended in version 2"
sobreLosDatos: "This analysis uses open data from the \"Dinámica Empresarial Bogotá\" dataset, published on Bogotá Open Data under a CC BY-SA 4.0 license, as of March 2026. Derived tables and charts are shared under the same license. These are aggregate business records; there is no personal data and no data from the author's employer."
licencia: "Tables and charts under CC BY-SA 4.0, like the source. Code: all rights reserved."
es: "emprendimiento-bogota"
---

## The question

> In which districts and sectors of Bogotá are the most businesses born, and who leads them?

The answer serves two audiences: people about to start a business who want to know where the activity is, and those who design entrepreneurship programs and must decide where to invest.

The original question included how many businesses survive. I adjusted it because the file has no closures (see The data).

## The data

I used 44,743 aggregate records covering 465,498 active businesses and 21,407 created between January and March 2026.

```cifras
465,498 | active businesses
21,407 | new businesses
Jan–Mar 2026 | period
```

Each record crosses district, size, sector, ISIC code, legal form and the legal representative's sex. The audit found seven issues, and reporting them is part of the case:

| Data quality issue | Treatment |
| --- | --- |
| The ".xlsx" file is actually a DBF table | Custom reader in Python |
| Closed businesses are zero across the whole file | Survival excluded; left for version 2 |
| A single snapshot (March 2026) | Cross-sectional analysis, no trends |
| District codes differ from the official ones (Chapinero appears as 19) | District names used instead, consistent with each district's profile |
| Sumapaz missing and 4.9% of businesses with no district | Reported; "No district" excluded from rankings |
| ISIC codes missing leading zeros (0010 appears as 10) | Padded to four digits |
| 6,878 records with the representative's sex "Undetermined" | Women's shares calculated on known sex only |

## The approach

Three simple indicators, calculated by district, sector, activity and size:

1. **Creation rate:** businesses created in January–March ÷ active businesses in March × 100. It is quarterly, not annual.
2. **Share:** what part of new businesses each group contributes.
3. **% led by women:** female legal representatives ÷ (women + men), for active and new businesses.

Activity descriptions come from DIAN Resolution 0139 of 2012 (ISIC Rev. 4 adapted for Colombia). The whole process is reproducible with two Python scripts.

## The findings

> Between January and March 2026, 21,407 businesses were born in Bogotá, about 238 a day: 4.6 for every 100 active ones.

**The south renews faster.** Ciudad Bolívar, Bosa and Usme create the most businesses per 100 existing ones. Chapinero, where large companies concentrate, has the lowest rate. In absolute volume, Suba (2,604) and Kennedy (2,421) lead.

![Business creation rate by district, first quarter of 2026: Ciudad Bolívar 6.7, Bosa 6.5 and Usme 6.3 per 100 active businesses; Chapinero lowest at 3.0.](/img/casos/emprendimiento/01_tasa_creacion_localidad.webp "New businesses per 100 active ones, by district (chart labels in Spanish)")

**More women at the helm of what's new.** 45.1% of new businesses have a woman as legal representative, versus 41.1% of active ones. This happens in 17 of the 19 districts; the exceptions are Antonio Nariño and La Candelaria.

![Share of businesses with a female legal representative, active vs. new, by district: higher among new businesses in 17 of 19 districts.](/img/casos/emprendimiento/02_mujeres_localidad.webp "Female legal representatives: active vs. new businesses (chart labels in Spanish)")

**Bars, beauty and food lead.** Bars are the activity with the most new businesses, 1.7 times more than the second.

![Economic activities with the most new businesses in the first quarter of 2026, led by bars with 1,503.](/img/casos/emprendimiento/03_top_actividades.webp "Activities with the most new businesses (chart labels in Spanish)")

**Almost everything new is micro and sole-proprietor.** 99.9% of new businesses are microenterprises and 63.6% are registered as individuals.

## The recommended decision

> Focus entrepreneurship support on the south, where more businesses are born per hundred existing ones and where more women lead them.

- **Entrepreneurship programs:** prioritize formalization and mentoring in Ciudad Bolívar, Bosa, Usme and Tunjuelito, where both the creation rate and women's share are highest.
- **Would-be founders:** food and drink is the sector with the most new competitors. Before opening a bar or restaurant, measure how saturated the area is (the coffee shop case covers this).
- **Next analysis:** measure how many of these businesses survive their first year before investing at scale.

## Limitations

This version shows where businesses are born, not which ones survive.

- **No closures:** survival and net creation can't be measured. For version 2: look for other releases on the portal or reports from the Bogotá Chamber of Commerce and Confecámaras.
- **A single snapshot:** no trend or seasonality; the first quarter may not represent the year.
- **The rate favors small districts:** few active businesses inflate the ratio. Version 2 adds businesses per 1,000 residents.
- **Registration isn't real activity:** a registered business isn't necessarily operating, and informal businesses are left out.
- **Legal representative's sex:** it describes who appears in the registry, not ownership or who actually runs the business.
