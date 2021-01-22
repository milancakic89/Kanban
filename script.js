
//Here are the elements that will be used for drag and drop

const ulElems = document.querySelectorAll('.list');
const backLogUl = document.querySelector('.backlog-list');
const progressUl = document.querySelector('.progress-list');
const completeUl = document.querySelector('.complete-list');
const onHoldUl = document.querySelector('.on-hold-list');


// This variable will become draged element once we start draging

let tempEl;

//4 arrays for 4 ul lists to hold items

const backlog = [];
const progress = [];
const complete = [];
const onHold = [];


/** 
* * setup
* ? Adding dragover and drop event for each ul list
* ? We need to configure each ul list to accept draged item
* ? By default, this is not posible, so we need to prevent default behavior later
*/


function setup(){
    backLogUl.addEventListener('dragover', allowDrop);
    progressUl.addEventListener('dragover', allowDrop);
    completeUl.addEventListener('dragover', allowDrop);
    onHoldUl.addEventListener('dragover', allowDrop);

    backLogUl.addEventListener('drop', drop);
    progressUl.addEventListener('drop', drop);
    completeUl.addEventListener('drop', drop);
    onHoldUl.addEventListener('drop', drop);
}


/** 
* * createLiElement
* @param textContent The text we want for created li element
* ? This function creates new li element, and adds draggable atribute to it
* ? Every li element must have this atribute in order to be dragged
*/


function createLiElement(textContent){
    let el = document.createElement('li');
    el.classList.add('item');
    el.draggable = true;
    el.textContent = textContent;
    el.addEventListener('dragstart', drag);
    backLogUl.appendChild(el);
    return el;
}

/** 
* * drag
* @param e Event that triggers when we start draging item
* ? This event is holding dragged item as a target
* ? Now we set tempEl to be that item, we need that for later
*/


function drag(e){
    tempEl = e.target;
}


/** 
* * allowDrop
* @param e Event that triggers when we enter the ul list
* ? We just need to prevent default behavior of ul list
* ? List will now show that dragged item can be droped inside ul list
*/


function allowDrop(e){
    e.preventDefault();
}


/** 
* * drop
* @param e Event that triggers when we release dragged item
* ! Event triggers when we release the item, event target is the element
* ! we are releasing to, not the element we are dragging
* ! That is why we stored dragged item first
* ? Just like we show that ul list can accept dragged item
* ? Now we need to accept it also, and that is also not a default behavior
*/


function drop(e){
    e.preventDefault();
    let id = e.target.id;
    if(!e.target.id){
        id = e.target.parentElement.id;
    }
    // This event holds item of ul list that accepts draged item, so we can extract id
    pushToArray(id)
}


/** 
* * pushToArray
* @param id Each ul list has corresponding id, We use this id to indentify the correct array (4 empty on top)
* ? We push text content of dragged item into correct array
*/

function pushToArray(id){
    const item = tempEl;
    if(id == backLogUl.getAttribute('id')){
        backlog.push(item.textContent);
        console.log(backlog)
        return;
    }
    if(id == progressUl.getAttribute('id')){
        progress.push(item.textContent);
        console.log(progress)
        return;
    }
    if(id == completeUl.getAttribute('id')){
       return complete.push(item.textContent);
    }
    if(id == onHoldUl.getAttribute('id')){
       return onHold.push(item.textContent);ss
    }
}

//
setup();
