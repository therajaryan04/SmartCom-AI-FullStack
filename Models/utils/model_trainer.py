import numpy as np
import joblib

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)


class ModelTrainer:

    @staticmethod
    def evaluate(model, X_test, y_test):

        predictions = model.predict(X_test)

        mae = mean_absolute_error(
            y_test,
            predictions
        )

        rmse = np.sqrt(
            mean_squared_error(
                y_test,
                predictions
            )
        )

        epsilon = 1e-10

        mape = np.mean(
        np.abs(
        (y_test - predictions) /
        np.maximum(np.abs(y_test), epsilon)
    )
) * 100

        r2 = r2_score(
            y_test,
            predictions
        )

        return {
            "MAE": round(mae, 3),
            "RMSE": round(rmse, 3),
            "MAPE": round(mape, 3),
            "R2": round(r2, 3)
        }

    @staticmethod
    def save(model, path):

        joblib.dump(model, path)

        print(f"Saved -> {path}")