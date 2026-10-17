from fastapi import FastAPI

app = FastAPI(title="SmartCommerce AI")

@app.get("/")
def home():
    return {
        "message": "SmartCommerce AI Running"
    }

@app.get("/health")
def health():
    return {
        "status": "UP"
    }