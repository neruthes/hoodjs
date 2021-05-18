Hood.internal.registerInstance = function (instancePtr) {
    Hood._registryHeap += 1;
    instancePtr.__fd = Hood._registryHeap;
    Hood._registeredInstances[Hood._registryHeap] = instancePtr;
    return Hood._registryHeap;
};
