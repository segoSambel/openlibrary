# Publisher API Spec

## Add Publisher API

Endpoint :  POST /api/publishers

Request Header :

- Authorization : `Bearer <token>`

Request Body :

```json
{
  "name": "Publisher Name",
  "location": "Publisher Location"
}
```

Response Body Success :

```json
{
  "message": "Publisher added successfully"
}
```

Response Body Error :

```json
{
  "errors": "Failed to add publisher"
}
```

## Get Publisher API

Endpoint : GET /api/publishers/:id

Request Header :

- Authorization : `Bearer <token>`

Response Body Success :

```json
{
  "data": {
    "id": "char(36)",
    "name": "Publisher Name",
    "location": "Publisher Location",
    "created_at": "2020-01-01T00:00",
    "updated_at": "2020-01-01T00:00",
  }
}
```

Response Body Error :

```json
{
  "errors": "Cannot find publisher"
}
```

## Update Publisher API

Endpoint : PATCH /api/publishers/:id

Request Header :
- Authorization : `Bearer <token>`

Request Body :

```json
{
  "name": "Publisher Name",
  "location": "Publisher Location"
}
```

Response Body Success :

```json
{
  "message": "Publisher updated successfully"
}
```

Response Body Error :

```json
{
  "errors": "Failed to update publisher"
}
```

## Delete Publisher API

Endpoint : DELETE /api/publishers/:id

Request Header :
- Authorization : `Bearer <token>`

Response Body Success :

```json
{
  "message": "Publisher deleted successfully"
}
```

Response Body Error :

```json
{
  "errors": "Failed to delete publisher"
}
```

## Get Book by Publisher API

Endpoint : GET /api/publishers/:id/books

Request Header :
- Authorization : `Bearer <token>`

Response Body Success :

```json
{
  "data": [
    {
      "id": "char(36)",
      "title": "Laskar Pelangi",
      "category": "Novel",
      "cover": "https://example.com/cover.jpg",
      "overview": "Lorem ipsum dolor sit amet",
      "isbn": "9786020321293",
      "publication_year": "2005",
      "publisher_id": {
        "id": "char(36)",
        "name": "Bentang Pustaka",
        "location": "Jakarta"
      },
      "author": {
        "id": "char(36)",
        "name": "Andrea Hirata"
      },
      "created_at": "2020-01-01T00:00",
      "updated_at": "2020-01-01T00:00"
    }
  ]
}
```
