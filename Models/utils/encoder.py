from sklearn.preprocessing import LabelEncoder
import joblib


class Encoder:

    @staticmethod
    def fit_transform(df):

        encoders = {}

        categorical_columns = (
            df.select_dtypes(
                include=["object", "category"]
            ).columns
        )

        print("\nEncoding Columns:")

        for column in categorical_columns:

            print(f"  -> {column}")

            encoder = LabelEncoder()

            df[column] = encoder.fit_transform(
                df[column].astype(str)
            )

            encoders[column] = encoder

        return df, encoders

    @staticmethod
    def save(encoders, path):

        joblib.dump(encoders, path)

        print("\nLabel Encoders Saved")