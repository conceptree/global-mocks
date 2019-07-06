# GLOBAL MOCKS

If you are looking for a simple server that can provide your application requests with some mocked data without any fancy tricks, this project will help you out. 

A simple implementation based on an express application server that, thought a simple configuration file, delivers your mocks to any request that your apps perform to specific endpoints. This will keep your development workflow nice and smooth guarantying that you cover all application features running with the planned data structures until their are ready for production.

## Getting Started

1) Clone this project to a folder of your choice from where you want to serve your mocked data.
2) Run npm install
3) Create your mocked data JSON based files and save them into the project data folder.
4) Set into the config.json file all your services. 

### config.json
    {
      "services": [
          {
              "name":"global-service",
              "port":9001,
              "host":"127.0.0.1",
              "methods":[
                  {
                      "type": "get",
                      "path": "/api/users/",
                      "mocks": "users.json"
                  }
              ]
          }
      ]
    }

### Have fun! 
