"use strict";

// window.onLoad = function() {
console.log("Hello from custom.js");

// const client = require('filestack-js').init('filestackToken');

const client = filestack.init(filestackToken);
const options = {
    onUploadDone: updateForm,
    maxSize: 10 * 1024 * 1024,
    accept: 'image/*',
    uploadInBackground: false
};

const picker = client.picker(options);

// get DOM elements

const form = document.getElementById('form-pick');
const fileInput = document.getElementById('fileupload');
const pickerBtn = document.getElementById('picker');
const nameBox = document.getElementById('nameBox');
const urlBox = document.getElementById('urlBox');
const imageUrl = document.getElementById('imageURL');

// add event listeners

pickerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    picker.open();
    console.log("hello from picker btn");
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Submitting: ' + fileInput.value)
});

// Helper to overwrite input value

function updateForm (result) {
    const fileData = result.filesUploaded[0];
    fileInput.value = fileData.url;
    imageUrl.value = fileInput.value;
    const name = document.createTextNode('Selected: ' + fileData.filename);
    const url = document.createElement('a');
    url.href = fileData.url;
    url.appendChild(document.createTextNode(fileData.url));
    nameBox.appendChild(name);
    urlBox.appendChild(document.createTextNode('Upload to: '));
    urlBox.appendChild(url);
}