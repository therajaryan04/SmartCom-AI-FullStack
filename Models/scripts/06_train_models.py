from pathlib import Path
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from lightgbm import LGBMRegressor

from config.config import (
    FEATURED_DATA_DIR,
    MODEL_DIR,
    REPORT_DIR
)

from utils.data_loader import DataLoader
from utils.encoder import Encoder
from utils.model_trainer import ModelTrainer


print("=" * 70)
print("SMARTCOMMERCE AI - MODEL TRAINING")
print("=" * 70)

# ---------------------------------------------------
# Load Dataset
# ---------------------------------------------------

dataset = DataLoader.load_csv(
    FEATURED_DATA_DIR / "featured_dataset.csv"
)

print("\nDataset Loaded")
print(dataset.shape)

# ---------------------------------------------------
# Encode Categorical Columns
# ---------------------------------------------------

dataset, encoders = Encoder.fit_transform(dataset)

Encoder.save(
    encoders,
    MODEL_DIR / "label_encoders.pkl"
)

dataset = dataset.sort_values(
    ["store_id", "sku_id", "date"]
).reset_index(drop=True)

# ---------------------------------------------------
# Feature Selection
# ---------------------------------------------------

TARGET = "target_quantity"

DROP_COLUMNS = [
    TARGET,
    "date"
]

X = dataset.drop(columns=DROP_COLUMNS)

y = dataset[TARGET]

print("\nFeatures :", X.shape[1])

# ---------------------------------------------------
# Time Based Split
# ---------------------------------------------------

split_index = int(len(dataset) * 0.80)

X_train = X.iloc[:split_index]
X_test = X.iloc[split_index:]

y_train = y.iloc[:split_index]
y_test = y.iloc[split_index:]

print("\nTraining Samples :", len(X_train))
print("Testing Samples  :", len(X_test))

# ---------------------------------------------------
# Models
# ---------------------------------------------------

models = {

    "Random Forest": RandomForestRegressor(
        n_estimators=200,
        random_state=42,
        n_jobs=-1
    ),

    "XGBoost": XGBRegressor(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=8,
    subsample=0.8,
    colsample_bytree=0.8,
    objective="reg:squarederror",
    random_state=42,
    n_jobs=-1
),

    "LightGBM": LGBMRegressor(
    n_estimators=500,
    learning_rate=0.05,
    num_leaves=31,
    max_depth=-1,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    n_jobs=-1
)

}

results = []

best_model = None
best_name = None
best_rmse = float("inf")

# ---------------------------------------------------
# Training Loop
# ---------------------------------------------------

for name, model in models.items():

    print("\n" + "=" * 50)
    print(f"Training : {name}")

    model.fit(
        X_train,
        y_train
    )

    metrics = ModelTrainer.evaluate(
        model,
        X_test,
        y_test
    )

    print(metrics)

    ModelTrainer.save(
        model,
        MODEL_DIR / f"{name.lower().replace(' ','_')}.pkl"
    )

    results.append({

        "Model": name,
        **metrics

    })

    if metrics["RMSE"] < best_rmse:

        best_rmse = metrics["RMSE"]
        best_model = model
        best_name = name

# ---------------------------------------------------
# Save Best Model
# ---------------------------------------------------

ModelTrainer.save(
    best_model,
    MODEL_DIR / "best_model.pkl"
)

print("\nBest Model :", best_name)

# ---------------------------------------------------
# Save Metrics
# ---------------------------------------------------

results = pd.DataFrame(results)

results.to_csv(
    REPORT_DIR / "model_comparison.csv",
    index=False
)

print("\nModel Comparison")

print(results)

print("\nTraining Completed Successfully.")