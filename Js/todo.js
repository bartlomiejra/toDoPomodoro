let last = 0;
const DivToDo = document.querySelector('.todo_List');
const divCategory = document.querySelector('.todo_category');
const todoTitle = document.querySelector('.todo_input');
const categoryTitle = document.querySelector('.category_input');
const colorCategory = document.querySelector('.todo_color');
const openPopup = document.querySelector('.openpopup')
const menugui = document.getElementsByClassName('gui-popup')
const todoCard = document.querySelector('.todoCard');
const taskCategory = document.querySelector('.taskCategory')
//!Empty State

var categories = []
let ListOfCategory = JSON.parse(localStorage.getItem('ListCategory'));
	ListOfCategory.forEach((items) => {
		const {id, color, ...rest} = items
	categories.push(rest)
		// if (items.id > last) {
			// 	last = items.id;
		});
		console.log(categories);
		
let ListOfToDo = JSON.parse(localStorage.getItem('ListTodo'));
if (ListOfToDo == null) {
	ListOfToDo = [
		{
	  id: 0,
	  text: 'First',
	  done: false,
	  category: 'inbox',
	  data: '30.1.21',
	},
];
}
localStorage.setItem('ListTodo', JSON.stringify(ListOfToDo));
 ListOfCategory = JSON.parse(localStorage.getItem('ListCategory'));

if (ListOfCategory == null) {
	ListOfCategory = [
		{
			id: 0,
        text: 'ToDo',
        color: '#780116',
	},
	   {
		   id: 1,
        text: 'In Progress',
        color: '#CBA135',
	},
	{
        id: 2,
        text: 'Dones',
        color: '#034748',
	},
];
}
localStorage.setItem('ListCategory', JSON.stringify(ListOfCategory));
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
		category: taskCategory.value,
		data: '31.1.21',
	};
	//   todoInput.value = '';
	ListOfToDo.push(ToDoNew);
	console.log(ListOfToDo);
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
DivToDo.innerHTML = ListOfToDo.map(
		(todo) =>`
		

		
		

			<div class="todo_item dragitem" id=${todo.id} draggable="true">
			
			<input type="checkbox">
			${todo.text}

 
 
 

          <button id=${todo.id} data-index=${todo.id} onClick="deleteTodo(this)">
          
		  Delete
          </button>

		  
		
		 </div>`,
	
		)
		.join('');
	}
dragAndDrop();




function addCategory(event) {
	// find last id number

	ListOfCategory.forEach((items) => {
	  if (items.id > last) {
		  last = items.id;
		}
	});
	const NewCategory = {
		id: (last += 1),
		text: categoryTitle.value,
		color: colorCategory.value,
		
	};
	//   todoInput.value = '';
	ListOfCategory.push(NewCategory);
	console.log(ListOfCategory);
	localStorage.setItem('ListCategory', JSON.stringify(ListOfCategory));
	
	categoryTitle.value = '';
	//     lists(todos, todoList);
	//     lists(actualList, todoList);
	// return false;
  renderCategory();
}

function renderCategory() {
		ListOfCategory = JSON.parse(localStorage.getItem('ListCategory'));

		
		
	console.log('ok');
	
	
	divCategory.innerHTML = ListOfCategory.map(
		(cate) => `
		<div class="  todo_categoryBox dropcategory" value="${cate.text}"  style="background-color: ${cate.color};" >  
		<div class="todo_categoryTittle">
		
		
		${cate.text}
		
		<button  onClick="deleteCategory(this)" autofocus=""data-index=${cate.id} id=${cate.id} class="todo_categoryRemove" aria-label="Delete">
		<i class="fas fa-minus-circle dltbtn" aria-hidden="true"> </i>
		</button>
		</div>
		</div>
		</div>`,
		)
		.join('');
		dragAndDrop();
	}
	renderCategory();
	
	let	taskplace = document.querySelector('taskplace');


	// drag and drop inplement
	function dragAndDrop(){

		
		const dragItems = document.querySelectorAll('.dragitem');
		const category = document.querySelectorAll('.dropcategory');
	
		let draggedItem = null;
		
		for (let i = 0; i < dragItems.length; i++) {
			const item = dragItems[i];		
			item.addEventListener('dragstart', () => {
				draggedItem = item;
				setTimeout(() => {
					item.style.display = 'none';
				}, 0);
			});
		item.addEventListener('dragend', () => {
						setTimeout(() => {
							draggedItem.style.display = 'flex';
							draggedItem = null;
						}, 0);
					});
					
					for (let j = 0; j < category.length; j++) {
						const list = category[j];
						
						list.addEventListener('dragover', (e) => {
							e.preventDefault();
						});
						
						list.addEventListener('dragenter', (e) => {
							e.preventDefault();
						});
						
						list.addEventListener('dragleave', (e) => {
							// console.log(e);
							// console.log(item.id);
							// console.log(this);
						});
						
						list.addEventListener('drop', function (e) {
							console.log(draggedItem.id);
		console.log('drop');
		// console.log(e);
		// console.log(this.closest('div'));
		// console.log(e.value);
		this.append(draggedItem);
    });
  }
}
}
dragAndDrop();





// function openPopupMenu(clicked_Id){
// 	// clicked_Id.stopPropagation();
// 	console.log(this.id);
// 	console.log(clicked_Id);
// 	// 	menugui.forEach((ele) =>{
// 		// console.log(ele);
// 		// 	});
// 		for (var i = 0; i < menugui.length; i++) {
// 			menugui[i].classList.remove('visable');
			
// 		clicked_Id.firstElementChild.classList.add('visable');
		
// 	//  this.stopPropagation();  

// 		}
// 	}
	
	
	
// 	function closepopUp(clickedId){
// 		console.log(clickedId);
// 	let parentClick = clickedId.closest('.gui-popup')
// 	console.log(parentClick)
// 	parentClick.classList.remove('visable');
// }
 
function deleteTodo(ClickedId){
const { ...index } = ClickedId.dataset;
let newListOfToDo = ListOfToDo.filter(todo => todo.id != ClickedId.id);
	localStorage.setItem('ListTodo', JSON.stringify(newListOfToDo));
	renderTodos();

}
 
function deleteCategory(ClickedCategory){

const { ...index } = ClickedCategory.dataset;
console.log(ClickedCategory.id);
let newListOfCategory = ListOfCategory.filter(cate => cate.id != ClickedCategory.id);
	localStorage.setItem('ListCategory', JSON.stringify(newListOfCategory));
	console.log(newListOfCategory);
	renderCategory();
}

// function editTask(Clickedtask){
// 	            // var selectedValue = document.getElementById("list");
// 			console.log(Clickedtask.value)
// // console.log(selectedValue.value);
// // 	const { ...index } = ClickedCategory.dataset;
// // console.log(ClickedCategory.id);
// // localStorage.setItem('ListCategory', JSON.stringify(newListOfCategory));
// // 	console.log(newListOfCategory);
// // 	renderCategory();
// }
// // let newListOfCategory = ListOfCategory.filter(cate => cate.id != ClickedCategory.id);
// // let newfun = ListOfCategory.forEach(destfunction);


renderoptionCategory();
function renderoptionCategory(){
	var categories = []
	ListOfCategory.forEach((items) => {
		const {id, color, ...rest} = items
	categories.push(rest)
		// if (items.id > last) {
			// 	last = items.id;
		});
		console.log(categories);
	taskCategory.innerHTML = categories.map(
		(category) =>`
					<option value="${category}">${category.text}</option>
					`,
		)
		.join('');
					

}