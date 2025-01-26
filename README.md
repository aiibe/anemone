# Development

## Backend

Launch our backend

```bash
cd back
go run main.go --host https://your-docker-registry.com
```

## Frontend

In another terminal session, let's run our front app

```bash
cd front
yarn dev
```

# Production

## Build front and back

```bash
cd front
yarn build
cd ../back
go build -o anemone main.go
```

## Run

```bash
./anemone --host https://your-docker-registry.com
```
