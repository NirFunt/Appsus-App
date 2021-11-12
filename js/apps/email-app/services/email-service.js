import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';
import { asyncStorageService } from './async-storage-service.js';



export const emailService = {
    _createEmails,
    _createEmail,
    query,
    getById,
    save,
    remove,
    loggedUserQuery
    // getEmptyCar,
    // getNextCarId
};

const EMAIL_KEY = 'emails';
// const USER_KEY = 'user';

const loggedinUser = {
    email: 'sayan123@appsus.com',
    fullname: 'Son Goku'
};

_createEmails()



function _createEmails() {
    let emails = storageService.loadFromStorage(EMAIL_KEY);
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_createEmail('Wedding invitation', 'We are very excited ' + utilService.makeLorem(25), 'avi123@gmail.com', 'inbox'));
        emails.push(_createEmail('Riot Games Presents Arcane', 'Greetings Summoners ' + utilService.makeLorem(45), 'Riotgames@gmail.com', 'inbox'));
        emails.push(_createEmail('Black Friday Sales', 'Available Only For the next 40hours ' + utilService.makeLorem(25), 'asos@world.ol.com', 'inbox'));
        emails.push(_createEmail('Binance Account security', 'We have recently ' + utilService.makeLorem(25), 'binance@service.com', 'inbox'));
        emails.push(_createEmail('Wedding invitation ', utilService.makeLorem(25), 'avi123@gmail.com', 'inbox'));
        emails.push(_createEmail('Wedding invitation ', utilService.makeLorem(25), 'avi123@gmail.com', 'inbox'));
        emails.push(_createEmail('Wedding invitation ', utilService.makeLorem(25), 'avi123@gmail.com', 'inbox'));
        emails.push(_createEmail('Wedding invitation ', utilService.makeLorem(25), 'avi123@gmail.com', 'inbox'));
        emails.push(_createEmail('Wedding invitation ', utilService.makeLorem(25), 'avi123@gmail.com', 'inbox'));
        storageService.saveToStorage(EMAIL_KEY, emails);
    }
    // console.log(emails);
    return emails;
}

function _createEmail(subject, body, from, status) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        status,
        isRead: false,
        isStarred: false,
        isChecked: false,
        sentAt: Date.now(),
        from
    }

}

function query(filterBy = null) {
    return asyncStorageService.query(EMAIL_KEY).then((mails) => {
        if (!filterBy) return mails
        else if (filterBy === 'starred') {
            return mails.filter(email => {
                return email.isStarred;
            })
        }
        else if (filterBy.filterBy === 'txt') {
            console.log('FAFSAFASFA');

            return mails.filter(email => {
                console.log(email.body);
                var words = email.body.split(' ');
                var lowerCaseWords = words.map(word => word.toLowerCase())
                if (lowerCaseWords.includes(filterBy.msg.toLowerCase())) {
                    return email
                }
            })
        }
        return mails.filter(email => {
            return email.status === filterBy
        })
    })
}
function loggedUserQuery() {
    return loggedinUser
}

function getById(emailId) {
    return asyncStorageService.get(EMAIL_KEY, emailId);
}

function remove(emailId) {
    // return Promise.reject('Big balagan!')
    return asyncStorageService.remove(EMAIL_KEY, emailId);
}

function save(email) {
    if (email.id) return asyncStorageService.put(EMAIL_KEY, email);
    else return asyncStorageService.post(EMAIL_KEY, email);
}


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




