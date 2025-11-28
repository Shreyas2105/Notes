function $(id){ return document.getElementById(id); }

function showPopup(msg, type="success") {
  const p = $("popup");
  $("popupText").textContent = msg;

  p.className = "popup show";
  if(type === "error") p.classList.add("error");

  setTimeout(() => p.className = "popup hidden", 1500);
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const container = $("notesContainer");

  container.innerHTML = "";

  if(notes.length === 0){
    container.innerHTML = "<p>No notes yet.</p>";
    return;
  }

  notes.forEach((n, i) => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
      <p class="note-title">${n.title}</p>
      <p class="note-content">${n.content}</p>

      <div class="note-buttons">
        <button class="btn-edit" onclick="editNote(${i})">Edit</button>
        <button class="btn-delete" onclick="deleteNote(${i})">Delete</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function addNote(){
  const title = $("title").value.trim();
  const content = $("content").value.trim();

  if(!title || !content){
    showPopup("Enter title & content", "error");
    return;
  }

  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push({ title, content });

  localStorage.setItem("notes", JSON.stringify(notes));

  $("title").value = "";
  $("content").value = "";

  showPopup("Note added!");
  loadNotes();
}

function deleteNote(i){
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(i, 1);

  localStorage.setItem("notes", JSON.stringify(notes));
  showPopup("Deleted!", "error");
  loadNotes();
}

function editNote(i){
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  const newTitle = prompt("Edit title:", notes[i].title);
  const newContent = prompt("Edit content:", notes[i].content);

  if(newTitle !== null && newContent !== null){
    notes[i].title = newTitle;
    notes[i].content = newContent;

    localStorage.setItem("notes", JSON.stringify(notes));
    showPopup("Updated!");
    loadNotes();
  }
}

function searchNotes(){
  const term = $("search").value.toLowerCase();

  document.querySelectorAll(".note").forEach(note => {
    note.style.display = note.innerText.toLowerCase().includes(term) ? "" : "none";
  });
}

document.addEventListener("DOMContentLoaded", loadNotes);
