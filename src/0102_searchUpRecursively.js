Hood.internal.searchUpRecursively = function (target, attrList) {
    // target <HTMLElement>: Search since which element
    // attrList <Array>: List of attributes
    let resultObj = {};
    let resultObj_foundFlag = {};
    let targetPtr = target;
    attrList.map(function (attr) {
        resultObj[attr] = null;
        resultObj_foundFlag[attr] = false;
    });
    for (let i = 0; i < 99; i++) {
        attrList.map(function (attr) {
            if (resultObj_foundFlag[attr] === false && targetPtr.getAttribute(attr)) {
                resultObj[attr] = targetPtr.getAttribute(attr);
                resultObj_foundFlag[attr] = true;
            };
        });
        if (targetPtr.parentElement) {
            // console.log(`Attempt ${i} did not match enough`);
            targetPtr = targetPtr.parentElement;
        } else {
            return resultObj;
        };
    };
    console.error(`[ERROR] Exhausted all 99 attempts when searching attributes.`);
    resultObj.isFalsePositive = true;
    return resultObj;
};
