/*let taskList = [{
        id: makeid(),
        task: "Learn English",
        lever: 0
    },
    {
        id: makeid(),
        task: "Learn Javascript",
        lever: 1
    },
    {
        id: makeid(),
        task: "Learn HTML,CSS",
        lever: 2
    }
];

saveLocalStogare(taskList)*/

let taskList = loadLocalStogare()

showTaskList(taskList)

function showTaskList(taskList) {
    let content = ''
    let stt = 0
    for (item of taskList) {
        let id = item.id
        stt = stt + 1
        let task = item.task
        let lever = showLever(item.lever)
        content += `<tr>
                        <td>${stt}</th>
                        <td>${id}</th>
                        <td id="task">${task}</td>
                        <td>${lever}</td>
                        <td>
                            <button class="btn btn-warning btn-edit" data-id="${id}" >Edit</button>
                            <button class="btn btn-danger btn-delete" data-id="${id}" >Delete</button>
                        </td>
                    </tr>`
    }
    document.getElementById('area-list-task').innerHTML = content

}

function saveLocalStogare(taskList) {
    localStorage.setItem('TODO_LIST', JSON.stringify(taskList))
}

function loadLocalStogare() {
    let taskList = JSON.parse(localStorage.getItem('TODO_LIST'))
    if (taskList) {
        return taskList;
    } else {
        return [];
    }
}

function showLever(value) {
    let xhtml = ""
    if (value == 0) {
        xhtml = '<span class="badge bg-dark">Small</span>'
    }
    if (value == 1) {
        xhtml = '<span class="badge bg-info">Medium</span>'
    }
    if (value == 2) {
        xhtml = '<span class="badge bg-danger">Hight</span>'
    }

    return xhtml;
}

function makeid(length = 5) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


/////****************************************************DELETE ***************************///////////////

/*document.querySelectorAll('.btn-delete').forEach(function(btnDelte) {
    btnDelte.addEventListener('click', function() {
        let id = btnDelte.getAttribute("data-id")
        let taskList = loadLocalStogare()
        taskList = taskList.filter(function(item) {
            return item.id != id
        })
        saveLocalStogare()
        showTaskList(taskList)
    })
})*/

document.addEventListener('click', function(e) {
    let elm = e.target;
    if (elm.classList.contains('btn-delete')) {
        let confirmDele = confirm("bạn có chắc muốn xóa dữ liệu")
        if (confirmDele) {
            let id = elm.getAttribute("data-id")
            let taskList = loadLocalStogare()
            taskList = taskList.filter(function(item) {
                return item.id != id
            })
            saveLocalStogare(taskList)
            showTaskList(taskList)
        } else {
            return false;
        }
    }
})

let toggle = document.getElementById('btn-toggle-form')
let areaForm = document.getElementById('area-form')
let cancel = document.getElementById('btn-cancel')

toggle.addEventListener("click", function() {
    let addTask = areaForm.classList.contains('d-none')
    if (addTask == true) {
        areaForm.classList.remove('d-none')
        toggle.innerText = ("close")
        toggle.classList.remove('bg-info')
        toggle.classList.add('bg-danger')
    } else {
        toggle.innerText = ("Add Task")
        areaForm.classList.add('d-none')
        toggle.classList.remove('bg-danger')
        toggle.classList.add('bg-info')
    }
})

cancel.addEventListener("click", function() {
    toggle.innerText = ("Add Task")
    areaForm.classList.add('d-none')
    toggle.classList.remove('bg-danger')
    toggle.classList.add('bg-info')
})

let id = ""


let submit = document.getElementById('submit')
submit.addEventListener('click', function() {
    if (!id) {
        let inputName = document.getElementById('input-name').value;
        let inputLevel = document.getElementById('input-level').value;
        let obj = {
            id: makeid(),
            task: inputName,
            lever: inputLevel,
        }
        let taskList = loadLocalStogare()
        taskList.push(obj)
        saveLocalStogare(taskList)
        showTaskList(taskList)
    } else {
        let taskList = loadLocalStogare()
        for (i of taskList) {
            if (i.id == id) {
                let inputName = document.getElementById('input-name').value;
                let inputLevel = document.getElementById('input-level').value;
                i.task = inputName
                i.lever = inputLevel
                saveLocalStogare(taskList)
                id = ""
                break;
            }


        }
        showTaskList(taskList)

    }
})

document.addEventListener("click", function(e) {
    edit = e.target;
    let taskList = loadLocalStogare()
    if (edit.classList.contains("btn-edit")) {
        id = edit.getAttribute("data-id")
        let addTask = areaForm.classList.contains('d-none')
        if (addTask == true) {
            areaForm.classList.remove('d-none')
            toggle.innerText = ("close")
            toggle.classList.remove('bg-info')
            toggle.classList.add('bg-danger')
        }
        let test = taskList.find(function(item) {
            return item.id == id
        })
        document.getElementById('input-name').value = test.task
        document.getElementById('input-level').value = test.lever
    }
})

let go = document.getElementById("btn-search")
go.addEventListener("click", function() {
    let search = document.getElementById("search").value
    let taskList = loadLocalStogare()
    let test2 = taskList.filter(function(valueTask) {
        return valueTask.task.includes(search)
    })
    showTaskList(test2)

})


let ASC = document.getElementById("ASC")
ASC.addEventListener("click", function() {
    function compare(a, b) {
        if (a.task < b.task) {
            return -1;
        }
        if (a.task > b.task) {
            return 1;
        }
        return 0;
    }
    let taskList = loadLocalStogare()
    taskList.sort(compare);
    console.log(taskList.sort(compare))
    saveLocalStogare(taskList)
    showTaskList(taskList)
})

let DESC = document.getElementById("DESC")
DESC.addEventListener("click", function() {
    function compare(a, b) {
        if (a.task > b.task) {
            return -1;
        }
        if (a.task < b.task) {
            return 1;
        }
        return 0;
    }
    let taskList = loadLocalStogare()
    taskList.sort(compare);
    console.log(taskList.sort(compare))
    showTaskList(taskList)
    let nameSort = document.getElementById("sort")
    nameSort.innerText = "NAME - DESC"
})

let leverAsc = document.getElementById("lever-asc")
leverAsc.addEventListener("click", function() {
    function compare(a, b) {
        if (a.lever < b.lever) {
            return -1;
        }
        if (a.lever > b.lever) {
            return 1;
        }
        return 0;
    }
    let taskList = loadLocalStogare()
    taskList.sort(compare);
    console.log(taskList.sort(compare))
    saveLocalStogare(taskList)
    showTaskList(taskList)
    let nameSort = document.getElementById("sort")
    nameSort.innerText = "LEVER - ASC"
})

let leverDesc = document.getElementById("lever-desc")
leverDesc.addEventListener("click", function() {
    function compare(a, b) {
        if (a.lever > b.lever) {
            return -1;
        }
        if (a.lever < b.lever) {
            return 1;
        }
        return 0;
    }
    let taskList = loadLocalStogare()
    taskList.sort(compare);
    console.log(taskList.sort(compare))
    showTaskList(taskList)
    let nameSort = document.getElementById("sort")
    nameSort.innerText = "LEVER - DESC"
})