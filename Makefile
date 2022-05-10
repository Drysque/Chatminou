default: install up

build:
	docker-compose build

install: front_install back_install

up:
	docker-compose up

upd:
	docker-compose up -d

down:
	docker-compose down

lint: front_lint back_lint

format: front_format back_format


# Frontend

front_install:
	docker-compose run --rm --no-deps front yarn --silent

front_lint:
	docker-compose run --rm --no-deps front yarn lint

front_format:
	docker-compose run --rm --no-deps front yarn format


# Backend

back_install:
	docker-compose run --rm --no-deps back yarn --silent

back lint:
	docker-compose run --rm --no-deps back yarn lint

back_format:
	docker-compose run --rm --no-deps back yarn format
