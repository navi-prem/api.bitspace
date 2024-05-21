const getUsers = "SELECT u.*, json_agg(r.*) AS roles FROM users u LEFT JOIN user_roles ur ON u.github_id = ur.user_id LEFT JOIN roles r ON ur.rank = r.rank GROUP BY u.github_id;"
const getUser = "SELECT u.*, json_agg(r.*) AS roles FROM users u LEFT JOIN user_roles ur ON u.github_id = ur.user_id LEFT JOIN roles r ON ur.rank = r.rank WHERE u.github_id = $1 GROUP BY u.github_id;"

export default { getUsers, getUser }
