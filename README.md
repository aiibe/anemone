# Development

#### Pre-requisites

1. Clone the repository

2. Install Docker Desktop or alternatives

3. Install Visual Studio Code and Dev Container extension

Open the repository in Visual Studio Code

### Running the Dev Container

Open vscode's command palette :

`Cmd + Shift + p`

Then find and select :

`Dev Containers: Rebuild Container`

Wait for docker to build and run the container...

## Backend

Launch our backend

```bash
cd back
go run main.go
```

## Frontend

In another terminal session, let's run our front app

```bash
cd front
yarn run dev
```
