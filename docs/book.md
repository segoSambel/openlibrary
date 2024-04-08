# Book API Spec

## Add Book API

Endpoint :  POST /api/books

Request Header :

- Authorization : `Bearer <token>`

Request Body :

```json
{
  "title": "Laskar Pelangi",
  "category": "Novel",
  "cover": "https://example.com/cover.jpg",
  "overview": "Lorem ipsum dolor sit amet",
  "isbn": "9786020321293",
  "publication_year": "2005",
  "publisher_id": "char(36)",
  "author_id": "char(36)"
}
```

Response Body Success :

```json
{
  "message": "Book added successfully"
}
```

Response Body Error :

```json
{
  "errors": "Failed to add book"
}
```

## Get Book API

Endpoint :  GET /api/books/:id

Request Header :

- Authorization : `Bearer <token>`

Response Body Success :

```json
{
  "data": {
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
}
```

Response Body Error :

```json
{
  "errors": "Book not found"
}
```

## Update Book API

Endpoint : PATCH /api/books/:id

Request Header :

- Authorization : `Bearer <token>`

Request Body :

```json
{
  "title": "Laskar Pelangi",
  "category": "Novel",
  "cover": "https://example.com/cover.jpg",
  "overview": "Lorem ipsum dolor sit amet",
  "isbn": "9786020321293",
  "publication_year": "2005",
  "publisher_id": "char(36)",
  "author_id": "char(36)"
}
```

Response Body Success :

```json
{
  "message": "Book updated successfully"
}
```

Response Body Error :

```json
{
  "errors": "Failed to update book"
}
```

## Delete Book API

Endpoint : DELETE /api/books/:id

Request Header :

- Authorization : `Bearer <token>`

Response Body Success :

```json
{
  "message": "Book deleted successfully"
}
```

Response Body Error :

```json
{
  "errors": "Failed to delete book"
}
```

## List Book API

Endpoint : GET /api/books

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
