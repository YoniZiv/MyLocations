import * as _ from "lodash";

export const validateFields = (fieldsContent, entityType) => {
    let invalidsArray = [];
    switch (entityType) {
        case 'category': {
            _.isEmpty(fieldsContent.catName) ? invalidsArray.push('catName') : null;
            break;
        }
        case 'location': {
            _.isEmpty(fieldsContent.locName) ? invalidsArray.push('locName') : null;
            _.isEmpty(fieldsContent.address) ? invalidsArray.push('address') : null;
            _.isEmpty(fieldsContent.catNames) ? invalidsArray.push('catNames') : null;
            break;
        }
    }
    return invalidsArray;

}