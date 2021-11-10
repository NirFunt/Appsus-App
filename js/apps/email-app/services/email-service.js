import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';
import { asyncService } from './async-storage-service.js';

const EMAIL_KEY = 'emails';
// _createCars();


export const emailService = {
    _createEmails,
    _createEmail
    // query,
    // remove,
    // save,
    // getEmptyCar,
    // getById,
    // getNextCarId
};

const loggedinUser = {
    email: 'sayan123@appsus.com',
    fullname: 'Son Goku'
};


function _createEmails() {
    let emails = storageService.loadFromStorage(EMAIL_KEY);
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_createEmail('We ', 300));
        emails.push(_createEmail('Fiak Ibasa', 120));
        emails.push(_createEmail('Subali Pesha', 100));
        emails.push(_createEmail('Mitsu Bashi', 150));
        emails.push(_createEmail('Mitsu Bashi', 150));
        emails.push(_createEmail('Mitsu Bashi', 150));
        emails.push(_createEmail('Mitsu Bashi', 150));
        emails.push(_createEmail('Mitsu Bashi', 150));
        storageService.saveToStorage(EMAIL_KEY, cars);
    }
    return emails;
}

function _createEmail(subject, body) {
    return email = {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        to: 'sayan123@appsus.com'
    }

}




// function query(filterBy = {}) {
//     return asyncService.query(CARS_KEY)
//         .then(cars => {
//             if (filterBy.topCars) {
//                 cars = cars.slice(0, 2);
//             }
//             return cars;
//         });
// }

// function remove(carId) {
//     // return Promise.reject('Big balagan!')
//     return asyncService.remove(CARS_KEY, carId);
// }

// function save(car) {
//     if (car.id) return asyncService.put(CARS_KEY, car);
//     else return asyncService.post(CARS_KEY, car);
// }

// function getById(carId) {
//     return asyncService.get(CARS_KEY, carId);
// }

// function getNextCarId(carId) {
//     return query()
//         .then(cars => {
//             const idx = cars.findIndex(car => car.id === carId);
//             return (idx === cars.length - 1) ? cars[0].id : cars[idx + 1].id;
//         });
// }

// function getEmptyCar() {
//     return {
//         id: '',
//         vendor: '',
//         maxSpeed: 0
//     };
// }

// function _createCars() {
//     let cars = utilService.loadFromStorage(CARS_KEY);
//     if (!cars || !cars.length) {
//         cars = [];
//         cars.push(_createCar('Audu Mea', 300));
//         cars.push(_createCar('Fiak Ibasa', 120));
//         cars.push(_createCar('Subali Pesha', 100));
//         cars.push(_createCar('Mitsu Bashi', 150));
//         utilService.saveToStorage(CARS_KEY, cars);
//     }
//     return cars;
// }

// function _createCar(vendor, maxSpeed = 250) {
//     const car = {
//         id: utilService.makeId(),
//         vendor,
//         maxSpeed,
//     };
//     return car;
// }




