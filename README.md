# MY MOCK SERVER

This is based on a mock-server package abstraction that ables you to create you global mock server for your different applications.

## Getting Started

1) Clone this project to a folder of your choice from where you want to serve your mocked data.
2) Run npm install
3) Create the folders for each of your mocked data. This folder structure should respect the following hierarchy:
   * your-service-name/api-path/specific-api-paths/even-more-specific-api-paths/

    * For example, if your request is pointing to http://hostname:port/api/users you should create a folder for that particular service requests like user-data and then create a folder inside it called api and inside the api folder another one called users.
  4) Inside each folder you must create your mocks data files like:
        * your-service/api/users/GET.mock
        * GET, POST, UPDATE, DELETE whatever you need to respond to.

### GET.mock
    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8

    {
    "my-key": "my-value"
    }

