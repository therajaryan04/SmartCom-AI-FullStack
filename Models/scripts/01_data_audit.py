from pathlib import Path
import pandas as pd

# Project root
PROJECT_ROOT = Path(__file__).resolve().parent.parent

RAW_DATA = PROJECT_ROOT / "datasets" / "raw"

# Find every csv file
csv_files = list(RAW_DATA.glob("*.csv"))

print("=" * 70)
print("SMARTCOMMERCE AI - DATA AUDIT")
print("=" * 70)

for file in csv_files:

    print(f"\nDataset : {file.name}")

    df = pd.read_csv(file)

    print("-" * 70)
    print(f"Rows           : {df.shape[0]}")
    print(f"Columns        : {df.shape[1]}")
    print(f"Memory         : {round(df.memory_usage(deep=True).sum()/1024**2,2)} MB")
    print(f"Duplicate Rows : {df.duplicated().sum()}")

    print("\nMissing Values")

    print(df.isnull().sum())

    print("\nData Types")

    print(df.dtypes)

    print("\nFirst Five Rows")

    print(df.head())

print("\nAudit Completed Successfully")