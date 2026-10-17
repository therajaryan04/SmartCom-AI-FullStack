from config.config import TRAINING_DATA_DIR
from config.config import FEATURED_DATA_DIR

from utils.data_loader import DataLoader
from utils.feature_engineer import FeatureEngineer

print("=" * 70)
print("SMARTCOMMERCE AI - FEATURE ENGINEERING")
print("=" * 70)

training = DataLoader.load_csv(
    TRAINING_DATA_DIR / "training_dataset.csv"
)

print(f"\nRows : {training.shape[0]}")
print(f"Columns : {training.shape[1]}")

training = training.sort_values(
    ["store_id", "sku_id", "date"]
)

training = FeatureEngineer.calendar_features(training)
training = FeatureEngineer.price_features(training)
training = FeatureEngineer.profit_features(training)
training = FeatureEngineer.lag_features(training)
training = FeatureEngineer.rolling_features(training)
training = FeatureEngineer.expanding_features(training)
training = FeatureEngineer.statistical_features(training)
training = FeatureEngineer.sku_features(training)
training = FeatureEngineer.store_features(training)
training = FeatureEngineer.category_features(training)
training = FeatureEngineer.brand_features(training)
training = FeatureEngineer.store_sku_features(training)
training = FeatureEngineer.trend_features(training)
training = FeatureEngineer.interaction_features(training)
training = FeatureEngineer.target(training)
training = FeatureEngineer.validate(training)

print("\nFinal Shape")
print(training.shape)

DataLoader.save_csv(
    training,
    FEATURED_DATA_DIR / "featured_dataset.csv"
)

print("\nFeature Engineering Completed Successfully.")