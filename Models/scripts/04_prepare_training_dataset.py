from config.config import MASTER_DATA_DIR
from config.config import TRAINING_DATA_DIR

from utils.data_loader import DataLoader

print("=" * 70)
print("SMARTCOMMERCE AI - PREPARE TRAINING DATASET")
print("=" * 70)

# ----------------------------------------------------
# Load Master Dataset
# ----------------------------------------------------

master = DataLoader.load_csv(
    MASTER_DATA_DIR / "master_dataset.csv"
)

print("\nMaster Dataset Loaded")
print(master.shape)

# ----------------------------------------------------
# Convert Date
# ----------------------------------------------------

master["date"] = master["date"].astype("datetime64[ns]")

# ----------------------------------------------------
# Aggregate Daily Sales
# ----------------------------------------------------

training = (

    master

    .groupby(
        [
            "date",
            "store_id",
            "sku_id"
        ],
        as_index=False
    )

    .agg(

        quantity=("quantity", "sum"),

        total_value=("total_value", "sum"),

        unit_price=("unit_price", "mean"),

        discount_pct=("discount_pct", "mean"),

        cost_price=("cost_price", "mean"),

        category=("category", "first"),

        subcategory=("subcategory", "first"),

        brand=("brand", "first"),

        store_name=("store_name", "first"),

        store_city=("store_city", "first"),

        store_type=("store_type", "first"),

        customer_city=("customer_city", "first"),

        gender=("gender", "first"),

        loyalty_segment=("loyalty_segment", "first"),

        preferred_channel=("preferred_channel", "first")

    )

)

print("\nDaily Aggregation Completed")

print(training.shape)

# ----------------------------------------------------
# Derived Features
# ----------------------------------------------------

training["average_price"] = training["unit_price"]

training["daily_revenue"] = training["total_value"]

training["daily_quantity"] = training["quantity"]

training["profit_per_unit"] = (

    training["unit_price"]

    -

    training["cost_price"]

)

training["daily_profit"] = (

    training["profit_per_unit"]

    *

    training["quantity"]

)

# ----------------------------------------------------
# Save
# ----------------------------------------------------

output = TRAINING_DATA_DIR / "training_dataset.csv"

DataLoader.save_csv(
    training,
    output
)

print("\nTraining Dataset Saved")

print(output)

print("\nFirst Five Rows")

print(training.head())

print("\nColumns")

print(training.columns.tolist())

print("\nRows :", training.shape[0])

print("Columns :", training.shape[1])

print("=" * 70)
print("TRAINING DATASET READY")
print("=" * 70)