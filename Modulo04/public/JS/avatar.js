//background: url(https://source.unsplash.com/collection/1361815/900x1600) no-repeat center center / cover

const inputAvatar = document.querySelector('input[name="avatar_url"]');
const avatar = document.querySelector('.avatar');
const img = document.querySelector('.avatar img');
const verify = document.querySelector('input[name="urlVerify"]');

inputAvatar.addEventListener('focusout', () => {
    testImage(inputAvatar.value, answerTestImage, 1000);
});

function testImage(url, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false,
        timer;
    var img = new Image();
    img.onerror = img.onabort = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, 'error');
        }
    };
    img.onload = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, 'success');
        }
    };
    img.src = url;
    timer = setTimeout(function () {
        timedOut = true;
        img.src = '//!!!!/test.jpg';
        callback(url, 'timeout');
    }, timeout);
}

function answerTestImage(url, result) {
    if (result === 'success') {
        avatar.setAttribute('style', `background: url(${inputAvatar.value}) no-repeat center center / cover`);
        img.style.display = 'none';
        verify.value = true;
    } else {
        avatar.removeAttribute('style', `background: url(${inputAvatar.value}) no-repeat center center / cover`);
        img.style.display = 'block';
        verify.value = false;
    }
}
