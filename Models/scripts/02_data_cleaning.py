from pathlib import Path

from config.config import RAW_DATA_DIR
from config.config import PROCESSED_DATA_DIR

from utils.data_loader import DataLoader
from utils.data_cleaner import DataCleaner

print("=" * 70)
print("SMARTCOMMERCE AI - DATA CLEANING")
print("=" * 70)

csv_files = list(RAW_DATA_DIR.glob("*.csv"))

for file in csv_files:

    print(f"\nProcessing : {file.name}")

    df = DataLoader.load_csv(file)

    df = DataCleaner.clean_column_names(df)

    df = DataCleaner.remove_duplicates(df)

    df = DataCleaner.convert_dates(df)

    df = DataCleaner.fill_missing_values(df)

    output = PROCESSED_DATA_DIR / file.name

    DataLoader.save_csv(df, output)

print("\nCleaning Completed Successfully")