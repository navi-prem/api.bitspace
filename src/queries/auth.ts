const getUserRank = "select COALESCE(MIN(rank), 69) as min from user_roles where user_id = $1;"

export default { getUserRank };
