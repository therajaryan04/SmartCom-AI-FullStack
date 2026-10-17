import pandas as pd

print(">>> data_cleaner.py loaded <<<")

class DataCleaner:

    @staticmethod
    def clean_column_names(df):

        df.columns = (
            df.columns
            .str.strip()
            .str.lower()
            .str.replace(" ", "_")
        )

        return df

    @staticmethod
    def remove_duplicates(df):

        before = len(df)

        df = df.drop_duplicates()

        removed = before - len(df)

        print(f"Duplicates Removed : {removed}")

        return df

    @staticmethod
    def convert_dates(df):

        for col in df.columns:

            if "date" in col:

                try:
                    df[col] = pd.to_datetime(df[col])
                    print(f"Converted : {col}")
                except:
                    pass

        return df

    @staticmethod
    def fill_missing_values(df):

        numeric = df.select_dtypes(include="number").columns

        categorical = df.select_dtypes(include="object").columns

        for col in numeric:

            df[col] = df[col].fillna(df[col].median())

        for col in categorical:

            df[col] = df[col].fillna("Unknown")

        return df