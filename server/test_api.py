from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


class TestApI:
    def test_root(self):
        res = client.get("/")
        assert res.status_code == 200
        assert res.json() == {
              "title": "Oral Guard API",
            "description": "API for cancer classification (benign and malignant) from oral lesions.",
            "version": "0.0.1",
        }

    def test_prediction_with_error_1(self):
        res = client.post("/api/v1/oral-cancer/predict/unknown")
        assert res.status_code == 404

    def test_benign_prediction(self):
        files = {"image": ("images/benign.jpg", open("images/benign.jpg", "rb"))}
        res = client.post("/api/v1/oral-cancer/predict", files=files)
        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["prediction"]["label"] == 0
        assert data["prediction"]["class_label"] == "benign"

    def test_malignant_prediction(self):
        files = {"image": ("images/malignant.jpg", open("images/malignant.jpg", "rb"))}
        res = client.post("/api/v1/oral-cancer/predict", files=files)
        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["prediction"]["label"] == 1
        assert data["prediction"]["class_label"] == "malignant"

   