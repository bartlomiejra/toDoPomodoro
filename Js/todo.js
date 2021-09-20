let last = 0;
const DivToDo = document.querySelector('.todo_List');
// const CategoryTo = document.querySelector('.dropcategory');

const divCategory = document.querySelector('.todo_category');
const todoTitle = document.querySelector('.todo_input');
const categoryTitle = document.querySelector('.category_input');
const colorCategory = document.querySelector('.todo_color');
const openPopup = document.querySelector('.openpopup')
const menugui = document.getElementsByClassName('gui-popup')
const todoCard = document.querySelector('.todoCard');
const taskCategory = document.querySelector('.taskCategory')
const itemTodos = document.querySelector('.itemTodos')
//!Empty State
	 

		
let ListOfToDo = JSON.parse(localStorage.getItem('ListTodo'));
if (ListOfToDo == null) {
	ListOfToDo = [
		{
	  id: 0,
	  text: 'First',
	  done: false,
	  data: '30.1.21',
	},
];
}
localStorage.setItem('ListTodo', JSON.stringify(ListOfToDo));

function addNewTodo(event) {
	ListOfToDo = JSON.parse(localStorage.getItem('ListTodo'));

	// find last id number
	ListOfToDo.forEach((items) => {
		if (items.id > last) {
			last = items.id;
		}
	});
	const ToDoNew = {
		id: (last += 1),
		text: todoTitle.value,
		done: false,
		data: '31.1.21',
	};
	//   todoInput.value = '';
	ListOfToDo.push(ToDoNew);
	// console.log(ListOfToDo);
	localStorage.setItem('ListTodo', JSON.stringify(ListOfToDo));

	todoTitle.value = '';
	//     lists(todos, todoList);
	//     lists(actualList, todoList);
	// return false;
	renderTodos();
	const dragItems = document.querySelectorAll('.dragitem');
	console.log(dragItems);
}

renderTodos();


function renderTodos() {

	ListOfToDo = JSON.parse(localStorage.getItem('ListTodo'));
console.log(ListOfToDo)
	console.log('render');
// divCategory.innerHTML = categories.map(
// 	(divcat) => `
// 	<div class="divcat.title></div>
// 	`
// )
// let p = document.createElement("p")
// divCategory.append(p)
// CategoryTo
itemTodos.innerHTML = ListOfToDo.map(
		(todo) =>`
		

		
		

			<div class="todo_item dragitem" id=${todo.category} value=${todo.category} name=${todo.category} draggable="true">
			
			<input type="checkbox">
			${todo.text}

 
 
 

          <button id=${todo.id} data-index=${todo.id} onClick="deleteTodo(this)">
          
		  Delete
          </button>

		  
		
		 </div>`,
	
		)
		.join('');
	}






 
function deleteTodo(ClickedId){
const { ...index } = ClickedId.dataset;
let newListOfToDo = ListOfToDo.filter(todo => todo.id != ClickedId.id);
	localStorage.setItem('ListTodo', JSON.stringify(newListOfToDo));
	renderTodos();

}

