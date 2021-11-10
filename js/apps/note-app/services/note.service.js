import { asyncStorageService } from './async-storage-service.js';
import { storageService } from './storage.service.js';
import { utilService } from './util.service.js';

export const noteService = {
  query,
  removeBook,
  getNoteById,
  editNote,
  addNote,
}

const NOTES_KEY = 'notes';
// var googleBooksCache = {};
// var lastUpdate = Date.now();
var notes;
_createNotes();

function _createNotes() {
  notes = storageService.load(NOTES_KEY)
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
            { txt: "Driving liscence", doneAt: null },
            { txt: "Coding power", doneAt: 187111111 }]
        }
      },
      {
        id: utilService.makeId(), type: "note-video", info: {
          label: "This Video",  url:'https://www.youtube.com/watch?v=pgY7qYaoMWQ'
        }
      }
    ];

  }
  storageService.save(NOTES_KEY, notes);

  return notes;
}

function query() {
  return asyncStorageService.query(NOTES_KEY);
}

function removeBook(noteId) {
  return asyncStorageService.remove(NOTES_KEY, noteId);
}

function getNoteById(noteId) {
  return asyncStorageService.get(NOTES_KEY, noteId)
}

// function getNextBookId(bookId) {
//   return query()
//     .then(books => {
//       const index = books.findIndex(book => book.id === bookId);
//       return (index === books.length -1)? books[0].id: books[index+1].id
//     })
// }

// function getPreviousBookId(bookId) {
//   return query()
//     .then(books => {
//       const index = books.findIndex(book => book.id === bookId);
//       return (index === 0)? books[books.length-1].id: books[index-1].id
//     })
// }

function editNote(note) {
  return asyncStorageService.put(NOTES_KEY, note)
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

function addNote() {
  var book = {

  }
  asyncStorageService.post(NOTES_KEY, notes);
}



