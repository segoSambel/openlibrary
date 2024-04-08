# Book API Spec

## Add Author API

Endpoint :  POST /api/authors

Request Header :

- Authorization : `Bearer <token>`

Request Body :

```json
{
  "name": "Author Name"
}
```

Response Body Success :

```json
{
  "message": "Author added successfully"
}
```

Response Body Error :

```json
{
  "errors": "Failed to add author"
}
```

## Get Author API

Endpoint : GET /api/authors/:id

Request Header :

- Authorization : `Bearer <token>`

Response Body Success :

```json
{
  "data": {
    "id": "char(36)",
    "name": "Author Name",
    "created_at": "2020-01-01T00:00",
    "updated_at": "2020-01-01T00:00",
  }
}
```

Response Body Error :

```json
{
  "errors": "Cannot find author"
}
```

## Update Author API

Endpoint : PATCH /api/authors/:id

Request Header :
- Authorization : `Bearer <token>`

Request Body :

```json
{
  "name": "New Author Name"
}
```

Response Body Success :

```json
{
  "message": "Author updated successfully"
}
```

Response Body Error :

```json
{
  "errors": "Failed to update author"
}
```

## Delete Author API

Endpoint : DELETE /api/authors/:id

Request Header :
- Authorization : `Bearer <token>`

Response Body Success :

```json
{
  "message": "Author deleted successfully"
}
```

Response Body Error :

```json
{
  "errors": "Failed to delete author"
}
```

## Get Book by Author API

Endpoint : GET /api/authors/:id/books

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
