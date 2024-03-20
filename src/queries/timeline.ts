const getTimeline = "select * from timelines;"
const addTimeline = "insert into timelines (title, content, date) values ($1, $2, $3) returning timeline_id;"
const updateTimeline = "update timelines set title = $1, content = $2, date = $3 where timeline_id = $4;"
const deleteTimeline = "delete from timelines where timeline_id = $1;"

export default { getTimeline, addTimeline, updateTimeline, deleteTimeline }
