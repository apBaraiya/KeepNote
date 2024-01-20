const buttondiv = document.querySelector("#add");

const updateLSData = () =>{
    const textAreaData = document.querySelectorAll("textarea");
    const notes = [];

    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    })
    console.log(notes);

    localStorage.setItem('notes',JSON.stringify(notes))
}
const createnote = (text = ' ') => {
    const note = document.createElement("div");
    note.classList.add("note");

    const htmldata = `<div class="tools">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>

  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : " "}" ></textarea>`;

    note.insertAdjacentHTML("afterbegin", htmldata);

    
    const editbutton = note.querySelector(".edit");
    const delbutton = note.querySelector(".delete");
    const maindiv = note.querySelector(".main");
    const textArea = note.querySelector("textarea");
    
    // click delete button to delete note
    delbutton.addEventListener("click",()=>{
        note.remove();
        updateLSData();
    });

    // toggle using edit button
    textArea.value = text;
    maindiv.innerHTML = text;
    
    editbutton.addEventListener("click",()=>{
        maindiv.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    })
    
    textArea.addEventListener("change",(event)=>{
        const value = event.target.value;
        maindiv.innerHTML = value;
        
        updateLSData();
    })

    document.body.appendChild(note);
}

// getting data back from localStorage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => createnote(note));
}
buttondiv.addEventListener("click", () => createnote())