let last = 0;
const DivToDo = document.querySelector('.todo_List');
const divCategory = document.querySelector('.todo_category');
const todoTitle = document.querySelector('.todo_input');
const categoryTitle = document.querySelector('.category_input');
const colorCategory = document.querySelector('.todo_color');
const openPopup = document.querySelector('.openpopup')
const menugui = document.getElementsByClassName('gui-popup')
const todoCard = document.querySelector('.todoCard');

//!Empty State
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
let ListOfCategory = JSON.parse(localStorage.getItem('ListCategory'));

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
		category: 'inbox',
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
	console.log('render');
	DivToDo.innerHTML = ListOfToDo.map(
		(todo) => `
		<div class="todo_item dragitem" draggable="true">
		
		<input type="checkbox">
		${todo.text}
 <div class="todo_splitBtn fas fa-list-alt openpopup" aria-haspopup="true" aria-expanded="false" title="Open for more actions"
 id=${todo.id}  
 onClick="openPopupMenu(this)"
 >
 
 
 
 <ul class="gui-popup">
 <button onclick="event.stopPropagation();closepopUp(this)" class="todo_closePopup "><i class="fas fa-times" aria-hidden="true"></i>
 </button>
          <li><button>
          
            Edit
          </button></li>
          <li><button>
          
            Delete
          </button></li>


          <li>
		 <select name="category" placeholder="Edit Category" id="category-select">
		 <option value="1">Task</option>
    <option value="2">Work</option>
    <option value="3">Home</option>
		 </select> 
		 </li>
        </ul>
    </div>		
</div>`,
)
.join('');
dragAndDrop();
}



function addCategory(event) {
	ListOfCategory = JSON.parse(localStorage.getItem('ListCategory'));
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
	console.log('ok');
	
	divCategory.innerHTML = ListOfCategory.map(
		(cate) => `
		<div class="  todo_categoryBox dropcategory" value="${cate.text}"  style="background-color: ${cate.color};" >  
		<div class="todo_categoryTittle">
		
		
		${cate.text}
		
		<button autofocus="" class="todo_categoryRemove" aria-label="Delete">
		<i class="fas fa-minus-circle dltbtn" aria-hidden="true"> </i>
		</button>
		</div>
		
		</div>`,
		)
		.join('');
		dragAndDrop();
	}
	renderCategory();
	
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
						});
						
						list.addEventListener('drop', function (e) {
		console.log('drop');
		console.log(e);
		console.log(this.closest('div'));
		// console.log(e.value);
		this.append(draggedItem);
    });
  }
}
}
dragAndDrop();





function openPopupMenu(clicked_Id){
	// clicked_Id.stopPropagation();
	console.log(this.id);
	console.log(clicked_Id);
	// 	menugui.forEach((ele) =>{
		// console.log(ele);
		// 	});
		for (var i = 0; i < menugui.length; i++) {
			menugui[i].classList.remove('visable');
			
		clicked_Id.firstElementChild.classList.add('visable');
		
	//  this.stopPropagation();  

		}
	}
	
	
	
	function closepopUp(clickedId){
		console.log(clickedId);
	let parentClick = clickedId.closest('.gui-popup')
	console.log(parentClick)
	parentClick.classList.remove('visable');
}
 
function deleteTodo(ClickedId){
	console.log(e.target);
	//    const { ...index } = e.target.dataset;



}