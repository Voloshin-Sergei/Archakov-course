const tasksBd = ['omae', 'wa', 'mou', 'shindeiru'];
const tasks = document.querySelector('.tasks');
const input = document.querySelector('.add_input');
const addBtn = document.querySelector('.add_btn');

const showTasks = () => {
  tasks.innerHTML = '';
  if (tasksBd.length === 0) {
    tasks.textContent = 'No tasks to day';
  }

  const tasksList = document.createElement('ul');
  tasks.append(tasksList);
  tasksList.className = 'tasks_list';

  tasksBd.forEach((elem) => {
    const tasksItem = `<li class="tasks_item">${elem}<button class="remove_btn">x</button></li>`;
    tasksList.insertAdjacentHTML('beforeend', tasksItem);
  });
};

const removeTask = (event) => {
  const { target } = event;
  const removeBtn = target.closest('.remove_btn');

  if (removeBtn) {
    let index = removeBtn.parentNode.textContent;
    tasksBd.splice(index, 1);
  }

  showTasks();
};

const addTask = () => {
  if (input.value !== '') {
    tasksBd.push(input.value);
  }

  showTasks();

  input.value = '';
};

addBtn.addEventListener('click', addTask);
tasks.addEventListener('click', removeTask);

showTasks();
