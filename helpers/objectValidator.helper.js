/**
 * V1.0 Diego Rivas
 * Helper que permite  la validacion de parametros por tipo de un objeto en especifico
 * para las peticiones
 */


module.exports = {

    /** Esta funcion valida objetos de tipo JSON
     * obj =  el objeto a validar
     * params= los parametros a validad con sus caracteristicas dentro de un array
     */
    validateObject: function (obj, params, isPost) {
        let response = {
            success: true,
            messages: []
        };
        if (!obj) {
            response.success = false;
            response.messages.push('Undefined Object');
        }
        if (!params) {
            response.success = false;
            response.messages.push('There are no  params defined');
        }

        for (var [key, value] of Object.entries(params)) {

            if (value && typeof (value) == 'string') {
                value = value.split(',')
            }
            if (isPost) {
                if (!obj[key] && value.includes('mandatory')) {
                    response.success = false;
                    response.messages.push('The parameter ' + key + ' is missing');
                }
            }


            if (obj[key] && value.includes('number') && typeof (obj[key]) !== 'number') {
                response.success = false;
                response.messages.push('The parameter ' + key + ' is not a number');
            }
            if (obj[key] && value.includes('string') && typeof (obj[key]) !== 'string') {
                response.success = false;
                response.messages.push('The parameter ' + key + ' is not a string');
            }
            if (obj[key] && value.includes('boolean') && typeof (obj[key]) !== 'boolean') {
                response.success = false;
                response.messages.push('The parameter ' + key + ' is not a bolean');
            }

            if (obj[key] && value.includes('array') && (typeof (obj[key]) !== 'object' || !Array.isArray(obj[key]))) {
                response.success = false;
                response.messages.push('The parameter ' + key + ' is not an array ');
            }
            if (obj[key] && value.includes('object') && typeof (obj[key]) !== 'object') {
                response.success = false;
                response.messages.push('The parameter ' + key + ' is not an object');
            }
            if (obj[key] && value.includes('function') && typeof (obj[key]) !== 'function') {
                response.success = false;
                response.messages.push('The parameter ' + key + ' is not a function');
            }
        }

        return response;
    },

    /** Esta funcion valida objetos de tipo array
     * array =  el objeto a validar
     * valideIfEmpty= si es verdadero verificara que no este vacio
     */
    validateArray: function (array, valideIfEmpty) {
        let response = {
            success: true,
            messages: []
        }
        if (!array) {
            response.success = false;
            response.messages.push('The array is undefined')
        }

        if (array && (typeof (array) !== 'object' || !Array.isArray(array))) {
            response.success = false;
            response.messages.push('The object  is not an array  is a ', typeof (array));
        }
        if (array && Array.isArray(array) && valideIfEmpty) {
            if (array.length == 0) {
                response.success = false;
                response.messages.push('The array is   empty ');
            }
        }
        return response;
    }
}