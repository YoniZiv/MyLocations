import { isEmpty } from 'lodash';

// Fields Validation method. Returns fields that came in empty
export const validateFields = ( fieldsContent ) => {
    return Object.keys( fieldsContent ).filter( key => {
        return isEmpty( fieldsContent[ key ] )
    } );
}

