const tBody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
    const res = await fetch('http://localhost:3000/tasks');
    const tasks = await res.json()

    return tasks;
}

const addTask = async (e) => {
    e.preventDefault();
    
    const task = {
        titulo: inputTask.value
    }

    await fetch('http://localhost:3000/tasks', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
     });

     loadTasks();

     inputTask.value = '';
}

const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    });

    loadTasks();
}

const updateTask = async ({ id, titulo, status, data_update }) =>{

    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify ({ titulo, status, data_update})
    });

    loadTasks();
}

const formatDate = (dateUTC) => {
    const options = { 
        dateStyle: 'long',
        timeStyle: 'short'
    };

    const data = new Date(dateUTC).toLocaleString('pt-br', options);

    return data;
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);
    
    if(innerText){
        element.innerText = innerText;
    }

    if(innerHTML){
        element.innerHTML = innerHTML;
    }

    return element;
}

const createSelect = (value) =>{
    const options = `
        <option value="Pendente">Pendente</option>
        <option value="Em Andamento">Em Andamento</option>
        <option value="Concluída">Concluída</option>
        `;

    const select = createElement('select', '', options);

    select.value = value;

    return select;
}

const createRow = (task) => {

    const {id, titulo, status, data_insert, data_update} = task;

    const tr = createElement('tr');
    const tdTitulo = createElement('td', titulo);
    const tdDataCriacao = createElement('td', formatDate(data_insert));
    const tdStatus = createElement('td');
    const tdAcoes = createElement('td');

    const select = createSelect(status);

    select.addEventListener('change', ({target}) => updateTask({...task, status: target.value}));

    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = titulo;
    editForm.appendChild(editInput);

    editForm.addEventListener('submit', (e) =>{
        e.preventDefault();

        updateTask({id, titulo: editInput.value, status, data_update});
    });

    editButton.addEventListener('click', () =>{
        tdTitulo.innerText = '';
        tdTitulo.appendChild(editForm);
    });

    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    deleteButton.addEventListener('click', () => deleteTask(id));

    tdStatus.appendChild(select)
    
    tdAcoes.appendChild(editButton);
    tdAcoes.appendChild(deleteButton);

    tr.appendChild(tdTitulo);
    tr.appendChild(tdDataCriacao);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAcoes);

    return tr;
}

const loadTasks = async () => {
    const tasks = await fetchTasks();

    tBody.innerHTML = '';

    tasks.forEach((task) => {
        const tr = createRow(task);
        tBody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);

loadTasks();