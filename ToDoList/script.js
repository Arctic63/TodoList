// Array to store task data
let tasks = [];
// Counter for generating unique task IDs
let taskIdCounter = 0;

// Function to create a task list item
function createTaskElement(taskText, taskId) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    taskItem.className = 'task-item';
    taskItem.id = `task-${taskId}`;
    return taskItem;
}

// Function to create a checkbox
function createCheckbox() {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    return checkbox;
}

// Function to create a button with the given ID and text
function createButton(id, text) {
    const button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    return button;
}

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    console.log(tasks)

    if (taskText !== "") {
        // Create a new task item and add it to the list
        const taskItem = createTaskElement(taskText, taskIdCounter++);
        const checkbox = createCheckbox();

        // Add a change event listener to the checkbox
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskItem.classList.add('completed-task');
            } else {
                taskItem.classList.remove('completed-task');
            }
        });

        // Add buttons for editing and removing
        const editButton = createButton(`editBtn-${taskIdCounter}`, 'Edit');
        const removeButton = createButton(`removeBtn-${taskIdCounter}`, 'Remove');

        // Add click event listeners for the edit and remove buttons
        editButton.addEventListener('click', () => {
            // Implement the edit functionality here
            const taskElement = editButton.parentElement;
            const taskId = taskElement.id;
            let edit_count = 0;
            const taskToEdit = tasks.find((element) => taskId === element.id);

            console.log(taskToEdit.text);

            if (taskToEdit) {
                // Create an input field for editing
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = taskToEdit.text;


                // Creating the button to enter the edited text
                const doneEditedBtn = createButton(`edit-${edit_count++}`, 'Done');

                // Replace the task text with the input field
                taskElement.innerHTML = '';
                taskElement.appendChild(editInput);
                taskElement.appendChild(doneEditedBtn);

                // Focuse on the input field for editing 
                editInput.focus();


                // Handle the button press to save the edited text 
                doneEditedBtn.addEventListener('click', () => {
                    // Update the task in task object 
                    taskToEdit.text = editInput.value;

                    // Display the updated task text
                    taskElement.textContent = editInput.value;


                    // Append elements to the task item
                    taskElement.appendChild(checkbox);
                    taskElement.appendChild(editButton);
                    taskElement.appendChild(removeButton);

                })

                // Handle the Enter key press to save changes 

                editInput.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') {
                        // Update the task in task object 
                        taskToEdit.text = editInput.value;

                        // Display the updated task text
                        taskElement.textContent = editInput.value;
                        // Append elements to the task item
                        taskElement.appendChild(checkbox);
                        taskElement.appendChild(editButton);
                        taskElement.appendChild(removeButton);

                    }
                })

            }


        });

        removeButton.addEventListener('click', () => {
            taskItem.remove();
            tasks = tasks.filter((task) => task.id !== taskItem.id);
        });

        // Append elements to the task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(editButton);
        taskItem.appendChild(removeButton);

        // Add the task to the list and clear the input field
        tasks.push({ id: taskItem.id, text: taskText });
        document.getElementById('todoTasks').appendChild(taskItem);
        taskInput.value = "";
    } else {
        alert('Please enter a valid task!');
    }
}

// Add click event listener for the "Add" button
document.getElementById('addTaskButton').addEventListener('click', addTask);

// Add keyup event listener for the task input field (to handle Enter key press)
document.getElementById('taskInput').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});