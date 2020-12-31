'use strict'
/**
 * V1.0 Diego Rivas
 * Controller de catalogo de lenguajes que permite l control de internacionalizacion i18n
 * esta es el controler que permite CRUD de lenguajes para la internacionalizacion i18n
 */

/** llamada al helper que ayuda a crear el constructor basico de operaciones CRUD*/
let basicCrudConstructorHelper = require('./../helpers/basicCrudConstructor.helper')
/** Carga el modelo principal al cual se le ejecutaran las operaciones crud y funciones*/
let model_ = require('./../models/language.model')
/** Se configura el objeto que valida los datos a guardar y o actualizar*/
var validationObject = {
    iso_language_code: 'string,mandatory',
    name: 'string,mandatory'
};
/** Se cargan los modelos secundarios (CHILD) y se configura el arreglo de populates*/
var populate = false;

/** se crean o enlazan las funciones del controller*/
let fucntions = {
    /**
     * Crea un nuevo elemento
     * En el body se encuentran los datos del nuevo elemento a crear
     * */
    createElement: basicCrudConstructorHelper.new(model_, validationObject),
    /**
     * Busca un elemento y lo actualiza o crea  un nuevo elemento
     * En el body se encuentran los datos del nuevo elemento a crear data y con where se hace la busqueda
     * */
    updateOrCreate: basicCrudConstructorHelper.updateOrCreate(model_, validationObject),
    /**
     * Obtiene  la lista de elemetos ya guardados
     * En el query se encuentran lso parametros de busqueda
     * where :object = Elemento por el cual se realizara la busqueda EG. {active:true}
     * paginate:object = limita la  busqueda para la paginacion, limit
     * numero de elementos, page, numero d epagina EG. {limit:10, page:1}
     * sort :object = elementos por los que se ordenara la peticion , [ascending, descending]  EG: {name:'asc',code:'desc}
     * select:String/array = parametros que estarandisponibles en el json (Parent only ) EG. 'name,description' or ['name','description']
     *populate: Array of Objects = No se encuentra en la peticion solo es para porpulacion automatica
     * */
    getAllElements: basicCrudConstructorHelper.listAll(model_, populate),
    /**
     * Obtiene  un elemento de la coleccion filtrado por el id
     * */
    getElementById: basicCrudConstructorHelper.oneById(model_, populate),
    /**
     * Obtiene un elemeto de la coleccion filtrado por busqueda
     * En el query se encuentran lso parametros de busqueda
     * where :object = Elemento por el cual se realizara la busqueda EG. {active:true}
     * select:String/array = parametros que estarandisponibles en el json (Parent only ) EG. 'name,description' or ['name','description']
     *populate: Array of Objects = No se encuentra en la peticion solo es para porpulacion automatica
     * */
    getOneElement: basicCrudConstructorHelper.oneBySearch(model_, populate),
    /**
     * Actualiza un elemento por id
     * los datos se encuentran en el body
     * */
    updateElementById: basicCrudConstructorHelper.idUpdate(model_, validationObject),
    /**
     * Obtiene un elemeto de la coleccion filtrado por busqueda y lo actualiza
     * En el body se encuentran lso parametros de busqueda data y query
     * en query se lo calizan los siguientes parametros
     * where :object = Elemento por el cual se realizara la busqueda EG. {active:true}
     * select:String/array = parametros que estarandisponibles en el json (Parent only ) EG. 'name,description' or ['name','description']
     *populate: Array of Objects = No se encuentra en la peticion solo es para porpulacion automatica
     * */
    findAndUpdateElement: basicCrudConstructorHelper.searchAndUpdate(model_, validationObject, populate),
    /**
     * Elimina un elemento por id
     * los datos se encuentran en el body
     * */
    deleteElementById: basicCrudConstructorHelper.idDelete(model_),

}

module.exports = fucntions;