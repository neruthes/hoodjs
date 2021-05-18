// =================================
// Basic
// =================================

const Hood = {
    _definedComponents: new Map(),
    _registeredInstances: new Map(),
    _namedInstances: new Map(),
    _registryHeap: 100,
    env: new Map(),
    internal: new Map(),
    instanceMethod: new Map()
};
