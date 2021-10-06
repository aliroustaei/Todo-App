// get todo from localstoge
let todo = localStorage.getItem("todo");

// try pars or null data
try {
  todo = JSON.parse(todo);
  todo = todo.length > 0 ? todo : null;
} catch (e) {
  todo = null;
}

// set defult value if todo is null

if (todo === null) {
  todo = [
    {
      content: "shopping",
      status: true,
    },
    {
      content: "wacthe video",
      status: true,
    },
    {
      content: "play game",
      status: true,
    },
  ];

  localStorage.setItem("todo", JSON.stringify(todo));
}

// fun to creat li list
function creatLi(todo) {
  let todoList = document.querySelector(".list-group");
  todoList.innerHTML = "";

  // creat/update li for each todo
  todo.forEach((e, index) => {
    let li = document.createElement("li");
    li.className = "list-group-item";
    let content = document.createElement("span");
    content.textContent = e.content;
    content.style.textDecoration = e.status ? "initial" : "line-through";
    let deleteBtn = document.createElement("img");
    deleteBtn.src = "img/close.svg";

    // append content and deleteBtn to li
    li.append(content);
    li.append(deleteBtn);

    // append li to list-group
    todoList.append(li);

    // deleteBtn evant
    deleteBtn.addEventListener("click", () => {
      todo.splice(index, 1);
      localStorage.setItem("todo", JSON.stringify(todo));
      creatLi(todo);
    });

    // complete evant
    content.addEventListener("click", () => {
      todo[index].status = !todo[index].status;
      localStorage.setItem("todo", JSON.stringify(todo));
      creatLi(todo);
    });
  });
}

creatLi(todo);

// action and search

let actions = document.querySelector("#actions");
let formWrapper = document.querySelector("#form-wrapper");

Array.from(actions.children).forEach((e) => {
  if (e.dataset.action == "add") {
    e.addEventListener("click", () => {
      formWrapper.innerHTML = `
            <form id="add">
                    <input type="text" name="add" class="form-control" placeholder="Add Todo ...">
            </form>`;
      creatLi(todo);

      let add = document.querySelector("#add");
      add.addEventListener("submit", (e) => {
        e.preventDefault();
        if (add.add.value) {
          todo.push({
            content: add.add.value,
            status: true,
          });
          localStorage.setItem("todo", JSON.stringify(todo));
          creatLi(todo);
          add.add.value = "";
        }
      });
    });
  } else if (e.dataset.action == "search") {
    e.addEventListener("click", () => {
      formWrapper.innerHTML = `
                <form id="search">
                    <input type="text" name="search" class="form-control" placeholder="Search Todo ...">
                </form>`;
      let search = document.querySelector("#search");
      search.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (search.search.value) {
          let filter_todo = todo.filter((e) =>
            e.content.toLowerCase().includes(search.search.value.toLowerCase())
          );
          creatLi(filter_todo);
        } else {
          creatLi(todo);
        }
      });
    });
  }
});

// dark-theme -----

let darkbtn = document.querySelector(".dark-btn");

darkbtn.addEventListener("click", () => {
  darkbtn.classList.toggle("dark-btn-on");
  document.body.classList.toggle("light-Theme");
  change();
});
