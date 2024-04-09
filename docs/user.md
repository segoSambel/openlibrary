# User API Spec

## Register User API

Endpoint :  POST /api/users

Request Body :

```json
{
  "email": "user@example.com",
  "password": "password",
  "name": "John Doe",
  "address": "Jl. Jend. Sudirman No. 1",
  "phone": "081234567890"
}
```

Response Body Success :

```json
{
  "message": "User created successfully"
}
```

Response Body Error :

```json
{
  "errors" : "Email already registered"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization : `Bearer <token>`

Request Body :

```json
{
  "name": "John Doe",
  "password": "new password",
  "address": "Jl. Jend. Sudirman No. 1",
  "phone": "081234567890"
}
```

Response Body Success :

```json
{
  "message": "User updated successfully",
  "data": {
    "id": "288bc7af-87af-4a6f-b9b2-9672d13791eb",
    "email": "user@example.com",
    "name": "John Doe",
    "address": "Jl. Jend. Sudirman No. 1",
    "phone": "081234567890",
    "created_at": "2020-01-01T00:00",
    "updated_at": "2020-01-01T00:00"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization : `Bearer <token>`

Response Body Success:

```json
{
  "data" : {
    "id": "288bc7af-87af-4a6f-b9b2-9672d13791eb",
    "email" : "user@example.com",
    "name" : "John Doe",
    "address" : "Jl. Jend. Sudirman No. 1",
    "phone" : "081234567890",
    "created_at" : "2020-01-01T00:00",
    "updated_at" : "2020-01-01T00:00"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```

## Login User API

Endpoint : POST /api/auth/login

Request Body :

```json
{
  "email" : "user@example.com",
  "password" : "password"
}
```

Response Body Success :

```json
{
  "data" : {
    "token" : "<JWT-TOKEN>"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Email or password wrong"
}
```

## Logout User API 
> THIS FEATURE IS YET TO BE IMPLEMENTED

Endpoint : DELETE /api/auth/logout

Headers :
- Authorization : `Bearer <token>`

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```
