import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


class Evaluation:

    @staticmethod
    def feature_importance(model, feature_names):

        importance = model.feature_importances_

        df = pd.DataFrame({
            "Feature": feature_names,
            "Importance": importance
        })

        df = df.sort_values(
            by="Importance",
            ascending=False
        )

        return df

    @staticmethod
    def save_feature_plot(df, path):

        plt.figure(figsize=(12,8))

        top = df.head(20)

        plt.barh(
            top["Feature"],
            top["Importance"]
        )

        plt.gca().invert_yaxis()

        plt.title("Top 20 Important Features")

        plt.xlabel("Importance")

        plt.tight_layout()

        plt.savefig(path, dpi=300)

        plt.close()

    @staticmethod
    def prediction_plot(actual, predicted, path):

        plt.figure(figsize=(14,6))

        plt.plot(
            actual.values[:300],
            label="Actual"
        )

        plt.plot(
            predicted[:300],
            label="Predicted"
        )

        plt.title("Actual vs Predicted")

        plt.xlabel("Samples")

        plt.ylabel("Target Quantity")

        plt.legend()

        plt.tight_layout()

        plt.savefig(path, dpi=300)

        plt.close()

    @staticmethod
    def residual_plot(actual, predicted, path):

        sample_size = min(10000, len(actual))

        np.random.seed(42)

        indices = np.random.choice(
            len(actual),
            sample_size,
            replace=False
        )

        actual_sample = actual.iloc[indices]
        predicted_sample = predicted[indices]

        residuals = actual_sample - predicted_sample

        plt.figure(figsize=(10,6))

        plt.scatter(
            predicted_sample,
            residuals,
            s=8,
            alpha=0.5
        )

        plt.axhline(
            y=0,
            color="red",
            linestyle="--",
            linewidth=2
        )

        plt.title("Residual Plot")

        plt.xlabel("Predicted")

        plt.ylabel("Residual")

        plt.grid(alpha=0.3)

        plt.tight_layout()

        plt.savefig(path, dpi=300)

        plt.close()