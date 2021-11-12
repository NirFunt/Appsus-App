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
  toogleDone,
  changeNoteColor,
  changePinned,
  getEmptyTxtNote,
  getEmptyImgNote,
  getEmptyVideoNote,
  getEmptyTodosNote,
  getEmptyTodo
}

const NOTES_KEY = 'notes';
var notes;
_createNotes();



function query(filterBy = null) {
  return asyncStorageService.query(NOTES_KEY)
    .then(notes => {
      if (!filterBy) return notes
      const SearchedStr = filterBy.name.toLowerCase();
      // console.log(notes)
      return notes.filter(note => {
        if (note.info.title) return note.info.title.toLowerCase().includes(SearchedStr);
        if (note.info.label) return note.info.label.toLowerCase().includes(SearchedStr);
      })
    })
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

function addNote(note) {
  return asyncStorageService.post(NOTES_KEY, note);
}

function saveNote(note) {
  return asyncStorageService.put(NOTES_KEY, note);
}

function removeToDo({ noteId, todoId }) {
  return getNoteById(noteId)
    .then(note => {
      const index = note.info.todos.findIndex(todo => todo.id === todoId)
      note.info.todos.splice(index, 1);
      saveNote(note);
    }
    )
}

function toogleDone(noteId, todoId) {
  return getNoteById(noteId)
    .then(note => {
      const index = note.info.todos.findIndex(todo => todo.id === todoId);
      if (note.info.todos[index].doneAt) note.info.todos[index].doneAt = null;
      else note.info.todos[index].doneAt = Date.now();
      saveNote(note);
    }
    )
}

function changeNoteColor(noteId, color) {
  return getNoteById(noteId)
    .then(note => {
      note.info.color = color;
      saveNote(note);
    }
    )
}

function changePinned(noteId) {
  return getNoteById(noteId)
    .then(note => {
      note.isPinned = !note.isPinned;
      saveNote(note);
    }
    )
}

function getEmptyTxtNote() {
  const noteTxt = {
    id: utilService.makeId(),
    type: "note-txt",
    isPinned: false,
    info: {
      title: '',
      txt: "",
      color: 'bcg-purple'
    }
  }
  return noteTxt;
}

function getEmptyImgNote() {
  const noteImg = {
    id: utilService.makeId(),
    type: "note-img",
    isPinned: false,
    info: {
      url: "",
      title: "",
      color: 'bcg-purple'
    }
  }
  return noteImg;
}

function getEmptyVideoNote() {
  const noteVideo = {
    id: utilService.makeId(),
    type: "note-video",
    isPinned: false,
    info: {
      label: "",
      url: 'https://www.youtube.com/embed/'
      , color: 'bcg-purple'
    }
  }
  return noteVideo;
}

function getEmptyTodosNote() {
  const noteTodos = {
    id: utilService.makeId(),
    type: "note-todos",
    isPinned: false,
    info: {
      label: "",
      color: '',
      todos: []
    }
  }
  return noteTodos;
}

function getEmptyTodo() {
  const todo = {
    id: utilService.makeId(),
    txt: "",
    doneAt: Date.now(),
  }
  return todo;
}



function _createNotes() {
  notes = storageService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        "id": "A94Vj",
        "type": "note-txt",
        "isPinned": true,
        "info": {
          "title": "Important Note",
          "txt": "Go To the Gym",
          "color": "bcg-light-green"
        }
      },
      {
        "id": "aQZ3x",
        "type": "note-todos",
        "isPinned": true,
        "info": {
          "label": "Animals List",
          "color": "bcg-blue",
          "todos": [
            {
              "id": "sKox0",
              "txt": "Cat",
              "doneAt": 1636715741046
            },
            {
              "id": "PqnJ9",
              "txt": "Dog",
              "doneAt": 1636715745982
            },
            {
              "id": "dut3m",
              "txt": "Horse",
              "doneAt": 1636715749854
            }
          ]
        }
      },
      {
        "id": "BWlUm",
        "type": "note-img",
        "isPinned": true,
        "info": {
          "url": "https://c4.wallpaperflare.com/wallpaper/415/195/652/spots-reflections-soft-light-wallpaper-preview.jpg",
          "title": "Nice Image",
          "color": "bcg-green"
        }
      },
      {
        "id": "uGpc4",
        "type": "note-todos",
        "isPinned": true,
        "info": {
          "label": "Shop List",
          "color": "bcg-turquoise",
          "todos": [
            {
              "id": "XgjhD",
              "txt": "item 1",
              "doneAt": 1636715838394
            },
            {
              "id": "2HxgJ",
              "txt": "item 2",
              "doneAt": 1636715844376
            },
            {
              "id": "FCR5v",
              "txt": "item 3",
              "doneAt": 1636715847192
            },
            {
              "id": "yfSt0",
              "txt": "item 4",
              "doneAt": 1636715850183
            },
            {
              "id": "XjGXJ",
              "txt": "item 5",
              "doneAt": 1636715853284
            }
          ]
        }
      },
      {
        "id": "bzxgN",
        "type": "note-video",
        "isPinned": true,
        "info": {
          "label": "Bohemian Rhapsody The Muppets",
          "url": "https://www.youtube.com/embed/tgbNymZ7vqY",
          "color": "bcg-light-green"
        }
      },
      {
        "id": "07sLm",
        "type": "note-img",
        "isPinned": true,
        "info": {
          "url": "https://www.nasa.gov/sites/default/files/styles/image_card_4x3_ratio/public/thumbnails/image/halloween_sun_2014_2k.jpg",
          "title": "Image of the Sun",
          "color": "bcg-purple"
        }
      },
      {
        "id": "WHBgM",
        "type": "note-video",
        "isPinned": true,
        "info": {
          "label": "Michael Kiwanuka - Cold Little Heart ",
          "url": "https://www.youtube.com/embed/nOubjLM9Cbc",
          "color": "bcg-purple"
        }
      },
      {
        "id": "SpBJt",
        "type": "note-img",
        "isPinned": false,
        "info": {
          "url": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
          "title": "Great Sunset",
          "color": "bcg-light-green"
        }
      },
      {
        "id": "AaMyv",
        "type": "note-video",
        "isPinned": false,
        "info": {
          "label": "Journey - Separate Ways",
          "url": "https://www.youtubel.com/embed/LatorN4P9aA",
          "color": "bcg-purple"
        }
      },
      {
        "id": "H8NwV",
        "type": "note-todos",
        "isPinned": false,
        "info": {
          "label": "Grocery List",
          "color": "bcg-light-green",
          "todos": [
            {
              "id": "813Rw",
              "txt": "Milk",
              "doneAt": 1636716022539
            },
            {
              "id": "IM7cw",
              "txt": "Sugar",
              "doneAt": 1636716062400
            },
            {
              "id": "LUUj9",
              "txt": "Coffee",
              "doneAt": 1636716065758
            },
            {
              "id": "Ph2sP",
              "txt": "Pasta",
              "doneAt": 1636716071428
            },
            {
              "id": "DmAaJ",
              "txt": "Butter",
              "doneAt": 1636716074448
            },
            {
              "id": "B0dpa",
              "txt": "Tomatoes ",
              "doneAt": 1636716082496
            }
          ]
        }
      },
      {
        "id": "MgefQ",
        "type": "note-txt",
        "isPinned": false,
        "info": {
          "title": "Play Guitar",
          "txt": "Play all loved songs and practice the beat",
          "color": "bcg-turquoise"
        }
      },
      {
        "id": "8a8cD",
        "type": "note-img",
        "isPinned": false,
        "info": {
          "url": "https://c4.wallpaperflare.com/wallpaper/415/195/652/spots-reflections-soft-light-wallpaper-preview.jpg",
          "title": "Water Image",
          "color": "bcg-light-green"
        }
      },
      {
        "id": "C49Am",
        "type": "note-video",
        "isPinned": false,
        "info": {
          "label": "Funny Video",
          "url": "https://www.youtube.com/embed/vjoKyj51o_I",
          "color": "bcg-purple"
        }
      },
      {
        "id": "ie2ry",
        "type": "note-img",
        "isPinned": false,
        "info": {
          "url": "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          "title": "Fether",
          "color": "bcg-blue"
        }
      },
      {
        "id": "JHzsK",
        "type": "note-img",
        "isPinned": false,
        "info": {
          "url": "https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=20&m=1057506940&s=612x612&w=0&h=3j5EA6YFVg3q-laNqTGtLxfCKVR3_o6gcVZZseNaWGk=",
          "title": "Colors",
          "color": "bcg-green"
        }
      },
      {
        "id": "a9Xp0",
        "type": "note-video",
        "isPinned": false,
        "info": {
          "label": "Michael Kiwanuka - Love & Hate",
          "url": "https://www.youtube.com/embed/aMZ4QL0orw0",
          "color": "bcg-purple"
        }
      }
    ]
  }
  storageService.saveToStorage(NOTES_KEY, notes);
  return notes;
}



