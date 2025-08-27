### 🛡️ OralGuard – AI-Powered Oral Cancer Detection

**OralGuard** is a mobile-friendly deep learning application designed to assist in the early detection of **oral lesions (benign vs malignant)** using computer vision.  
Built on **MobileNetV3** with **PyTorch transfer learning**, the model is optimized for **real-time predictions** on mobile devices and integrates with a **Flask REST API** for deployment.

<p align="center"><img src="/screenshots/adaptive-icon.png" alt="logo" width="200"/></p>

> This repository contains two main sub directory which are:

1. `mobile` - The mobile app that does classification by sending requests to the API server using images of a oral lesions images.
2. `server` - This is an API server that serves an `MobileNetV3` model that does cancer classification based on an oral lesion.

<p align="center">
  <a href="https://github.com/crispengari/OralGuard/actions/workflows/ci.yml">
    <img src="https://github.com/crispengari/OralGuard/actions/workflows/ci.yml/badge.svg" alt="CI Status">
  </a>
   <a href="https://github.com/crispengari/OralGuard/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT">
  </a>
  <a href="https://typescriptlang.org/">
    <img src="https://img.shields.io/badge/language-typescript-blue.svg" alt="Language: TypeScript">
  </a>
  <a href="https://www.python.org/">
    <img src="https://img.shields.io/badge/language-python-blue.svg" alt="Language: Python">
  </a>
</p>

---

### 📌 Features

- Oral lesion classification (**malignant vs benign**) from mouth images
- Lightweight & efficient model powered by **MobileNetV3**
- REST API built with **Flask** for real-time predictions
- Trained on the [Oral Lesions: Malignancy Detection Dataset](https://www.kaggle.com/datasets/mohamedgobara/oral-lesions-malignancy-detection-dataset)
- Model exported as **static PyTorch file** (`.pt`) for cross-platform usage

---

### ⚙️ Tech Stack

- **PyTorch** & TorchVision – Transfer learning with MobileNetV3
- **Flask** – REST API for serving predictions
- **Python** – Data preprocessing, training, evaluation
- **NumPy / Matplotlib** – Data handling & visualization

---

### 🚀 Workflow

1. **Data Preparation**

   - Dataset split into training, validation, and testing sets
   - Augmentation applied (rotation, zoom, flip, etc.)

2. **Model Training**

   - MobileNetV3 backbone + custom classifier head
   - Trained using transfer learning in PyTorch
   - Best weights saved as `.pt` file

3. **Deployment**
   - Flask REST API wraps the trained model
   - Mobile app sends an image → API preprocesses → model predicts → returns JSON (`benign` / `malignant`)

---

### Usage

1. Capture or upload an image of oral lesions.
2. The app sends the image to the AI server for analysis.
3. Receive instant prediction results.

### Future Enhancements:

- Support multiple cancer types.
- Offline predictions for areas with poor connectivity

### Sample ScreenShots

The following screenshots shows the basic UI of the mobile application.

<p align="center">
  <img src="/screenshots/0.jpeg" alt="UI" width="200"/>
  <img src="/screenshots/1.jpeg" alt="UI" width="200"/>
  <img src="/screenshots/2.jpeg" alt="UI" width="200"/>
  <img src="/screenshots/3.jpeg" alt="UI" width="200"/>
  <img src="/screenshots/4.jpeg" alt="UI" width="200"/>
  <img src="/screenshots/5.jpeg" alt="UI" width="200"/>
  <img src="/screenshots/6.jpeg" alt="UI" width="200"/>
  <img src="/screenshots/7.jpeg" alt="UI" width="200"/>
  <img src="/screenshots/8.jpeg" alt="UI" width="200"/>
  <img src="/screenshots/9.jpeg" alt="UI" width="200"/>
</p>

### 🖥️ Installation & Setup

Clone Repository

```bash
git clone https://github.com/crispengari/OralGuard.git
cd OralGuard
```

Then navigate to the server and activate the virtual environment.

```shell
#
cd server

python -m venv venv
source venv/bin/activate   # On Linux/Mac
venv\Scripts\activate      # On Windows
```

Then install packages

```shell
pip install -r requirements.txt
```

You can then run the server as follows:

```shell
python app.py
```

### Starting the client server

First navigate to the `mobile` folder:

```shell
cd mobile
```

Install the packages

```shell
yarn
```

Then you can start the expo go dev server

```shell

yarn start
```

### 📸 Example Prediction

The following commands can be used to test the API using `cURL`.

```shell
# benign
cURL -X POST -F image=@benign.jpg http://127.0.0.1:8000/api/v1/oral-cancer/predict

# malignant
cURL -X POST -F image=@malignant.jpg http://127.0.0.1:8000/api/v1/oral-cancer/predict

```

### Expected Response

The following is the API expected response.

```json
{
  "time": 0.09074282646179199,
  "ok": true,
  "status": "ok",
  "prediction": { "label": 1, "class_label": "malignant", "probability": 1.0 }
}
```

### Notebooks

The notebooks that were used to train the model can be found in this folder [`13_ORAL_CANCER_LESIONS`](https://github.com/CrispenGari/cv-torch/blob/main/13_ORAL_CANCER_LESIONS/00_mobilenetv3.ipynb).

### LICENSE

This project is using the [`MIT`](/LICENSE) LICENSE.
