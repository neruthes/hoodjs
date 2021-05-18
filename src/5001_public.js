// Define component
Hood.define = function (componentClassName, componentDefinition) {
    Hood._definedComponents[componentClassName] = componentDefinition;
};

// Create component instance
Hood.create = function (componentClassName, src) {
    if (Hood._definedComponents[componentClassName].onceOnly) {
        console.error(`[ERROR] Class can only be used with renderOnce.`);
        return 1;
    };
    let _ni = {
        _src: src, // bind data
        _states: {}, // local states
        _spawnedChildren: new Set()
    };
    _ni._src = src;
    _ni.init = Hood._definedComponents[componentClassName].init;
    _ni.render = Hood._definedComponents[componentClassName].render;
    _ni._rerender = Hood.instanceMethod.rerender;
    Object.keys(Hood._definedComponents[componentClassName].methods).map(function (methodName) {
        _ni[methodName] = Hood._definedComponents[componentClassName].methods[methodName];
    });
    Hood.internal.registerInstance(_ni);
    if (Hood._definedComponents[componentClassName].name) { // Created a named instance
        Hood._namedInstances[Hood._definedComponents[componentClassName].name] = _ni.__fd;
    };
    _ni.init();
    return _ni;
};

// Render once only
Hood.renderOnce = function (componentClassName, src) {
    if (!Hood._definedComponents[componentClassName].onceOnly) {
        console.error(`[ERROR] Class does not support renderOnce.`);
        return 1;
    };
    let _ni = {};
    _ni._src = src;
    if (Hood._definedComponents[componentClassName].init) {
        Hood._definedComponents[componentClassName].init.call(_ni, {});
    };
    return Hood._definedComponents[componentClassName].render.call(_ni, {});
};

// Destroy component instance
Hood.gc = function (fd) {
    let realFd = Hood.internal.getRealFd(fd);
    if (Hood._registeredInstances[realFd]._spawnedChildren.size > 0) {
        Hood._registeredInstances[realFd]._spawnedChildren.forEach(function (childFd) {
            Hood.gc(childFd);
        });
    };
    Hood._registeredInstances[realFd] = null;
};

// Create, and set owner
Hood.spawn = function (componentClassName, src, ownerFd) {
    let ni = Hood.create(componentClassName, src);
    // Register ownership data bidirectionally
    ni._ownerFd = ownerFd;
    Hood._registeredInstances[ownerFd]._spawnedChildren.add(ni.__fd);
    return ni;
};

// Rebind new data to existing instance
Hood.rebind = function (fd, src, options) {
    let realFd = Hood.internal.getRealFd(fd);
    Hood._registeredInstances[realFd]._src = src;
    if (options) {
        if (options.reinit) {
            Hood.call(realFd, 'init');
        };
    };
};

// Call method of instance by fd and methodName
Hood.call = function (fd, methodName, argv) {
    let realFd = Hood.internal.getRealFd(fd);
    let theFunction = Hood._registeredInstances[realFd][methodName];
    if (theFunction) {
        return theFunction.call(Hood._registeredInstances[realFd], argv);
    } else {
        return undefined;
    };
};

// Get and set state of instance by fd and stateName
Hood.getState = function (fd, stateName) {
    let realFd = Hood.internal.getRealFd(fd);
    return Hood._registeredInstances[realFd]._states[stateName];
};
Hood.setState = function (fd, stateName, newValue) {
    let realFd = Hood.internal.getRealFd(fd);
    Hood._registeredInstances[realFd]._states[stateName] = newValue;
};

// Get and set source data of instance by fd and dataKey
Hood.getSrcData = function (fd, dataKey) {
    let realFd = Hood.internal.getRealFd(fd);
    return Hood._registeredInstances[realFd]._src[dataKey];
};
Hood.setSrcData = function (fd, dataKey, newValue) {
    let realFd = Hood.internal.getRealFd(fd);
    Hood._registeredInstances[realFd]._src[dataKey] = newValue;
};
