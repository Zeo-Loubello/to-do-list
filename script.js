//locking the target
const input = document.getElementById('taskInput');
const btn = document.getElementById('addBtn');
const list = document.getElementById('taskList');

function load(){
    fetch('/tasks')
    .then(res => res.json())
    .then(data => {
        list.innerHTML = ''; //clears old items
        data.forEach(item => {
        const li = document.createElement('li');
            li.textContent = item.content;
            list.appendChild(li);
    });
    });
}

btn.addEventListener('click', () => {
    fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ content: input.value })
    })
    .then(() => {
        input.value = '';
        load();
    });
});
