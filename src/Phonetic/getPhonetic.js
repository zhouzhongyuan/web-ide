import $ from 'jquery';
function getPhonetic(word) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://127.0.0.1:3000/translator',
            type: 'get',
            data: {
                word,
            },
            success(data) {
                resolve(data);
            },
            error(err) {
                reject(err);
            },
        });
    });
}

export default getPhonetic;

