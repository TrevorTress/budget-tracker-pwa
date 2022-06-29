// create variable to hold db connection
let db

// establish a connection to IndexedDB database called 'budget-tracker' and set to v.1
const request = indexedDB.open('budget-tracker', 1)

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_tracker`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_tracker', { autoIncrement: true });
};

// upon successful request 
request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;
  
    // check if app is online, if yes run function to send all local db data to api
    if (navigator.onLine) {
      // we haven't created this yet
    }
};

// upon failed request
request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

// function will be executed if we attempt to submit tracker and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new-tracker'], 'readwrite');
  
    // access the object store for `new-tracker`
    const trackerObjectStore = transaction.objectStore('new-tracker');
  
    // add record to your store with add method
    trackerObjectStore.add(record);
}