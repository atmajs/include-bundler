// %url%
(function (d) {
    if (d == null) {
        return;
    }
    var s = d.createElement('style');
    s.textContent = '%body%';
    (d.body || d.head).appendChild(s);
}(typeof document === 'undefined' ? null : document));