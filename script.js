
// Function to add a new item to the list
function addTask() {
	
  //This creates a new <li> (list item) element. This will represent a new task in the list.
  const li = document.createElement("li");
  //This retrieves the value (text) from an input field with the ID 
  //myInput. The value property gives the text that the user has 
  //entered into the input box.
  const inputValue = document.getElementById("myInput").value;
  //This creates a text node containing the task text (inputValue). 
  const textNode = document.createTextNode(inputValue);
  //This appends the created text node to the <li> element (li).
  li.appendChild(textNode);

  // Create a checkbox for the item
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  //Create an edit button
  const editButton = document.createElement("button");
  editButton.textContext = "Edit";
  editButton.classList.add("edit-button")

  // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  // Append the checkbox to the list item
  li.appendChild(checkbox);
  
  //Append the edit button to the list item
  li.appendChild(editButton);

  // Append the delete button to the list item
  li.appendChild(deleteButton);


  if (inputValue === '') {
    alert("You have to write a new task");
  } else {
	//This appends the newly created <li> (containing the task) to 
	//an existing element with the ID "myTasks". This is where the 
	//new task will appear in the list.
    document.getElementById("myTasks").appendChild(li);
  }

//After adding the task to the list, this line clears the input 
//field (myInput) by setting its value to an empty string (""). 
//This makes the input field ready for the next task.
  document.getElementById("myInput").value = "";

  // Add event listener for task completion
  checkbox.addEventListener("click", function () {
  li.classList.toggle("completed", checkbox.checked);
});

  editButton.addEventListener("click", function () {
	const newText = prompt("Edit your task:", textNode.textContent);
    if (newText !== null && newText !== "") {
      textNode.textContent = newText;
    }
  });

  deleteButton.addEventListener("click", function () {
  if (confirm("Are you sure you want to delete this item?")) {
    li.remove();
  }
});
}

// Create a new list
document.getElementById("new-list-button").addEventListener("click", function () {
  // Create a new list container
  const listContainer = document.createElement("div");
  listContainer.classList.add("list-container");

  // Create a unique ID for the new list
  const newListId = "list-" + Date.now();
  
  const listTitle = document.createElement("h3");
  listTitle.textContent = "New List";
  listContainer.appendChild(listTitle);

  // Create the new list
  const ul = document.createElement("ul");
  ul.id = newListId;
  listContainer.appendChild(ul);

  // Create the new list task input and button
  const inputWrapper = document.createElement("div");
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.id = "myInput";
  inputField.placeholder = "New Task";

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.classList.add("addBtn");
  submitButton.addEventListener("click", function () {
    addTask(newListId);
  });

  inputWrapper.appendChild(inputField);
  inputWrapper.appendChild(submitButton);
  listContainer.appendChild(inputWrapper);

  // Append the new list to the main list container
  document.getElementById("list-container").appendChild(listContainer);
});




