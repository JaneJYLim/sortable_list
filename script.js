const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const mostFamousMovie = [
   'Avengers: Endgame' ,
    'Frozen II',
    'Avatar',
    'Aladdin',
    'Avengers: Infinity War',
    'Avengers: Age of Ultron',
    'Interstellar',
    'Frozen',
    'Bohemian Rhapsody',
    'Iron Man 3'
];

//Store listItems
const listItems = [];

let dragStartIndex;

createList();

//리스트 아이템을 DOM에 넣어주기
function createList() {
    //mostFamousMovie를 나열한 후 랜덤으로 섞어줌
    [...mostFamousMovie]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
        .forEach((movie, index) => {
            //li 생성
            const listItem = document.createElement('li');
        
            listItem.setAttribute('data-index', index);
            //li에 span, div, p, i 생성.
            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="movie-name">${movie}</p>
                    <i class='fas fa-arrows-alt-v'></i>
                </div>
                `;
            listItems.push(listItem);
            //ul.draggable_list의 자식요소로 listItem 넣음.
            draggable_list.appendChild(listItem);
        });
    
    addEventListeners();
}

function dragStart() {
    //객체를 드래그하려고 시작할 때, data-index 속성을 얻음.
    dragStartIndex = this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    //마우스가 해당 객체 위로 진입할 때, li에 class over 적용
    this.classList.add('over');
}

function dragLeave() {
    //드래그가 끝나서 마우스가 객체 위에서 벗어날 때, li에 class over 제거
    this.classList.remove('over');
}

function dragOver(e) {
    //드래그하면서 마우스가 해당 객체 위에 자리잡고 있을 때 발생
    e.preventDefault();
    //html요소는 다른요소의 위에 위치할 수 없기 때문에
    //e.preventDefault() 메소드를 호출함으로서 놓일 장소에 있는 요소의 기본동작을 막음.
}

function dragDrop() {
    //드래그가 끝나서 드래그하던 객체를 놓는 장소에 위치한 객체에서 발생.
    const dragEndIndex = this.getAttribute('data-index');
    //드래그가 끝날 때, data-index 속성을 얻음.
    swapItems(dragStartIndex, dragEndIndex);
    //dragStartIndex와 dragEndIndex의 값 변경해주는 함수 실행
    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    //두 li 위치 변경시, 내용 변경.
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

//순서가 맞는지 틀린지 검사
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const movieName = listItem.querySelector('.draggable').innerText.trim();
        
        if (movieName !== mostFamousMovie[index]) {
            //movieName과 mostfamousMovie 각각의 값이 동일하지 않으면,
           listItem.classList.add('wrong') ;
           //class wrong 적용
        }
        else { //movieName과 mostfamousMovie 각각의 값이 동일하다면,
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
            //class wrong 제거하고, class right 적용
        }
    });
}


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })
    
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
      });
    }

check.addEventListener('click', checkOrder);
//체크버튼 클릭시 checkOrder 함수 실행