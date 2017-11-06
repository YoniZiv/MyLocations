import * as _ from "lodash";

export const validateFields = (fieldsContent) => {
    // switch (entityType) {
    //     case 'category': {
    //         _.isEmpty(fieldsContent.catName) ? invalidsArray.push('catName') : null;
    //         break;
    //     }
    //     case 'location': {
    const invalidsArray = Object.keys(fieldsContent).filter(key => {
        return _.isEmpty(fieldsContent[key])
    });
    //     break;
    // }
    return invalidsArray;

}