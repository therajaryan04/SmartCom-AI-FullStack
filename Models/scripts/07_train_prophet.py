"""
07_train_prophet.py
-------------------
Train Facebook Prophet model for Sales Revenue Forecasting
"""

import os
import warnings
import joblib
import pandas as pd
import matplotlib.pyplot as plt

from prophet import Prophet
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

warnings.filterwarnings("ignore")

# =====================================================
# Paths
# =====================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATA_PATH = os.path.join(
    BASE_DIR,
    "datasets",
    "master",
    "master_dataset.csv"
)

MODEL_DIR = os.path.join(BASE_DIR, "models")
REPORT_DIR = os.path.join(BASE_DIR, "reports")

os.makedirs(MODEL_DIR, exist_ok=True)
os.makedirs(REPORT_DIR, exist_ok=True)

# =====================================================
# Load Dataset
# =====================================================

print("=" * 60)
print("Loading Dataset...")
print("=" * 60)

df = pd.read_csv(DATA_PATH)

print(f"Dataset Shape : {df.shape}")

# =====================================================
# Data Preparation
# =====================================================

print("\nPreparing Prophet Dataset...")

df["date"] = pd.to_datetime(
    df["date"],
    format="%d-%m-%Y"
)

# Aggregate daily sales revenue
prophet_df = (
    df.groupby("date", as_index=False)["total_value"]
      .sum()
)

prophet_df.rename(
    columns={
        "date": "ds",
        "total_value": "y"
    },
    inplace=True
)

prophet_df = prophet_df.sort_values("ds")

print(prophet_df.head())

# =====================================================
# Train/Test Split (80/20)
# =====================================================

split_index = int(len(prophet_df) * 0.80)

train = prophet_df.iloc[:split_index]
test = prophet_df.iloc[split_index:]

print("\nTraining Samples :", len(train))
print("Testing Samples  :", len(test))

# =====================================================
# Build Prophet Model
# =====================================================

print("\nTraining Prophet Model...")

model = Prophet(
    yearly_seasonality=True,
    weekly_seasonality=True,
    daily_seasonality=False,
    seasonality_mode="multiplicative",
    changepoint_prior_scale=0.1,
    seasonality_prior_scale=10,
    interval_width=0.95
)

# Monthly Seasonality
model.add_seasonality(
    name="monthly",
    period=30.5,
    fourier_order=5
)

model.fit(train)

print("Training Completed.")

# =====================================================
# Forecast
# =====================================================

future = model.make_future_dataframe(
    periods=len(test),
    freq="D"
)

forecast = model.predict(future)

# =====================================================
# Evaluation
# =====================================================

forecast_test = forecast.tail(len(test)).copy()

y_true = test["y"].values
y_pred = forecast_test["yhat"].values

mae = mean_absolute_error(y_true, y_pred)
rmse = mean_squared_error(y_true, y_pred) ** 0.5

epsilon = 1e-10
mape = (
    abs((y_true - y_pred) / (abs(y_true) + epsilon))
).mean() * 100

r2 = r2_score(y_true, y_pred)

print("\n================ Metrics ================")
print(f"MAE  : {mae:.4f}")
print(f"RMSE : {rmse:.4f}")
print(f"MAPE : {mape:.2f}%")
print(f"R²   : {r2:.4f}")

# =====================================================
# Save Metrics
# =====================================================

metrics = pd.DataFrame({
    "Model": ["Prophet"],
    "MAE": [mae],
    "RMSE": [rmse],
    "MAPE": [mape],
    "R2": [r2]
})

metrics.to_csv(
    os.path.join(REPORT_DIR, "prophet_metrics.csv"),
    index=False
)

# =====================================================
# Save Forecast
# =====================================================

forecast.to_csv(
    os.path.join(REPORT_DIR, "forecast.csv"),
    index=False
)

# =====================================================
# Save Model
# =====================================================

joblib.dump(
    model,
    os.path.join(MODEL_DIR, "prophet_model.pkl")
)

# =====================================================
# Forecast Plot
# =====================================================

fig1 = model.plot(forecast)

plt.title("Sales Revenue Forecast")

plt.tight_layout()

plt.savefig(
    os.path.join(REPORT_DIR, "forecast_plot.png"),
    dpi=300
)

plt.close()

# =====================================================
# Components Plot
# =====================================================

fig2 = model.plot_components(forecast)

plt.tight_layout()

plt.savefig(
    os.path.join(REPORT_DIR, "trend_components.png"),
    dpi=300
)

plt.close()

# =====================================================
# Actual vs Predicted Plot
# =====================================================

plt.figure(figsize=(12,6))

plt.plot(
    test["ds"],
    y_true,
    label="Actual Revenue"
)

plt.plot(
    test["ds"],
    y_pred,
    label="Predicted Revenue"
)

plt.legend()

plt.title("Actual vs Predicted Revenue")

plt.tight_layout()

plt.savefig(
    os.path.join(REPORT_DIR, "actual_vs_predicted_prophet.png"),
    dpi=300
)

plt.close()

print("\n========================================")
print("Prophet Training Completed Successfully")
print("========================================")