const getUser = "select MIN(rank) from user_roles where user_id = $1;"

export default { getUser }
