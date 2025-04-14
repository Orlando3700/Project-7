//script.js

// Function to load tasks from localStorage
function loadTasks() {
	//Retrieves the tasks item from localStorage as a string.
    const stored = localStorage.getItem('tasks');
    let tasks = [];	//Initialize an empty array

    try {
		//Tries to parse the string into a JavaScript array of objects
        const parsed = JSON.parse(stored);
		//If parsed data is an array, we filter out any invalid entries
        if (Array.isArray(parsed)) {
            tasks = parsed.filter(task => task && typeof task.id === 'string' && typeof task.content === 'string');
        }
	//If parsing fails, we log a warning and remove the corrupted "tasks" from localStorage.
    } catch (e) {
        console.warn("Invalid tasks in localStorage");
        localStorage.removeItem('tasks'); // Clear invalid data
    }
	//For each valid task, we create a DOM element and add it to the list (<ul>).
    tasks.forEach(task => {
        const taskItem = createTaskItem(task.id, task.content);
        tasksList.appendChild(taskItem);
    });
}

//function loadTasks() {
    //const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    //tasks.forEach(task => {
        //const taskItem = createTaskItem(task.id, task.content);
        //tasksList.appendChild(taskItem);
    //});
//}

// Function to save a task to localStorage
function saveTaskToStorage(id, content) {
	//Gets the current list of tasks from localStorage. 
	//If it doesn't exist, start with an empty array.
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	//Adds the new task to the array, then saves the updated array 
	//back to localStorage as a string
    tasks.push({ id, content });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get references to DOM elements
const inputField = document.getElementById('myInput');
const submitButton = document.getElementById('submit-button');
const tasksList = document.getElementById('myTasks');

// Function to create a new task item and to accept id
function createTaskItem(id, taskContent) {
    const li = document.createElement('li'); // Create a new list item

    // Create checkbox element
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    
    // Create delete button element
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');

    // Add event listener to delete the task when the delete button 
	// is clicked
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the task item click event
        li.remove(); // Remove the task from the list

		// Remove from localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
	 });

    // Add event listener to toggle the task completion when checkbox
	// is clicked
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            li.style.textDecoration = 'line-through'; // Strike-through when checked
        } else {
            li.style.textDecoration = 'none'; // Remove strike-through when unchecked
        }
    });

	const editButton = document.createElement('button');
	editButton.textContent = 'Edit';
	deleteButton.classList.add('edit-button');
	editButton.addEventListener('click', (e) => {
		e.stopPropagation();
		window.location.href = `edit.html?id=${id}`;	
	});

    // Append checkbox to the list item
    li.appendChild(checkbox);
	// Append task content to the list item
    li.appendChild(document.createTextNode(taskContent));
	// Append edit button to the list item
	li.appendChild(editButton);
    // Append delete button to the list item
	li.appendChild(deleteButton);

    return li;
}

// Event listener for the Submit button
submitButton.addEventListener('click', () => {
    const taskContent = inputField.value.trim(); // Get the value from input field

    // Only add the task if the input field is not empty
	//If the input isn’t empty:
	//Generates a unique id using the current time
	//Creates and displays the new task
	//Saves it to localStorage
	//Clears the input field
    if (taskContent !== '') {
		const id = Date.now().toString(); // Unique ID
        const newTask = createTaskItem(id, taskContent); //Create a new task
        tasksList.appendChild(newTask); //Add the task to the list
        saveTaskToStorage(id, taskContent);
        inputField.value = ''; //Clear the input field after adding the task
    }
});

// functionality when pressing the enter key to submit the task
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
		// This triggers the submit button when you press 'enter'
        submitButton.click();
    }
});

//Load saved tasks when the page loads
window.onload = loadTasks;


