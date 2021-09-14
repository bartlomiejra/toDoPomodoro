// /* eslint-disable no-undef */
// const openTodo = document.getElementById('todoButton');
// const closeTodo = document.getElementById('closeTodobtn');
// const todoCard = document.querySelector('.todoCard');
// const note = document.querySelector('note');
// const todoBut = document.getElementById('todoButton');
// function openTodoCard() {
//     todoCard.classList.add('active');
//     // note.classList.add('none');
//     noteCard.classList.remove('active');
//     // overlay.classList.add('active');
//     leftDiv.classList.add('none');
//     centerDiv.classList.add('none');
//     settingsDiv.classList.add('none');
//     settingsDiv.classList.remove('active');
// }

// openTodo.addEventListener('click', openTodoCard);
let last = 0;
// asd
//    const divT = document.querySelector('.center_divT');
const DivToDo = document.querySelector('.todosList');
const divCategory = document.querySelector('.category');
const todoTitle = document.querySelector('.todoTitle');
const categoryTitle = document.querySelector('.categoryTitle');

let ListOfToDo = JSON.parse(localStorage.getItem('ListTodo'));
function addNewTodo(event) {
  ListOfToDo = JSON.parse(localStorage.getItem('ListTodo'));

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
}

renderTodos();
function renderTodos() {
  console.log('render');
  DivToDo.innerHTML = ListOfToDo.map(
    (todo) => `
		<div class="todoslist_inbox list-item" draggable="true" id="item0" ontouchend="drop(event)>

			<input type="checkbox">
			${todo.text}
            <button autofocus="" tabindex="0" class="center_delete-btn" aria-label="Delete">
			<i class="fas fa-minus-circle" aria-hidden="true"> </i>
		</button>
</div>`,
  )
  .join('');
}

let ListOfCategory = JSON.parse(localStorage.getItem('ListCategory'));
function addCategory(event) {
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
  // find last id number
  ListOfCategory.forEach((items) => {
    if (items.id > last) {
      last = items.id;
    }
  });
  const NewCategory = {
    id: (last += 1),
    text: categoryTitle.value,
	        color: '#955165',

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
<div class="categoryTodos dropzone categoryBox" value="${cate.text}" draggable="true" id="item0"  style="background-color: ${cate.color};" >  
<div className="tittle">


${cate.text}

 <button autofocus="" tabindex="0" class="center_delete-btn" aria-label="Delete">
<i class="fas fa-minus-circle dltbtn" aria-hidden="true"> </i>
</button>
</div>
         
</div>`,
  )
  .join('');
}
renderCategory();

// drag and drop inplement
const list_items = document.querySelectorAll('.list-item');
const category = document.querySelectorAll('.categoryTodos');

let draggedItem = null;

for (let i = 0; i < list_items.length; i++) {
  const item = list_items[i];

// let mc = new Hammer(item);

// mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) )
// mc.on("pan", dragstart);

//  item.addEventListener('touchstart',()=>{
//     draggedItem = item;
//     setTimeout(() => {
//       item.style.display = 'none';
//     }, 0);
//   });

  item.addEventListener('dragstart',()=>{
    draggedItem = item;
    setTimeout(() => {
      item.style.display = 'none';
    }, 0);
  });

//   item.addEventListener('touchend', () => {
//     setTimeout(() => {
//       draggedItem.style.display = 'block';
//       draggedItem = null;
//     }, 0);
//   });

 
  item.addEventListener('dragend', () => {
    setTimeout(() => {
      draggedItem.style.display = 'block';
      draggedItem = null;
    }, 0);
  });

  for (let j = 0; j < category.length; j++) {
    const list = category[j];

    list.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    list.addEventListener('dragenter', function (e) {
      e.preventDefault();
    });

    list.addEventListener('dragleave', function (e) {
    });

    list.addEventListener('drop', function (e) {
      console.log('drop');
      console.log(e);
      console.log(this.closest("div")
	  );
      // console.log(e.value);
      this.append(draggedItem);
    });
  }
}




// }
// target elements with the "draggable" class
// interact('.draggable')
//   .draggable({
//     // enable inertial throwing
//     inertia: true,

//     // enable autoScroll
//     autoScroll: true,

//     // call this function on every dragmove event
//     onmove: dragMoveListener,
//     // call this function on every dragend event
//     onend: function (event) {
//     }
	
//   });


//  function dragMoveListener (event) {
//     var target = event.target,
//         // keep the dragged position in the data-x/data-y attributes
//         x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
//         y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//     // translate the element
//     target.style.webkitTransform =
//     target.style.transform =
//       'translate(' + x + 'px, ' + y + 'px)';

//     // update the posiion attributes
//     target.setAttribute('data-x', x);
//     target.setAttribute('data-y', y);
//   }







// // enable draggables to be dropped into this
// interact('.dropzone').dropzone({
//   // only accept elements matching this CSS selector
//   accept: '#drag-1',
//   // Require a 75% element overlap for a drop to be possible
//   overlap: 0.80,

//   // listen for drop related events:

//   ondropactivate: function (event) {
//     // add active dropzone feedback
//     event.target.classList.add('drop-active');
//   },
//   ondragenter: function (event) {
//     var draggableElement = event.relatedTarget,
//         dropzoneElement = event.target;

//     // feedback the possibility of a drop
//     dropzoneElement.classList.add('drop-target');
//     draggableElement.classList.add('can-drop');
//     //draggableElement.textContent = 'le bloc est dedans';
//   },
//   ondragleave: function (event) {
//     // remove the drop feedback style
//     event.target.classList.remove('drop-target');
//     event.relatedTarget.classList.remove('can-drop');
// 		event.relatedTarget.classList.remove('drop-ok');//enlever la class
//   },
//   ondrop: function (event) {
// 		event.relatedTarget.classList.add('drop-ok'); //ajouter la class
//   },
//   ondropdeactivate: function (event) {
//     // remove active dropzone feedback
//     event.target.classList.remove('drop-active');
//     event.target.classList.remove('drop-target');
//   }
// });

let moving = null;



function pickup(event) {
	console.log("pickup");
    moving = event.target;
	
    moving.style.height = moving.clientHeight;
    moving.style.width = moving.clientWidth;
    moving.style.position = 'fixed';
    moving.style.zIndex = '-10';
}

function drop(event) {
	if (moving) {
		console.log("moving");
        // reset our element
        moving.style.left = '';
        moving.style.top = '';
        moving.style.height = '';
        moving.style.width = '';
        moving.style.position = '';
        moving.style.zIndex = '';

        moving = null;
    }
}



function move(event) {
    if (moving) {
        // track movement
    }
}