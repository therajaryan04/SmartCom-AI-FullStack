import numpy as np
import pandas as pd


class FeatureEngineer:

    # =====================================================
    # Historical Aggregate Helper
    # =====================================================

    @staticmethod
    def historical_mean(df, group_cols, value_col, feature_name):

        print(f"Creating {feature_name}")

        

        df[feature_name] = (
            df.groupby(group_cols)[value_col]
            .transform(lambda x: x.shift(1).expanding().mean())
        )

        return df

    # =====================================================
    # Calendar Features
    # =====================================================

    @staticmethod
    def calendar_features(df):

        print("Adding Calendar Features...")

        df["date"] = pd.to_datetime(df["date"])

        df["year"] = df["date"].dt.year
        df["quarter"] = df["date"].dt.quarter
        df["month"] = df["date"].dt.month
        df["week"] = df["date"].dt.isocalendar().week.astype(int)
        df["day"] = df["date"].dt.day
        df["day_of_week"] = df["date"].dt.dayofweek
        df["day_of_year"] = df["date"].dt.dayofyear

        df["is_weekend"] = (
            df["day_of_week"] >= 5
        ).astype(int)

        df["is_month_start"] = (
            df["date"].dt.is_month_start
        ).astype(int)

        df["is_month_end"] = (
            df["date"].dt.is_month_end
        ).astype(int)

        df["days_in_month"] = (
            df["date"].dt.days_in_month
        )

        df["week_of_month"] = (
            ((df["day"] - 1) // 7) + 1
        )

        return df

    # =====================================================
    # Price Features
    # =====================================================

    @staticmethod
    def price_features(df):

        print("Adding Price Features...")

        df["price_change"] = (
            df.groupby(["store_id", "sku_id"])["average_price"]
            .diff()
        )

        df["price_change_pct"] = (
            df.groupby(["store_id", "sku_id"])["average_price"]
            .pct_change()
        )

        df["discount_amount"] = (
            df["average_price"] *
            df["discount_pct"] / 100
        )

        df["net_price"] = (
            df["average_price"] -
            df["discount_amount"]
        )
        
        # Removed price_rank to avoid target leakage

        return df

    # =====================================================
    # Profit Features
    # =====================================================

    @staticmethod
    def profit_features(df):

        print("Adding Profit Features...")

        df["profit_margin_pct"] = np.where(
            df["average_price"] == 0,
            0,
            (
                (df["average_price"] - df["cost_price"])
                / df["average_price"]
            ) * 100
        )

        df["markup"] = (
            df["average_price"] -
            df["cost_price"]
        )

        return df

    # =====================================================
    # Lag Features
    # =====================================================

    @staticmethod
    def lag_features(df):

        print("Adding Lag Features...")

        group = df.groupby(
            ["store_id", "sku_id"]
        )["daily_quantity"]

        lags = [1, 2, 3, 5, 7, 10, 14, 21, 30, 60]

        for lag in lags:

            df[f"lag_{lag}"] = group.shift(lag)

        return df

    # =====================================================
    # Rolling Features
    # =====================================================

    @staticmethod
    def rolling_features(df):

        print("Adding Rolling Features...")

        group = (
            df.groupby(["store_id", "sku_id"])["daily_quantity"]
        )

        windows = [7, 14, 30]

        for window in windows:

            df[f"rolling_mean_{window}"] = (
                group.transform(
                    lambda x: x.shift(1).rolling(window).mean()
                )
            )

            df[f"rolling_std_{window}"] = (
                group.transform(
                    lambda x: x.shift(1).rolling(window).std()
                )
            )

            df[f"rolling_max_{window}"] = (
                group.transform(
                    lambda x: x.shift(1).rolling(window).max()
                )
            )

            df[f"rolling_min_{window}"] = (
                group.transform(
                    lambda x: x.shift(1).rolling(window).min()
                )
            )

            df[f"rolling_median_{window}"] = (
                group.transform(
                    lambda x: x.shift(1).rolling(window).median()
                )
            )

        return df

    # =====================================================
    # Expanding Features
    # =====================================================

    @staticmethod
    def expanding_features(df):

        print("Adding Expanding Features...")

        group = (
            df.groupby(["store_id", "sku_id"])["daily_quantity"]
        )

        df["expanding_mean"] = (
            group.transform(
                lambda x: x.shift(1).expanding().mean()
            )
        )

        df["expanding_sum"] = (
            group.transform(
                lambda x: x.shift(1).expanding().sum()
            )
        )

        df["expanding_max"] = (
            group.transform(
                lambda x: x.shift(1).expanding().max()
            )
        )

        df["expanding_min"] = (
            group.transform(
                lambda x: x.shift(1).expanding().min()
            )
        )

        return df

    # =====================================================
    # Statistical Features
    # =====================================================

    @staticmethod
    def statistical_features(df):

        print("Adding Statistical Features...")

        df["coefficient_of_variation"] = np.where(
            df["rolling_mean_30"] == 0,
            0,
            df["rolling_std_30"] /
            df["rolling_mean_30"]
        )

        df["price_to_cost_ratio"] = np.where(
            df["cost_price"] == 0,
            0,
            df["average_price"] /
            df["cost_price"]
        )

        return df

    # =====================================================
    # SKU Intelligence Features
    # =====================================================

    @staticmethod
    def sku_features(df):

        print("Adding Historical SKU Features...")

        df = FeatureEngineer.historical_mean(
            df,
            ["sku_id"],
            "daily_quantity",
            "sku_avg_sales"
        )

        df["sku_total_sales"] = (
            df.groupby("sku_id")["daily_quantity"]
            .transform(lambda x: x.shift(1).cumsum())
        )

        df["sku_days"] = (
            df.groupby("sku_id").cumcount()
        )

        df["sku_sales_velocity"] = np.where(
            df["sku_days"] == 0,
            0,
            df["sku_total_sales"] /
            df["sku_days"]
        )

        return df

    # =====================================================
    # Store Intelligence Features
    # =====================================================

    @staticmethod
    def store_features(df):

        print("Adding Historical Store Features...")

        df = FeatureEngineer.historical_mean(
            df,
            ["store_id"],
            "daily_quantity",
            "store_avg_sales"
        )

        df["store_total_sales"] = (
            df.groupby("store_id")["daily_quantity"]
            .transform(lambda x: x.shift(1).cumsum())
        )

        return df

    # =====================================================
    # Category Intelligence Features
    # =====================================================

    @staticmethod
    def category_features(df):

        print("Adding Historical Category Features...")

        df = FeatureEngineer.historical_mean(
            df,
            ["category"],
            "daily_quantity",
            "category_avg_sales"
        )

        return df

    # =====================================================
    # Brand Intelligence Features
    # =====================================================

    @staticmethod
    def brand_features(df):

        print("Adding Historical Brand Features...")

        df = FeatureEngineer.historical_mean(
            df,
            ["brand"],
            "daily_quantity",
            "brand_avg_sales"
        )

        return df

    # =====================================================
    # Store SKU Features
    # =====================================================

    @staticmethod
    def store_sku_features(df):

        print("Adding Historical Store-SKU Features...")

        df = FeatureEngineer.historical_mean(
            df,
            ["store_id", "sku_id"],
            "daily_quantity",
            "store_sku_avg_sales"
        )

        return df

    # =====================================================
    # Trend Features
    # =====================================================

    @staticmethod
    def trend_features(df):

        print("Adding Trend Features...")

        df["sales_growth"] = (
            df["lag_1"] -
            df["lag_7"]
        )

        df["sales_growth_pct"] = np.where(
            df["lag_7"] == 0,
            0,
            (
                df["lag_1"] -
                df["lag_7"]
            ) / df["lag_7"]
        )

        df["rolling_growth"] = (
            df["rolling_mean_7"] -
            df["rolling_mean_30"]
        )

        return df

    # =====================================================
    # Interaction Features
    # =====================================================

    @staticmethod
    def interaction_features(df):

        print("Adding Interaction Features...")

        df["price_discount_interaction"] = (
            df["average_price"] *
            df["discount_pct"]
        )

        df["profit_discount_interaction"] = (
            df["profit_margin_pct"] *
            df["discount_pct"]
        )

        # Removed price_quantity_interaction as requested

        return df

    # =====================================================
    # Target
    # =====================================================

    @staticmethod
    def target(df):

        print("Generating Target...")

        df["target_quantity"] = (
            df.groupby(
                ["store_id", "sku_id"]
            )["daily_quantity"]
            .shift(-1)
        )

        return df

    # =====================================================
    # Validation
    # =====================================================

    @staticmethod
    def validate(df):

        print("Validating Dataset...")

        df = df.dropna(
            subset=["target_quantity"]
        )

        df = df.sort_values(
            ["store_id", "sku_id", "date"]
        )

        numeric_columns = df.select_dtypes(
            include=[np.number]
        ).columns.tolist()

        numeric_columns.remove("target_quantity")

        df[numeric_columns] = (
            df[numeric_columns]
            .fillna(0)
        )

        df.reset_index(
            drop=True,
            inplace=True
        )

        return df