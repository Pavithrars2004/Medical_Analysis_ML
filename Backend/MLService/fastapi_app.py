from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Load the trained model
model = joblib.load("medicine_model.pkl")  # This is a Pipeline: TF-IDF + Classifier

app = FastAPI()

# Request schema expects text
class PredictionRequest(BaseModel):
    symptoms: str  # The user types symptoms as text

# Response schema
class PredictionResponse(BaseModel):
    prediction: str

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    # Pass the symptom text directly to the pipeline
    prediction = model.predict([request.symptoms])
    return {"prediction": str(prediction[0])}
