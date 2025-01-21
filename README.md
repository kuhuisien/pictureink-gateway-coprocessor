# Gateway Co-Processor

The Gateway Co-Processor is a Node.js-based microservice designed to authenticate incoming requests by validating JWT tokens in the `Authorization` header. This ensures secure communication and proper authorization in distributed systems.

## Features

- **JWT Authentication**: Validates JWT tokens provided in the `Authorization` header.
- **Seamless Integration**: Acts as a coprocessor for the Apollo Router to handle authentication requests.
- **Configurable Behavior**: Can be extended to include additional custom authentication logic.

## How It Works

1. Apollo Router forwards incoming requests to the Gateway Co-Processor for authentication.
2. The Co-Processor validates the JWT token.
3. Upon successful validation, it enriches the request with additional metadata (if necessary) and responds to the Apollo Router.
4. If the token is invalid, it returns 401 error response.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed.
- An Apollo Router configured to use a coprocessor for authentication.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kuhuisien/pictureink-gateway-coprocessor.git
   cd pictureink-gateway-coprocessor
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variable:
   Create a `.env` file with the following variable:
   ```env
   JWT_SECRET=<jwt secret>
   ```

### Running the Service

Start the Gateway Co-Processor:

```bash
node app.js
```

The service will be available on the port 3000.

### Integration with Apollo Router

To use the Gateway Co-Processor with Apollo Router, update the `router.yaml` configuration file as follows:

```yaml
plugins:
  auth:
    processors:
      request:
        url: http://localhost:3000/process
```

Replace `http://localhost:3000/process` with the actual endpoint of the Gateway Co-Processor.

## Reference

For more details on Apollo Router coprocessors, refer to the official documentation:
[Apollo Router Authentication Coprocessor](https://www.apollographql.com/docs/graphos/routing/security/router-authentication#use-a-coprocessor)
