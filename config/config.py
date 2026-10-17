from pathlib import Path

# ==============================
# Project Paths
# ==============================

PROJECT_ROOT = Path(__file__).resolve().parent.parent

RAW_DATA_DIR = PROJECT_ROOT / "datasets" / "raw"
PROCESSED_DATA_DIR = PROJECT_ROOT / "datasets" / "processed"
MASTER_DATA_DIR = PROJECT_ROOT / "datasets" / "master"
FEATURED_DATA_DIR = PROJECT_ROOT / "datasets" / "featured"

TRAINING_DATA_DIR = PROJECT_ROOT / "datasets" / "training"
PREDICTION_DATA_DIR = PROJECT_ROOT / "datasets" / "predictions"

REPORT_DIR = PROJECT_ROOT / "reports"
MODEL_DIR = PROJECT_ROOT / "models"

# ==============================
# Create Required Directories
# ==============================

for folder in [
    RAW_DATA_DIR,
    PROCESSED_DATA_DIR,
    MASTER_DATA_DIR,
    TRAINING_DATA_DIR,
    FEATURED_DATA_DIR,
    PREDICTION_DATA_DIR,
    REPORT_DIR,
    MODEL_DIR,
]:
    folder.mkdir(parents=True, exist_ok=True)