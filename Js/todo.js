let last = 0;
const DivToDo = document.querySelector('.todo_List');
const divCategory = document.querySelector('.todo_category');
const todoTitle = document.querySelector('.todo_input');
const categoryTitle = document.querySelector('.category_input');
const colorCategory = document.querySelector('.todo_color');

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
		<div class="todo_item dragitem" draggable="true">

	<input type="checkbox">
		${todo.text}
            <button autofocus="" tabindex="0" class="todo_taskRemove" aria-label="Delete">
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
}
renderCategory();

// drag and drop inplement
const dragItems = document.querySelectorAll('.dragitem');
const category = document.querySelectorAll('.dropcategory');

let draggedItem = null;

for (let i = 0; i < dragItems.length; i++) {
  const item = dragItems[i];

// let mc = new Hammer(item);

// mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) )
// mc.on("pan", dragstart);

//  item.addEventListener('touchstart',()=>{
//     draggedItem = item;
//     setTimeout(() => {
//       item.style.display = 'none';
//     }, 0);
//   });

  item.addEventListener('dragstart', () => {
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
	console.log('pickup');
    moving = event.target;

    moving.style.height = moving.clientHeight;
    moving.style.width = moving.clientWidth;
    moving.style.position = 'fixed';
    moving.style.zIndex = '-10';
}

function drop(event) {
	if (moving) {
		console.log('moving');
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
