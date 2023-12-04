# API Documentation

This file provides documentation on API endpoints.

### Endpoint: `/api/vehicle/:id`

#### Method: GET

**Description** : Retrieves _header_ info about the specified vehicle, such as plate, activation date, status (active)

**Parameters** :

- `id (int)` : vehicle id

**Example Response** :

```javascript
{
  req: 'body';
}
```

### Endpoint: `/api/people`

#### Method: **GET**

**Description** : Gets all people information

### Endpoint: `/api/people/:id`

#### Method:_GET_

**Description** : Gets basic info about person. Query params are used to determine subset of data retrieved. `header` param is default if no params are used. 

**Query Params** :

```
type: 'header' | 'main' | 'vehicles'
```

**Example Response**

```json
{
  "person": {
    "id": 1,
    "id_no": "10",
    "name": "李",
    "phone_no": "555-876-5432",
    "photo": "/profiles/1/pp/1.png"
  }
}
```

#### Method: _POST_

**Description** : Adds new person

**Example Request Body** :

```json
{
  "new": true,
  "type": "driver",
  "person": {
    "name": "kevin"
    ...
  }
}
```

#### Method: _UPDATE_

**Description** : Updates existing person with new info. Cannot be used to update ID.

**Example Request Body** :

```json
{
  "person": {
    "name": "kevin"
  }
}
```

## TEMPLATE

### Endpoint: `/api/`

#### Method: **GET**

**Description** :

**Parameters** :

- `id (int)` :

**Example Response** :

```javascript
{
  req: 'body';
}
```
