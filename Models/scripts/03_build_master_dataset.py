from config.config import PROCESSED_DATA_DIR
from config.config import MASTER_DATA_DIR

from utils.data_loader import DataLoader

import pandas as pd

print("=" * 70)
print("SMARTCOMMERCE AI - MASTER DATASET")
print("=" * 70)

# -------------------------------------------------------
# Load cleaned datasets
# -------------------------------------------------------

sales = DataLoader.load_csv(PROCESSED_DATA_DIR / "bm_sales.csv")
customers = DataLoader.load_csv(PROCESSED_DATA_DIR / "bm_customers.csv")
inventory = DataLoader.load_csv(PROCESSED_DATA_DIR / "bm_inventory.csv")
promotions = DataLoader.load_csv(PROCESSED_DATA_DIR / "bm_promotions.csv")
skus = DataLoader.load_csv(PROCESSED_DATA_DIR / "bm_skus.csv")
stores = DataLoader.load_csv(PROCESSED_DATA_DIR / "bm_stores.csv")

print("\nDatasets Loaded Successfully")

# -------------------------------------------------------
# Merge SKU Information
# -------------------------------------------------------

master = sales.merge(
    skus,
    on="sku_id",
    how="left"
)

print("✓ SKU merged")

# -------------------------------------------------------
# Merge Store Information
# -------------------------------------------------------

master = master.merge(
    stores,
    on="store_id",
    how="left"
)

print("✓ Store merged")

# -------------------------------------------------------
# Merge Customer Information
# sales.customer_id  -> customers.cust_id
# -------------------------------------------------------

master = master.merge(
    customers,
    left_on="customer_id",
    right_on="cust_id",
    how="left"
)

# Remove duplicate key column
master.drop(columns=["cust_id"], inplace=True)

print("✓ Customer merged")

# -------------------------------------------------------
# Inventory & Promotions
# (Will be merged in Feature Engineering)
# -------------------------------------------------------

print("✓ Inventory merge skipped (requires date-based join)")
print("✓ Promotions merge skipped (requires date-range logic)")

# -------------------------------------------------------
# Dataset Summary
# -------------------------------------------------------

print("\n" + "=" * 70)
print("MASTER DATASET SUMMARY")
print("=" * 70)

print(f"Rows    : {master.shape[0]}")
print(f"Columns : {master.shape[1]}")

print("\nColumns:")
print(master.columns.tolist())

print("\nMissing Values:")
print(master.isnull().sum())

print("\nFirst 5 Rows:")
print(master.head())

# -------------------------------------------------------
# Save Master Dataset
# -------------------------------------------------------

output = MASTER_DATA_DIR / "master_dataset.csv"

DataLoader.save_csv(master, output)

print("\n" + "=" * 70)
print("MASTER DATASET CREATED SUCCESSFULLY")
print("=" * 70)
print(f"Saved to : {output}")