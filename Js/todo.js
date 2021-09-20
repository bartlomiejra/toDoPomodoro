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
const item = document.querySelector('.item')
const box = document.querySelector('.box')
const newtoDoBox = document.querySelector(".addTodo");
//!Empty State

var categories = []
let Position = JSON.parse(localStorage.getItem('Position'));
if (Position == null) {
	Position = [
		{
	  id: 0,
	  text: 'First',
	  done: false,
	  category: 'inbox',
	  data: '30.1.21',
	},
];
}



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
		

		
		

			<div class="todo_item dragitem drag-drop" id=${todo.id} ">
			
			<input type="checkbox">
			${todo.text}

 
 
 

          <button id=${todo.id} data-index=${todo.id} onClick="deleteTodo(this)">
          
		  Delete
          </button>

		  
		
		 </div>`,
	
		)
		.join('');
	}
// dragAndDrop();




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
		<div id="inner-dropzone" class="  todo_categoryBox dropzone dropcategory" value="${cate.text}"  style="background-color: ${cate.color};" >  
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
		// dragAndDrop();
	}
	renderCategory();
	
	let	taskplace = document.querySelector('taskplace');

	item.innerHTML = `
	<div id="no-drop" class="drag-drop dragitem "> #no-drop </div>
				
	<div id="yes-drop" class="drag-drop dragitem"> #yes-drop </div>
	
	<div  class="dropzone">
		#outer-dropzone
		<div  class="dropzone">#inner-dropzone</div>
	</div>`;


// 	// drag and drop inplement
// 	function dragAndDrop(){

		
// 		const dragItems = document.querySelectorAll('.dragitem');
// 		const category = document.querySelectorAll('.dropcategory');
	
// 		let draggedItem = null;
		
// 		for (let i = 0; i < dragItems.length; i++) {
// 			const item = dragItems[i];		
// 			item.addEventListener('dragstart', () => {
// 				draggedItem = item;
// 				setTimeout(() => {
// 					item.style.display = 'none';
// 				}, 0);
// 			});
// 		item.addEventListener('dragend', () => {
// 						setTimeout(() => {
// 							draggedItem.style.display = 'flex';
// 							draggedItem = null;
// 						}, 0);
// 					});
					
// 					for (let j = 0; j < category.length; j++) {
// 						const list = category[j];
						
// 						list.addEventListener('dragover', (e) => {
// 							e.preventDefault();
// 						});
						
// 						list.addEventListener('dragenter', (e) => {
// 							e.preventDefault();
// 						});
						
// 						list.addEventListener('dragleave', (e) => {
// 							// console.log(e);
// 							// console.log(item.id);
// 							// console.log(this);
// 						});
						
// 						list.addEventListener('drop', function (e) {
// 							console.log(draggedItem.id);
							
// 							console.log('drop');
// 							// console.log(e);
// 							// console.log(this.closest('div'));
// 							// console.log(draggedItem.closest('dropcategory'));
// 		// console.log(e.value);
// 		console.log(this);
// 		let thisBox = this;
// 		let thisTask = draggedItem;

// 		console.log(thisTask);
// 		this.append(draggedItem);

// 		const position = [{
// 		div: thisBox,
// 		task: thisTask
// 		}]
	
// 	;
// 	//   todoInput.value = '';
// 	Position.push(position);
// 	console.log(Position);
// 	localStorage.setItem('position', JSON.stringify(Position));


//     });
//   }
// }
// }
// dragAndDrop();





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




/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */
const dropzone = document.querySelectorAll('dropzone')
// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.dragitem',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
  },
//   ondragenter: function (event) {
//     var draggableElement = event.relatedTarget
// 	// dropzone.append(draggableElement);
// 	console.log(draggableElement);
// 	console.log(dropzone)

//     var dropzoneElement = event.target

//     // feedback the possibility of a drop
//     dropzoneElement.classList.add('drop-target')
//     draggableElement.classList.add('can-drop')

//     draggableElement.textContent = 'Dragged in'
//   },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    event.relatedTarget.textContent = 'Dragged out'
  },
  ondrop: function (event) {
    event.relatedTarget.textContent = 'Dropped'
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

interact('.drag-drop')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener }
  })


  function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

let out = document.createElement('div');
out.className ='dropzone';
newtoDoBox.appendChild(out);
let inner = document.createElement('div')
inner.className ='dropzone';
out.appendChild(inner);

{/* <div id="outer-dropzone" class="dropzone">
		#outer-dropzone
		<div id="inner-dropzone" class="dropzone">#inner-dropzone</div>
	</div>`; */}