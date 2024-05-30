# firebase_api
## Previo
instalar node y npm: https://kinsta.com/es/blog/como-instalar-node-js/
Crear firebase: https://console.firebase.google.com/
y crear dentro del proyecto una base de datos
Crear cuenta en vercel para deploy: https://vercel.com/

(Opcional) descargar postman

## Instalar packetes
cd api-firebase

npm i -y

cd ./../node-firebase

npm i -y

## Ejecutar en local
cd node-firebase

npm run start

## Hacer deploy en vercel
cd api-firebase

npm run deploy

## (Opcional) usar postman
importar la coleccion de postman para la prueba de la api

## Ejemplo de api:
https://api-firebase-inky.vercel.app

# Ejemplos de scripts en c#
Siguiendo con el tutorial: https://medium.com/bina-nusantara-it-division/how-to-fetch-data-from-api-in-unity-99e58820b2d4

## PostUserCreation.cs
```cs

using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class PostUserCreation : MonoBehaviour
{
    IEnumerator Start()
    {
        // Define la URL y el cuerpo de la solicitud
        string url = "https://api-firebase-inky.vercel.app/user/create";
        WWWForm form = new WWWForm();

        // Envía la solicitud POST
        UnityWebRequest request = UnityWebRequest.Post(url, form);
        yield return request.SendWebRequest();

        // Verifica si hay errores en la respuesta
        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError("Error de conexión: " + request.error);
        }
        else
        {
            // Parsea los datos de la respuesta JSON
            string jsonResponse = request.downloadHandler.text;
            Debug.Log("Respuesta: " + jsonResponse);

            // Deserializa la respuesta JSON para obtener los datos
            var data = JsonUtility.FromJson<ResponseData>(jsonResponse);
            Debug.Log("Mensaje: " + data.message);
            Debug.Log("ID: " + data.id);
            Debug.Log("Token: " + data.token);
        }
    }

    [System.Serializable]
    public class ResponseData
    {
        public string message;
        public int id;
        public string token;
    }
}

```

## PostObjectCreation.cs

```cs
using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class PostObjectCreation : MonoBehaviour
{
    IEnumerator Start()
    {
        // Define la URL
        string url = "https://api-firebase-inky.vercel.app/object/create";

        // Define el cuerpo de la solicitud
        string requestBody = @"{
            ""token"": ""8DKwF5txFvDw2GSS"",
            ""nombre"": ""Espada"",
            ""tipo"": ""Arma"",
            ""sprite"": ""url_sprite"",
            ""descripcion"": ""Una espada que no corta mucho"",
            ""stats"": [
                {
                    ""nombre"": ""Ataque"",
                    ""valor"": 50
                },
                {
                    ""nombre"": ""Defensa"",
                    ""valor"": 10
                },
                {
                    ""nombre"": ""Velocidad"",
                    ""valor"": 20
                }
            ]
        }";

        // Crea una solicitud POST
        UnityWebRequest request = new UnityWebRequest(url, "POST");
        byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(requestBody);
        request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        // Envía la solicitud y espera la respuesta
        yield return request.SendWebRequest();

        // Verifica si hay errores en la respuesta
        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError("Error de conexión: " + request.error);
        }
        else
        {
            // Parsea los datos de la respuesta JSON
            string jsonResponse = request.downloadHandler.text;
            Debug.Log("Respuesta: " + jsonResponse);

            // Deserializa la respuesta JSON para obtener los datos
            var data = JsonUtility.FromJson<ResponseData>(jsonResponse);
            Debug.Log("Mensaje: " + data.message);
            Debug.Log("ID: " + data.id);
        }
    }

    [System.Serializable]
    public class ResponseData
    {
        public string message;
        public int id;
    }
}
```

## CreateGame.cs
```cs

using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class CreateGame : MonoBehaviour
{
    IEnumerator Start()
    {
        // Define la URL
        string url = "https://api-firebase-inky.vercel.app/game/create";

        // Define el cuerpo de la solicitud
        string requestBody = @"{
            ""token"": ""a3cb1df1e38521ae03135d1a76d81486"",
            ""segundos"": 1713114346
        }";

        // Crea una solicitud POST
        UnityWebRequest request = new UnityWebRequest(url, "POST");
        byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(requestBody);
        request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        // Envía la solicitud y espera la respuesta
        yield return request.SendWebRequest();

        // Verifica si hay errores en la respuesta
        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError("Error de conexión: " + request.error);
        }
        else
        {
            // Parsea los datos de la respuesta JSON
            string jsonResponse = request.downloadHandler.text;
            Debug.Log("Respuesta: " + jsonResponse);

            // Deserializa la respuesta JSON para obtener los datos
            var data = JsonUtility.FromJson<ResponseData>(jsonResponse);
            Debug.Log("Mensaje: " + data.message);
            Debug.Log("ID: " + data.id);
        }
    }

    [System.Serializable]
    public class ResponseData
    {
        public string message;
        public int id;
    }
}

```
