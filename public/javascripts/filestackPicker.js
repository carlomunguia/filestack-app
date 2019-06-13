'use strict';

const client = filestack.init(filestackToken);
const picker = client.picker({
    onUploadDone: updateForm,
    maxSize: 10 * 1024 * 1024,
    uploadInBackground: false
});

// get DOM elements

const pickerBtn = document.getElementById('picker');
const container = document.getElementById('container')

// add event listeners

pickerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    picker.open();
    console.log('this is totally working');
});



// Helper to overwrite input value

function updateForm(result) {

    const fileData = result.filesUploaded[0];
    createAnchor(fileData);

    if (fileData.mimetype.indexOf('image/') === 0) {
        createThumbnail(fileData)
    } else {
        createPreview(fileData);
    }
    console.log(fileData);
}

function getPreviewUrl(fileData) {
    const urlComponents = fileData.url.split('/')
    urlComponents.splice(3, 0, 'preview');
    return urlComponents.join('/');
}

function createAnchor(fileData) {

    const name = document.createElement('div');
    name.textContent = 'Selected: ' + fileData.filename;
    container.appendChild(name);

    const div = document.createElement('div');
    div.appendChild(document.createTextNode('Upload to: '));

    const url = getAnchor(fileData);
    url.textContent = fileData.url;
    div.appendChild(url);
    container.appendChild(div);
}

function createPreview(fileData) {
    const iframe = document.createElement('iframe');
    iframe.src = getPreviewUrl(fileData);
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    container.appendChild(iframe);
}

function createThumbnail(fileData) {
    const anchor = getAnchor(fileData);

    const image = document.createElement('img');
    image.src = fileData.url;
    image.style.maxWidth = '100%';
    anchor.appendChild(image);
    container.appendChild(anchor);
}

function getAnchor(fileData) {
    const url = document.createElement('a');
    url.href = fileData.url;
    return url;
}