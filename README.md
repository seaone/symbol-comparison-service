# Symbol Comparison Service

This service is designed to compare [Clear Script's](https://en.wikipedia.org/wiki/Clear_Script) handwritten symbols using a Siamese Neural Network. The system takes two images of symbols as input, processes them through the neural network, and returns a similarity score. The project is built using TypeScript and leverages TensorFlow.js for the machine learning model.

## Project Structure

The project is organized into several directories, each serving a specific purpose:

**`src/`**

- **`index.ts`**: The entry point of the application where the server is initialized and routes are registered.
- **`core/`**: Contains the core business logic of the application.
  - **`application/`**: Contains the use cases that define the application's business logic.
  - **`domain/`**: Contains the domain entities, services.
  - **`ports/`**: Interfaces for ports (e.g., SymbolComparatorPort).
- **`user-interface/`**: Contains the code related to the user interface, including controllers and routes.
- **`infrastructure/`**: Contains the implementation of the TensorFlow symbol comparator, which is responsible for comparing the symbols using a pre-trained Siamese Neural Network.

## Technologies Used

- **TypeScript**: The primary programming language used for the project.
- **Fastify**: A fast and low-overhead web framework for Node.js, used to handle HTTP requests.
- **TensorFlow.js**: Used for loading and running the Siamese Neural Network model.

## How to Start Developing

### Prerequisites

- Node.js
- npm
- Docker (optional, for running the service in a container)

### Installation

Install dependencies:

```bash
npm install
```

### Running the Server

To start the development server, run:

```bash
npm run dev
```

The server will start on port `3001`. You can send POST requests to `http://localhost:3001/compare` with two image files to compare them.

### Developing inside a Container

The project includes a [`devcontainer`](https://code.visualstudio.com/docs/devcontainers/containers) configuration, allowing you to develop and run the service in a Docker container.

## Siamese Neural Network

The project uses a Siamese Neural Network to compare handwritten symbols. This type of neural network is particularly effective for tasks that involve comparing two inputs, such as image similarity. The network is trained to output a similarity score between two input images, which is then used to determine how similar the symbols are.
