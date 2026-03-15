// Hold our diary entries locally
export let data = [];

// Get data from datastore
export function getData() {
    return data;
}

// Replace stored data with updated entries
export function setData(newData) {
    data = newData;
}