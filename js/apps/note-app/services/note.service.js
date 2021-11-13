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
  getEmptyTodo,
  duplicateNote,
  getEmptyAudioNote,
  getEmptyCanvasNote
}

const NOTES_KEY = 'notes';
var notes;
_createNotes();


function query(filterBy = null) {
  return asyncStorageService.query(NOTES_KEY)
    .then(notes => {
      if (!filterBy) return notes
      const SearchedStr = filterBy.name.toLowerCase();
      return notes.filter(note => {

        if (note.info.title) if (note.info.title.toLowerCase().includes(SearchedStr)) {
          if ((filterBy.isNoteText && note.type === 'note-txt') ||
            (filterBy.isNoteVideo && note.type === 'note-video') ||
            (filterBy.isNoteImage && note.type === 'note-img') ||
            (filterBy.isNoteTodos && note.type === 'note-todos')) { return true; }
          return false;
        } else return false;

        if (note.info.label) if (note.info.label.toLowerCase().includes(SearchedStr)) {
          if ((filterBy.isNoteText && note.type === 'note-txt') ||
            (filterBy.isNoteVideo && note.type === 'note-video') ||
            (filterBy.isNoteImage && note.type === 'note-img') ||
            (filterBy.isNoteTodos && note.type === 'note-todos')) return true;
          return false;
        } else return false;
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
    } )
}

function duplicateNote (noteId) {
  return getNoteById(noteId)
  .then (note => addNote(note))
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
      color: 'bcg-purple',
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

function getEmptyAudioNote() {
  const noteAudio = {
    id: utilService.makeId(),
    type: "note-audio",
    isPinned: false,
    info: {
      title: "",
      url: ''
      , color: 'bcg-purple'
    }
  }
  return noteAudio;
}

function getEmptyCanvasNote() {
  const noteCanvas = {
    id: utilService.makeId(),
    type: "note-canvas",
    isPinned: false,
    info: {
      title: ""
      , color: 'bcg-purple'
    }
  }
  return noteCanvas;
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
        "id":utilService.makeId(),
        "type": "note-audio",
        "isPinned" :true,
        "info" : {
          "title" : "Led Zeppelin - All My Love",
          "url" : "audio/Led Zeppelin_ All My Love (With Lyrics) (mp3cut.net).mp3",
          "color": "bcg-turquoise"
        }
      },
      {
        "id":utilService.makeId(),
        "type": "note-canvas",
        "isPinned" :true,
        "info" : {
          "title" : "Good canvas",
          "color": "bcg-turquoise"
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
        "id":utilService.makeId(),
        "type": "note-audio",
        "isPinned" :false,
        "info" : {
          "title" : "Nice Song",
          "url" : "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
          "color": "bcg-turquoise"
        }
      },
      {
        "id":utilService.makeId(),
        "type": "note-canvas",
        "isPinned" :false,
        "info" : {
          "title" : "Nice canvas",
          "color": "bcg-turquoise"
        }
      }
    ]
  }
  storageService.saveToStorage(NOTES_KEY, notes);
  return notes;
}



