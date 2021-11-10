import { asyncStorageService } from './async-storage-service.js';
import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const noteService = {
  query,
  removeNote,
  getNoteById,
  editNote,
  addNote,
  removeToDo,
  toogleDone
}

const NOTES_KEY = 'notes';
// var googleBooksCache = {};
// var lastUpdate = Date.now();
var notes;
_createNotes();



function query() {
  return asyncStorageService.query(NOTES_KEY);
  // return Promise.resolve(notes);
}

function removeNote(noteId) {
  return asyncStorageService.remove(NOTES_KEY, noteId);
}

function getNoteById(noteId) {
  return asyncStorageService.get(NOTES_KEY, noteId)
}

function editNote(note) {
  return asyncStorageService.put(NOTES_KEY, note)
}

function addNote() {
  var note = {

  }
  asyncStorageService.post(NOTES_KEY, notes);
}

function saveNote (note) {
  return asyncStorageService.put(NOTES_KEY,note);
}

function removeToDo ({noteId, todoId}) {
  // console.log(noteId,todoId)
  return getNoteById(noteId)
  .then (note => {
    const index = note.info.todos.findIndex(todo => todo.id === todoId)
    note.info.todos.splice(index,1);
    saveNote(note);
  }
  )
}

function toogleDone ({noteId, todoId}) {
  return getNoteById(noteId)
  .then (note => {
    const index = note.info.todos.findIndex(todo => todo.id === todoId);
    console.log(note.info.todos[index].dontAt)
    if(note.info.todos[index].dontAt) note.info.todos[index].dontAt = null;
    else note.info.todos[index].dontAt = Date.now();
    saveNote(note);
  }
  )
}

function _createNotes() {
  notes = storageService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: utilService.makeId(), type: "note-txt", isPinned: true, info: {
          txt: "Fullstack Me Baby!"
        }
      },
      {
        id: utilService.makeId(), type: "note-img", info: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
           title: "Bobi and Me"
        },
        style: {
          backgroundColor: "#00d"
        }
      },
      {
        id: utilService.makeId(), type: "note-todos", info: {
          label: "Get my stuff together", todos: [
            { id:utilService.makeId(), txt: "Driving liscence", doneAt: null },
            { id:utilService.makeId(), txt: "aaaaa", doneAt: null },
            { id:utilService.makeId(), txt: "Coding power", doneAt: 187111111 },
            { id:utilService.makeId(), txt: "ccccc", doneAt: 187111111 }]
        }
      },
      {
        id: utilService.makeId(), type: "note-video", info: {
          label: "This Video",  url:'https://www.youtube.com/embed/tgbNymZ7vqY'
        }
      }
    ];

  }
  storageService.saveToStorage(NOTES_KEY, notes);
  return notes;
}





// function getFromAPI(server,input) {
//   if (Date.now()- lastUpdate <1000*10) {
//     if (googleBooksCache[input]) {
//       console.log('takin data from cache')
//       storageService.save(input, googleBooksCache[input]);
//       return Promise.resolve(googleBooksCache[input]);
//     }

//     const googlebooks = storageService.load(input);
//     if (googlebooks ) {
//       googleBooksCache[input] = googlebooks;
//       console.log('taking data from local storage');
//       return Promise.resolve(googleBooksCache[input]);
//     }
//   } else {

//     if (!googleBooksCache[input]) {
//       console.log('taking data from server');
//       lastUpdate = Date.now();
//       const prm = axios.get(server)
//         .then(res => {
//           console.log('Axios Res:', res);
//           googleBooksCache[input] = res.data;
//           console.log(googleBooksCache[input]);
//           return res.data
//         })
//         .catch(err => {
//           console.log('Had issues talking to server', err);
//         })
//         .finally(() => {
//           console.log('Finally always run');
//         })
//       return prm;
//     }
//    }

// }