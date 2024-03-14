# Development

```bash
# watch mode
$ docker compose -f compose.dev.yml up
```

# Test

```bash
# start the test container
$ docker compose -f compose.test.yml up

# when the test container is up
## unit tests
$ docker exec -t nest_test npm run test

## e2e tests
$ docker exec -t nest_test npm run test:e2e
```
