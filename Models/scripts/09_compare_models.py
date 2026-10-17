"""
09_compare_models.py
"""

import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPORT_DIR = os.path.join(BASE_DIR, "reports")

os.makedirs(REPORT_DIR, exist_ok=True)

# -------------------------------
# Machine Learning Comparison
# -------------------------------

ml_results = pd.DataFrame({
    "Model": [
        "Random Forest",
        "XGBoost",
        "LightGBM"
    ],
    "Target": [
        "Quantity",
        "Quantity",
        "Quantity"
    ],
    "MAE": [
        1.423,
        1.278,
        1.262
    ],
    "RMSE": [
        1.686,
        1.549,
        1.535
    ],
    "MAPE": [
        89.07,
        71.59,
        69.23
    ],
    "R2": [
        -0.179,
        0.004,
        0.021
    ]
})

ml_results.to_csv(
    os.path.join(REPORT_DIR, "ml_model_comparison.csv"),
    index=False
)

# -------------------------------
# Prophet Comparison
# -------------------------------

prophet = pd.DataFrame({
    "Model": ["Prophet"],
    "Target": ["Revenue"],
    "MAE": [10609.33],
    "RMSE": [13947.94],
    "MAPE": [32.71],
    "R2": [0.4153]
})

prophet.to_csv(
    os.path.join(REPORT_DIR, "prophet_results.csv"),
    index=False
)

# -------------------------------
# Qualitative Comparison
# -------------------------------

comparison = pd.DataFrame({
    "Feature": [
        "Prediction Target",
        "Forecast Type",
        "Feature Engineering",
        "Trend Modelling",
        "Seasonality",
        "Holiday Effects",
        "Interpretability",
        "Business Use"
    ],
    "LightGBM": [
        "Demand Quantity",
        "Machine Learning",
        "Yes",
        "Limited",
        "Manual",
        "Manual",
        "Medium",
        "Inventory Planning"
    ],
    "Prophet": [
        "Sales Revenue",
        "Time Series",
        "No",
        "Automatic",
        "Automatic",
        "Automatic",
        "High",
        "Revenue Planning"
    ]
})

comparison.to_csv(
    os.path.join(REPORT_DIR, "model_capability_comparison.csv"),
    index=False
)

print("=" * 60)
print("Comparison Reports Generated Successfully")
print("=" * 60)