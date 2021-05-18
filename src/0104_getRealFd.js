Hood.internal.getRealFd = function (inputFd) {
    if (typeof inputFd === 'number') {
        return inputFd;
    } else {
        return Hood._namedInstances[inputFd];
    };
};
