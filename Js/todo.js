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
		<div class="todoslist_inbox list-item" draggable="true" id="item0">

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
        text: 'TO DO',
        color: '#780116',
      },
	   {
        id: 1,
        text: 'IN PROGRESS',
        color: '#CBA135',
      },
	   {
        id: 2,
        text: 'DONES',
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
<div class="categoryTodos categoryBox" value="${cate.text}" draggable="true" id="item0"  style="background-color: ${cate.color};" >  
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

  item.addEventListener('dragstart',()=>{
    draggedItem = item;
    setTimeout(() => {
      item.style.display = 'none';
    }, 0);
  });

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
