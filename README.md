# Polling Spike

This is a simple polling spike to test the feasibility of using a polling mechanism to refetch new appointments from the server.

It includes a timeout feature that dynamically sets state for disabling the cancel appointment button if the current time is within a given number of minutes before the appointment time.

## Starting the project

The client and the server can both be run with docker compose

```bash
docker-compose up -d --build
```

Access the client at [http://localhost:5173](http://localhost:5173)

## Running locally for development

The project uses pnpm for package management. To run the project locally, you need to install pnpm first. You can do this with npm:

```bash
npm install -g pnpm
```

Then, you can install the dependencies and start the project:

```bash
pnpm install
```

Then run with docker compose:

```bash
docker-compose up -d --build
```

Access the client at [http://localhost:5173](http://localhost:5173)
