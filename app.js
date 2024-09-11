const input = document.getElementById("input");
const submit = document.getElementById("submit");
const displayTodoList = document.getElementById("display-todo-list");
const randomResult = document.getElementById("random-result");

// Array to store todo items
let todoItems = [];

// Function to add a new todo item
function addTodoItem(text) {
    todoItems.push(text);
    
    const elementDiv = document.createElement("div");
    elementDiv.setAttribute("class", "output-container");
    elementDiv.setAttribute("id", "output-container");

    const elementButton = document.createElement("button");
    elementButton.setAttribute("class", "delete-button");
    elementButton.setAttribute("id", "delete-button");

    const elementImg = document.createElement("img");
    elementImg.setAttribute("src", "./asset/bin-icon.png");
    elementImg.setAttribute("alt", "delete button");
    elementImg.setAttribute("class", "bin-icon");

    const elementP = document.createElement("p");
    const textUser = document.createTextNode(text);

    elementP.appendChild(textUser);
    elementP.setAttribute("class", "output");

    elementDiv.appendChild(elementP);
    elementDiv.appendChild(elementButton);
    elementButton.appendChild(elementImg);

    displayTodoList.appendChild(elementDiv);
}

// Function to remove a todo item
function removeTodoItem(text) {
    const index = todoItems.indexOf(text);
    if (index > -1) {
        todoItems.splice(index, 1);
    }
}

// Function to randomly select a todo item
function getRandomTodoItem() {
    if (todoItems.length === 0) {
        return "No items in the list";
    }
    const randomIndex = Math.floor(Math.random() * todoItems.length);
    return todoItems[randomIndex];
}

// Function to display the random selection with animation
function displayRandomSelectionWithAnimation(item) {
    let interval;
    let counter = 0;
    randomResult.style.display = 'block';

    // Start animation by showing random items every 100ms
    interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * todoItems.length);
        randomResult.textContent = `${todoItems[randomIndex]}`;
        counter++;

        // Stop animation after showing random items for 1 second
        if (counter >= 20) {
            clearInterval(interval);
            // Show the final selected item
            randomResult.textContent = `คุณได้แดก : ${item}`;
        }
    }, 100);
}

// Event listener for submitting new todo items
submit.addEventListener('click', () => {
    let text = input.value.trim();
    if (text) {
        addTodoItem(text);
        input.value = '';
    }
});

// Event listener for deleting todo items
displayTodoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button') || e.target.classList.contains('bin-icon')) {
        const outputContainer = e.target.closest('.output-container');
        const todoText = outputContainer.querySelector('.output').textContent;
        removeTodoItem(todoText);
        outputContainer.remove();
    }
});

// Event listener for random selection
const randomButton = document.getElementById('random-button');
randomButton.addEventListener('click', () => {
    const randomItem = getRandomTodoItem();
    displayRandomSelectionWithAnimation(randomItem);
});
