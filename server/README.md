create DB: `npx sequelize-cli db:create`

create a User model: `npx sequelize-cli model:generate --name User --attributes name:string,email:string,userName:string,password:string`

create a Movie model: `npx sequelize-cli model:generate --name Movie --attributes firstName:string,lastName:string,email:string,userName:string,password:string,jobTitle:string`

execute migration or update db: `npx sequelize-cli db:migrate` or `cd models && node index`

seed data: `npx sequelize-cli db:seed:all`
