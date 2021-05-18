Hood.internal.generateRawEventHandler = function (evName) {
    return function (e) {
        let rawTarget = e.target;
        let searchQuery = Hood.internal.searchUpRecursively(rawTarget, ['hood-ev']);
        if (searchQuery.isFalsePositive || searchQuery['hood-ev'] === null) {
            console.log(`False positive click!`);
        } else {
            // Can find someone with 'hood-ev' attribute in the parent chain of rawTarget
            if (searchQuery['hood-ev'].split(' ').indexOf(evName) !== -1) {
                // The 'evName' event should be listened
                // Find fd recursively and call its 'on_${evName}' method
                let resultObj = Hood.internal.searchUpRecursively(rawTarget, ['hood-fd']);
                if (isNaN(parseInt(resultObj['hood-fd']))) {
                    console.error(`[ERROR] Found hood-fd but it is not a valid integer.`);
                    return 1;
                };
                Hood.call(parseInt(resultObj['hood-fd']), `on_${evName}`, {
                    ev: e
                });
            };
        };
    };
};
