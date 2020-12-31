var function_list = {}

function_list.removeElementFromArray = function (array, find) {
    const index = array.indexOf(find);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array
}

function_list.randomString = function (length) {
    if (!length) {
        length = 33
    }
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = function_list