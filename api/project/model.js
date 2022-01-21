// build your `Project` model here
const db = require('../../data/dbConfig');

async function getAll() {
  const projects = await db('projects');
  const testing = projects.map(p => {
    const completedP = {
      project_completed: p.project_completed === 0 ? false : true,
      project_description: p.project_description,
      project_id: p.project_id,
      project_name: p.project_name,
    };
    return completedP;
  });
  return testing;
}

async function getById(project_id) {
  const projects = await db('projects')
    .where('project_id', project_id)
    .first();

  const completedProject = {
    project_completed: projects.project_completed === 0 ? false : true,
    project_description: projects.project_description,
    project_id: projects.project_id,
    project_name: projects.project_name,
  };

  return completedProject;
}

async function create(project) {
  const [id] = await db('projects').insert(project);
  return getById(id);
}

module.exports = { getAll, getById, create };