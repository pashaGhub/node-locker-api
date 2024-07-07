# User

### `POST` `api/register`

**Request body:**<br>

```json
{
    "username": String,     // required
    "password": String,     // required
}
```

**Response:**<br>

```json
{
    "message": String
}
```

<br>
<br>

### `POST` `api/login`

**Request body:**<br>

```json
{
    "username": String,     // required
    "password": String,     // required
}
```

**Response:**<br>

```json
{
    "token": String
}
```

<br>
<br>

# Locker

### `POST` `api/locker`

route creates a new item in locker <br>
token should be provided in header as `Authorization Bearer <token  string>`

**Request body:**<br>

```json
{
    "name": String,         // required
}
```

**Response:**<br>

```json
{
    "message": String,
    "stmt": Object,        // SQLite statement
    "lastID": Number,      // SQLite last inserted row id
    "changes": Number,     // SQLite number of rows affected
}
```

<br>
<br>

### `GET` `api/locker`

route return array of user items in locker <br>
token should be provided in header as `Authorization Bearer <token  string>`

**Response:**<br>

```json
[
    {
        "id": Number,
        "name": String,
        "user_id": Number
    }
]
```

<br>
<br>

### `DELETE` `api/locker/:id`

route deletes item from locker by id <br>
token should be provided in header as `Authorization Bearer <token  string>`

**Response:**<br>

```json
{
    "message": String
}
```

<br>
<br>
