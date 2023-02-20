const draggables = document.querySelectorAll(".task")
const droppables = document.querySelectorAll(".todo-column")

function manageDraggingClass(task,action){
    if(action=="add"){
        console.log(task)

        task.classList.add('dragging')
    }
    if(action=="remove"){
        task.classList.remove('dragging')
    }
}
//find the closest task below the mouse
function insertAboveTask(zone,mouseY){
    const els = zone.querySelectorAll(".task:not(.dragging)")

    let closestTask = null
    let closestOffset = -Infinity

    els.forEach(task=> {
        const { top } = task.getBoundingClientRect() 
        const offset = mouseY - top;
        // console.log(`top: ${top}::: mouseY: ${mouseY}::::offset:${offset}`)
        if (offset < 0 && offset > closestOffset){
            closestOffset = offset
            closestTask = task
        }
    })
    return closestTask
}
draggables.forEach(task=>{
    task.addEventListener("dragstart",()=>manageDraggingClass(task,"add"))
    task.addEventListener("dragend",()=>manageDraggingClass(task,"remove"))
})

droppables.forEach(zone=>{
    zone.addEventListener("dragover", (e=>{
        e.preventDefault()
        let currentTask = document.querySelector(".dragging")
        let bottomTask = insertAboveTask(zone,e.clientY)

        if(!bottomTask){
            zone.appendChild(currentTask)
        }
        else {
            zone.insertBefore(currentTask,bottomTask)
        }
    }))
})
const todoForm = document.querySelector("#todo-form")
const input = document.querySelector()
todoForm.addEventListener('submit',(e)=>{
    e.preventDefault()
})