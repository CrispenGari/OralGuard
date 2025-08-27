### Using cURL

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

### Testing the API.

To run some unit test on the API you run the following command:

```shell
pytest
```

### Staring the server using `uvicorn`

```shell
uvicorn app:app --host 0.0.0.0 --port 8000
```

Now we can get the ipv4 ip address by running the following command:

```shell
ifconfig # mac and linux

ipconfig  # windows
```

Now the base server url will look as follows:

```shell
http://192.168.1.50:8000
```
