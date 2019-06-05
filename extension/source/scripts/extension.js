document.addEventListener('DOMContentLoaded', function() {
    $('#status').text("Waiting for user input...");

    var button = document.getElementById('extensionButton');
    button.addEventListener('click', function () {
        $('#output').removeClass('visible');
        var type = $('#status').text();
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {data: type}, function(response) {
                if (response == undefined) {
                    $('#status').text("ERROR: Unable to analyze current tab, try refreshing the page.");
                }
                if (response.success) {
                    $('#status').text(response.data.status);
                    $('#input').addClass('invisible');
                    $('#output').addClass('visible');
                    $('#outputCode').text(response.data.content);
                } else {
                    $('#status').text("ERROR: " + response.data.status);
                }
            });
        });
    });

    var button = document.getElementById('copy');
    button.addEventListener('click', function () {
        const el = document.createElement('textarea');
        el.value = $('#outputCode').text();
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    });
});