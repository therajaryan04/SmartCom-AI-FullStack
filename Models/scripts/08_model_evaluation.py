import joblib
import pandas as pd

from config.config import (
    FEATURED_DATA_DIR,
    MODEL_DIR,
    REPORT_DIR
)

from utils.data_loader import DataLoader
from utils.encoder import Encoder
from utils.evaluation import Evaluation


print("=" * 70)
print("SMARTCOMMERCE AI - MODEL EVALUATION")
print("=" * 70)

# ----------------------------------------------------
# Load Dataset
# ----------------------------------------------------

dataset = DataLoader.load_csv(
    FEATURED_DATA_DIR / "featured_dataset.csv"
)

print("\nDataset Loaded")

# ----------------------------------------------------
# Encode Dataset
# ----------------------------------------------------

dataset, _ = Encoder.fit_transform(dataset)

# ----------------------------------------------------
# Feature Selection
# ----------------------------------------------------

TARGET = "target_quantity"

X = dataset.drop(
    columns=[
        TARGET,
        "date"
    ]
)

y = dataset[TARGET]

# ----------------------------------------------------
# Time Split
# ----------------------------------------------------

split = int(len(dataset) * 0.80)

X_test = X.iloc[split:]

y_test = y.iloc[split:]

# ----------------------------------------------------
# Load Best Model
# ----------------------------------------------------

model = joblib.load(
    MODEL_DIR / "best_model.pkl"
)

print("\nBest Model Loaded")

# ----------------------------------------------------
# Prediction
# ----------------------------------------------------

predictions = model.predict(X_test)

# ----------------------------------------------------
# Save Prediction Results
# ----------------------------------------------------

prediction_df = pd.DataFrame({

    "Actual": y_test.values,

    "Predicted": predictions

})

prediction_df.to_csv(

    REPORT_DIR / "prediction_results.csv",

    index=False

)

print("Prediction Results Saved")

# ----------------------------------------------------
# Feature Importance
# ----------------------------------------------------

importance = Evaluation.feature_importance(

    model,

    X.columns

)

importance.to_csv(

    REPORT_DIR / "feature_importance.csv",

    index=False

)

Evaluation.save_feature_plot(

    importance,

    REPORT_DIR / "feature_importance.png"

)

print("Feature Importance Saved")

# ----------------------------------------------------
# Prediction Plot
# ----------------------------------------------------

Evaluation.prediction_plot(

    y_test,

    predictions,

    REPORT_DIR / "actual_vs_predicted.png"

)

print("Prediction Plot Saved")

# ----------------------------------------------------
# Residual Plot
# ----------------------------------------------------

Evaluation.residual_plot(

    y_test,

    predictions,

    REPORT_DIR / "residual_plot.png"

)

print("Residual Plot Saved")

print("\nEvaluation Completed Successfully.")