document.body.addEventListener('input', Hood.internal.generateRawEventHandler('input'));

// NOTE: Click events should be handled by each DOM element, which declares a method name for the click event
document.body.addEventListener('click', function (e) {
    let rawTarget = e.target;
    let searchQuery = Hood.internal.searchUpRecursively(rawTarget, ['hood-fd', 'hood-click']);
    if (searchQuery['hood-fd'] === null || searchQuery['hood-click'] === null) {
        console.log(`False positive click!`);
    } else {
        let fd = searchQuery['hood-fd'];
        let methodName = searchQuery['hood-click'];
        Hood.call(parseInt(fd), methodName);
    };
});

// NOTE: Focus & Blur cannot be bubbled so they are captured in other ways
