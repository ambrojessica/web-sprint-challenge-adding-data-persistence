// build your `Task` model here
const db = require('../../data/dbConfig');

async function getAll() {
  const tasks = await db('tasks as t')
    .leftJoin('projects as p', 'p.project_id', 't.project_id')
    .select('t.*', 'p.*');

  const updatedTasks = tasks.map(t => {
    const completedTasks = {
      task_id: t.task_id,
      task_description: t.task_description,
      task_notes: t.task_notes,
      task_completed: t.task_completed === 0 ? false : true,
      project_description: t.project_description,
      project_name: t.project_name,
    };
    return completedTasks;
  });
  return updatedTasks;
}

async function getById(id) {
  const tasks = await db('tasks').where('task_id', id).first();

  const completedTasks = {
    task_id: tasks.task_id,
    task_description: tasks.task_description,
    task_notes: tasks.task_notes,
    task_completed: tasks.task_completed === 0 ? false : true,
    project_description: tasks.project_description,
    project_name: tasks.project_name,
  };

  return completedTasks;
}

async function create(newT) {
  const [id] = await db('tasks').insert(newT);
  return getById(id);
}

module.exports = {
  getAll, getById, create
};