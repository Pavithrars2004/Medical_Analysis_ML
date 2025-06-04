from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import BertTokenizer, BertForSequenceClassification
import torch
import pickle
import uvicorn
import json

app = FastAPI()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 👈 You can specify ["http://localhost:3000"] instead of "*" in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and tokenizer
tokenizer = BertTokenizer.from_pretrained("saved_model/bert_disease_classifier")
model = BertForSequenceClassification.from_pretrained("saved_model/bert_disease_classifier")
model.eval()

# Load label encoder
with open("saved_model/label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

with open("saved_model/dataset.json", "r") as f:
    disease_data = json.load(f)

class TextInput(BaseModel):
    symptom_text: str

@app.post("/predict")
def predict(input: TextInput):
    inputs = tokenizer(input.symptom_text, return_tensors="pt", truncation=True, padding=True)

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.nn.functional.softmax(outputs.logits, dim=1)
        pred_class = torch.argmax(probs, dim=1).item()
        confidence = probs[0][pred_class].item()

    label = label_encoder.inverse_transform([pred_class])[0]

    details = next((item for item in disease_data if item.get("Disease") == label), {
        "Medicines": [],
        "Dosages": [],
        "Prices (INR)": []
    })
    
    
    return {
        "prediction": label,
        "confidence": round(confidence, 3),
        "medicines": details["Medicines"],
        "dosages": details["Dosages"],
        "prices_inr": details["Prices (INR)"]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
