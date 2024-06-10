const getUser = "select * from users where github_id = $1;"
const createUser = "insert into users (github_id, username, title, discord_id) values ($1, $2, '', '');"
const updateUser = "update users set username = $2, title = $3, discord_id = $4 where github_id = $1;"

export default { getUser, createUser, updateUser }
