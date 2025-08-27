from fastapi import APIRouter, File
from fastapi.responses import JSONResponse
from typing import Annotated
from models import (
    mobilenetv3,
    predict_cancer,
    device,
)
import time


predictCancerRouter = APIRouter(prefix="/api/v1/oral-cancer")

@predictCancerRouter.post("/predict")
def predict_cancer_(image: Annotated[bytes, File()]):
    start = time.time()
    try:
        prediction = predict_cancer(mobilenetv3, image, device=device)
        return JSONResponse(
            {
                "time": time.time() - start,
                "ok": True,
                "status": "ok",
                "prediction": prediction,
            },
            status_code=200,
        )
    except Exception:
        JSONResponse(
            {
                "time": time.time() - start,
                "ok": False,
                "field": "server",
                "status": "error",
                "message": "Internal Server Error.",
            },
            status_code=500,
        )
