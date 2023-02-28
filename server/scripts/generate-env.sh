#!/bin/zsh

echo "Creating .env file..."

touch .env

echo "DATABASE_URL=mysql://root:@localhost:3306/express_db" > .env
echo "JWT_SECRET=secret" >> .env
echo "SALT_ROUNDS=10" >> .env

echo "Done."
