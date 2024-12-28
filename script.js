document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Cargar tareas del localStorage cuando la página se carga
    loadTasks();

    // Agregar tarea
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        const priority = document.getElementById("prioritySelect").value; // Obtener la prioridad seleccionada
        if (taskText === "") return;

        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        taskItem.dataset.priority = priority;  // Esto asigna la prioridad a la tarea
        taskItem.classList.add(priority);  // Esto agrega la clase de prioridad a la tarea
        taskItem.innerHTML = `
            <span class="${priority}">${taskText}</span>
            <div>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        `;

        // Marcar como completada
        taskItem.querySelector("span").addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks(); // Guardar tareas después de marcar como completada
        });

        // Editar tarea
        taskItem.querySelector(".edit-button").addEventListener("click", () => {
            const currentText = taskItem.querySelector("span").textContent;
            const currentPriority = taskItem.dataset.priority; // Obtener la prioridad actual
            const newText = prompt("Edit your task:", currentText);
            const newPriority = prompt("Select priority (low, medium, high):", currentPriority); // Pedir nueva prioridad
            if (newText !== null && newText.trim() !== "") {
                taskItem.querySelector("span").textContent = newText.trim();
                taskItem.dataset.priority = newPriority;
                taskItem.querySelector("span").className = newPriority; // Cambiar la clase de prioridad
                saveTasks(); // Guardar tareas después de editar
            }
        });

        // Eliminar tarea
        taskItem.querySelector(".delete-button").addEventListener("click", () => {
            taskItem.remove();
            saveTasks(); // Guardar tareas después de eliminar
        });

        taskList.appendChild(taskItem);
        taskInput.value = ""; // Limpiar el input

        saveTasks(); // Guardar tareas al agregar una nueva
    });

    // Cargar tareas desde localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.className = "task-item";
            taskItem.dataset.priority = task.priority;
            taskItem.innerHTML = `
                <span class="${task.priority}">${task.text}</span>
                <div>
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </div>
            `;

            // Marcar como completada
            if (task.completed) {
                taskItem.classList.add("completed");
            }

            // Marcar como completada
            taskItem.querySelector("span").addEventListener("click", () => {
                taskItem.classList.toggle("completed");
                saveTasks();
            });

            // Editar tarea
            taskItem.querySelector(".edit-button").addEventListener("click", () => {
                const currentText = taskItem.querySelector("span").textContent;
                const currentPriority = taskItem.dataset.priority;
                const newText = prompt("Edit your task:", currentText);
                const newPriority = prompt("Select priority (low, medium, high):", currentPriority);
                if (newText !== null && newText.trim() !== "") {
                    taskItem.querySelector("span").textContent = newText.trim();
                    taskItem.dataset.priority = newPriority;
                    taskItem.querySelector("span").className = newPriority;
                    saveTasks();
                }
            });

            // Eliminar tarea
            taskItem.querySelector(".delete-button").addEventListener("click", () => {
                taskItem.remove();
                saveTasks();
            });

            taskList.appendChild(taskItem);
        });
    }

    // Guardar tareas en localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(task => {
            tasks.push({
                text: task.querySelector('span').textContent,
                completed: task.classList.contains('completed'),
                priority: task.dataset.priority // Guardar la prioridad también
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});



