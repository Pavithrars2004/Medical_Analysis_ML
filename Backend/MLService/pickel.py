import pandas as pd
import re
import pickle
import warnings
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

warnings.filterwarnings('ignore')

class MedicinePredictionModel:
    def __init__(self, data_path=None, model_path="medicine_model.pkl"):
        self.data_path = data_path
        self.model_path = model_path
        self.df = None
        self.model = None
        self.vectorizer = None

    def load_and_clean_data(self):
        """Load and clean the dataset"""
        if self.data_path is None:
            raise ValueError("Data path not specified")

        self.df = pd.read_csv(self.data_path)

        # Remove rows with empty values in important columns
        self.df = self.df.dropna(subset=['Disease', 'Symptoms'])
        self.df.fillna("Not specified", inplace=True)

        # Clean symptom text
        self.df['Symptoms'] = self.df['Symptoms'].apply(self._clean_text)

        print(f"Dataset loaded: {self.df.shape}")

    def _clean_text(self, text):
        """Clean and standardize text data"""
        if not isinstance(text, str):
            return ""
        text = text.lower()
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r',\s*', ', ', text)
        return text.strip()

    def train_model(self, n_estimators=100, max_features='sqrt', min_samples_split=2):
        """Train the Random Forest model and save it"""
        if self.df is None:
            raise ValueError("Data not loaded. Call load_and_clean_data() first.")

        X = self.df['Symptoms']
        y = self.df['Disease']

        # Remove classes with less than 2 samples
        class_counts = y.value_counts()
        valid_classes = class_counts[class_counts >= 2].index
        mask = y.isin(valid_classes)
        X = X[mask]
        y = y[mask]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

        # Create TF-IDF vectorizer
        self.vectorizer = TfidfVectorizer(ngram_range=(1, 2), max_features=1000, stop_words='english')

        classifier = RandomForestClassifier(
            n_estimators=n_estimators,
            max_features=max_features,
            min_samples_split=min_samples_split,
            random_state=42,
            class_weight='balanced'
        )

        self.model = Pipeline([
            ('tfidf', self.vectorizer),
            ('classifier', classifier)
        ])

        print("\nTraining the model...")
        self.model.fit(X_train, y_train)

        # Save model using pickle
        self.save_model()
        print("Model training complete and saved successfully!")

        return X_test, y_test

    def save_model(self):
        """Save trained model to disk using pickle"""
        if self.model is None:
            raise ValueError("No trained model to save. Train the model first.")
        with open(self.model_path, 'wb') as f:
            pickle.dump(self.model, f)
        print(f"Model saved at {self.model_path}")

    def load_model(self):
        """Load model from disk using pickle"""
        try:
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)
            print(f"Model loaded from {self.model_path}")
        except Exception as e:
            print(f"Error loading model: {e}")

    def test_model(self, X_test, y_test):
        """Evaluate the trained model"""
        if self.model is None:
            raise ValueError("Model not trained or loaded.")

        y_pred = self.model.predict(X_test)

        accuracy = accuracy_score(y_test, y_pred)
        print(f"\nTest Accuracy: {accuracy:.4f}")

        report = classification_report(y_test, y_pred, output_dict=True)
        report_df = pd.DataFrame(report).transpose()
        print("\nClassification Report:")
        print(report_df)

        return accuracy, report_df


# --- USAGE EXAMPLE ---
if __name__ == "__main__":
    model = MedicinePredictionModel(data_path="Final_Dataset.csv")

    # Load and clean data
    model.load_and_clean_data()

    # Train the model and save it
    X_test, y_test = model.train_model()

    # Load the saved model
    model.load_model()

    # Test the model on unseen data
    model.test_model(X_test, y_test)