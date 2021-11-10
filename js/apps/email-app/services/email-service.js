import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';
import { asyncStorageService } from './async-storage-service.js';



export const emailService = {
    _createEmails,
    _createEmail,
    query,
    // remove,
    // save,
    // getEmptyCar,
    // getById,
    // getNextCarId
};

const EMAIL_KEY = 'emails';

const loggedinUser = {
    email: 'sayan123@appsus.com',
    fullname: 'Son Goku'
};

_createEmails()


function _createEmails() {
    let emails = storageService.loadFromStorage(EMAIL_KEY);
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_createEmail('Wedding invitation', 'We are very excited ' + utilService.makeLorem(25), 'avi123@gmail.com'));
        emails.push(_createEmail('Riot Games Presents Arcane', 'Greetins Summoners ' + utilService.makeLorem(45), 'Riotgames@gmail.com'));
        emails.push(_createEmail('Black Friday Sales', 'Available Only For the next 40hours ' + utilService.makeLorem(25), 'asos@world.ol.com'));
        emails.push(_createEmail('Binance Account security', 'We have recently ' + utilService.makeLorem(25), 'binance@service.com'));
        emails.push(_createEmail('Wedding invitation ', utilService.makeLorem(25), 'avi123@gmail.com'));
        emails.push(_createEmail('Wedding invitation ', utilService.makeLorem(25), 'avi123@gmail.com'));
        emails.push(_createEmail('Wedding invitation ', utilService.makeLorem(25), 'avi123@gmail.com'));
        emails.push(_createEmail('Wedding invitation ', utilService.makeLorem(25), 'avi123@gmail.com'));
        emails.push(_createEmail('Wedding invitation ', utilService.makeLorem(25), 'avi123@gmail.com'));
        storageService.saveToStorage(EMAIL_KEY, emails);
    }
    console.log(emails);
    return emails;
}

function _createEmail(subject, body, from) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        from
    }

}

function query(filterBy = {}) {
    return asyncStorageService.query(EMAIL_KEY);
}

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




