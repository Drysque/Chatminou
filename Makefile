default: install up

build:
	docker-compose build

install:
	docker-compose run --rm --no-deps front yarn --silent

up:
	docker-compose up

upd:
	docker-compose up -d

down:
	docker-compose down
