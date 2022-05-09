default: install up

build:
	docker-compose build

install:
	docker-compose run --rm --no-deps front yarn --silent

lint:
	docker-compose run --rm --no-deps front yarn lint

format:
	docker-compose run --rm --no-deps front yarn format

up:
	docker-compose up

upd:
	docker-compose up -d

down:
	docker-compose down
