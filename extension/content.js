// content.js
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log("something happening from the extension");
    console.log("edsby")
    var data = request.data || {};

    var linksList = document.querySelectorAll('a');
    [].forEach.call(linksList, function(header) {
        header.innerHTML = request.data;
    });
    sendResponse({data: data, success: true});
});

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       if( request.message === "clicked_browser_action" && $("a[href^='http']").eq(0).attr("href").includes("bayviewglen.edsby.com")) { //$("a[href^='http']").eq(0).attr("href").includes("Course")
        
//         console.log($("body").hasClass("body-Course"))
//         alert("on ebdsy");
//       }
//     }
//   );