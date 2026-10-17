import pandas as pd
from pathlib import Path

print(">>> data_loader.py loaded <<<")

class DataLoader:

    @staticmethod
    def load_csv(path: Path):
        print(f"Loading {path.name}")
        return pd.read_csv(path)

    @staticmethod
    def save_csv(df, path: Path):
        df.to_csv(path, index=False)
        print(f"Saved {path.name}")