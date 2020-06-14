import makeRequest from './makeFetchRequest';

const BASE_URL = 'http://localhost:5000/tasks';
const FetchTasksAPI = {
  async getAllTasks() {
    const response = await makeRequest(BASE_URL, 'GET');

    const tasks = await response.json();
    return tasks;
  },
  async addTask(taskToAdd) {
    const response = await makeRequest(BASE_URL, 'POST', taskToAdd);
    const addedTask = await response.json();
    return addedTask;
  },
  async replaceTask(taskToReplace) {
    if (!taskToReplace.id) {
      throw new Error('task has to have an id to be updated');
    }

    const response = await makeRequest(`${BASE_URL}/${taskToReplace.id}`, 'PUT', taskToReplace);
    const replacedTimebox = await response.json();
    return replacedTimebox;
  },
  async finishTask(id) {
    if (!id) {
      throw new Error('task has to have an id to be updated');
    }

    const response = await makeRequest(`${BASE_URL}/${id}`, 'PATCH', {
      done: true,
      finishDate: new Date().toISOString().slice(0, 10),
    });
    const replacedTimebox = await response.json();
    return replacedTimebox;
  },
  async removeTask(id) {
    if (!id) {
      throw new Error('task has to have an id to be updated');
    }
    await makeRequest(`${BASE_URL}/${id}`, 'DELETE');
  },
};

export default FetchTasksAPI;
