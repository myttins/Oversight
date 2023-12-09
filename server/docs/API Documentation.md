# API Documentation

This file provides documentation on API endpoints.

### Endpoint: `/api/vehicle/:id`

#### Method: GET

**Description** : Retrieves _header_ info about the specified vehicle: `id`, `plate`, `activation_date`, `status` (active)

### Endpoint: `/api/vehicle/:id/files`

#### Method: POST

**Description** : Adds a file to specified vehicle.

### Endpoint: `/api/people`

#### Method: **GET**

**Description** : Gets all people information

### Endpoint: `/api/people/`

#### Method:_GET_

**Description** : Gets basic info about person. Query params are used to determine subset of data retrieved. `header` param is default if no params are used. Example: `/api/people?id=3&type=header`. Returns array of people found.

**Query Params** :

```
type: 'header' | 'main' | 'vehicles'
column: 'id' | 'id_no'
```

**Example Response**

```json
[
  {
    "id": 1,
    "id_no": "10",
    "name": "李",
    "phone_no": "555-876-5432",
    "photo": "/profiles/1/pp/1.png"
  }
]
```

#### Method: _POST_

**Description** : Adds new person to a vehicle as driver or owner. If the person is new, it will also add the person into the person table as a new entry.

**Example Request Body** :

```json
{
  "new": true,
  "type": "driver",
  "people": {
    "name": "kevin"
    ...
  }
}
```

#### Method: _PATCH_

**Description** : Updates existing person with new info. Cannot be used to update ID. The request can receive optional image file with FormData key `image`. The `id` of the person is taken from the request body, so make sure to include the `id` value with the body data. This endpint returns the `id` of the person updated. See returned response below.

**Example Response** :

```json
{
  "message": "Update Successful",
  "people": [{
    "id": "1",
    "id_no": "1234",
    ...
  }]
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
