
//Here are the elements that will be used for drag and drop

const ulElems = document.querySelectorAll('.list');
const backLogUl = document.querySelector('.backlog-list');
const progressUl = document.querySelector('.progress-list');
const completeUl = document.querySelector('.complete-list');
const onHoldUl = document.querySelector('.on-hold-list');


// This variable will become draged element once we start draging

let tempEl;

//this will become id of list we drag from

let fromListID;

//4 arrays for 4 ul lists to hold items

let backlog = [];
let progress = [];
let complete = [];
let onHold = [];


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

    renderOnce();
}


/** 
* * render
* ? For each array item renders li elemnet
* ? Renders for all for arrays at page load
*/

function renderOnce(){

    if(Array.isArray(backlog) && backlog.length > 0){
        backlog.forEach(item => backLogUl.appendChild(createLiElement(item)))
    }
    if(Array.isArray(progress) && progress.length > 0){
        progress.forEach(item => progressUl.appendChild(createLiElement(item)))
    }
    if(Array.isArray(complete) && complete.length > 0){
        complete.forEach(item => completeUl.appendChild(createLiElement(item)))
    }
    if(Array.isArray(onHold) && onHold.length > 0){
        onHold.forEach(item => onHoldUl.appendChild(createLiElement(item)))
    }

}

/** 
* * reRenderList
* @param id Id of ul list that needs to rerender
* ? This method is called every time on each array that has changes to be updated
* ! This is most called function, any performance improvement is good to implement
*/

function reRenderList(id){
    let list = document.getElementById(id);
    while(list.firstElementChild){
        list.firstElementChild.remove();
    }
    this.forEach(item => list.appendChild(createLiElement(item)));
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
    fromListID = e.target.parentElement.id;
}


/** 
* * allowDrop
* @param e Event that triggers when we enter the ul list
* ? We just need to prevent default behavior of ul list
* ? List will now show that dragged item can be droped inside ul list
* * Adding class for list that will receive item, also removing same class from other lists if any
*/

function allowDrop(e){
    e.preventDefault();
    for(let i = 0; i < ulElems.length; i++){
        ulElems[i].classList.remove('on-hover-column');
    }
    e.target.classList.add('on-hover-column');
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
    e.target.classList.remove('on-hover-column');
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
          reRenderList.call(backlog, id);
          saveToLocalStorage.call(backlog, id);
    }
    if(id == progressUl.getAttribute('id')){
          progress.push(item.textContent);
          reRenderList.call(progress, id);
          saveToLocalStorage.call(progress, id);
    }
    if(id == completeUl.getAttribute('id')){
          complete.push(item.textContent);
          reRenderList.call(complete, id);
          saveToLocalStorage.call(complete, id);
    }
    if(id == onHoldUl.getAttribute('id')){
          onHold.push(item.textContent);
          reRenderList.call(onHold, id);
          saveToLocalStorage.call(onHold, id);
    }
    removeFromArray(fromListID, item.textContent);
}

/** 
* * removeFromArray
* @param arrID ID of ul list that represents the array, 4 possibility can happen (backlog, progress, complete, onHold)
* **           each representing one of the array from above
* @param textMatch Remove item with this text
* ? Once item is dragged from ul list, we need to update the array
* * 
*/

function removeFromArray(arrID, textMatch){
    if(arrID === 'backlog'){
        let index = backlog.indexOf(textMatch);
        backlog.splice(index, 1);
        reRenderList.call(backlog, arrID);
        saveToLocalStorage.call(backlog, arrID);
    }
    if(arrID === 'progress'){
        let index = progress.indexOf(textMatch);
        progress.splice(index, 1);
        reRenderList.call(progress, arrID);
        saveToLocalStorage.call(progress, arrID);
    }
    if(arrID === 'complete'){
        let index = complete.indexOf(textMatch);
        complete.splice(index, 1);
        reRenderList.call(complete, arrID);
        saveToLocalStorage.call(complete, arrID);
    }
    if(arrID === 'on-hold'){
        let index = onHold.indexOf(textMatch);
        onHold.splice(index, 1);
        reRenderList.call(onHold, arrID);
        saveToLocalStorage.call(onHold, arrID);
    }
}

/** 
* * saveToLocalStorage
*  Saving the 4 arrays in local storage
* TODO: We only need to update 2 array here, one we remove from, and one we add to
*/

function saveToLocalStorage(item){
    localStorage.setItem(`${item}`, JSON.stringify(this));
}

/** 
* * getAllFromLocalStorage
* ? Loads only once, just to fetch latest data, if there is any
*/
function getAllFromLocalStorage(){
  backlog  = JSON.parse(localStorage.getItem('backlog')) || [];
  progress  = JSON.parse(localStorage.getItem('progress')) || [];
  complete  = JSON.parse(localStorage.getItem('complete')) || [];
  onHold  = JSON.parse(localStorage.getItem('on-hold')) || [];
}

getAllFromLocalStorage();
setup();
