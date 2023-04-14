dev:
	#deno run -A --config ./deno.dev.json --reload=http://localhost:4507 --inspect --inspect-brk server.tsx
	#deno run -A -c ./deno.dev.json server.tsx
	deno task -c deno.json dev

esm:
	ULTRA_LOG_LEVEL=DEBUG deno run -c deno.esm.json -A --no-check --watch ./server.tsx


build:
	docker build -t hdmap-ui .
run:
	docker run --name hdmap-ui -p 8000:8000 --rm  hdmap-ui
runit:
	docker run --name hdmap-ui -p 8000:8000 --rm -it --entrypoint bash hdmap-ui .
