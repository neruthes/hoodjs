document.body.addEventListener('input', Hood.internal.generateRawEventHandler('input'));
document.body.addEventListener('click', Hood.internal.generateRawEventHandler('click'));
// NOTE: Focus & Blur cannot be bubbled so they are captured in other ways
