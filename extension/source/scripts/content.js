chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = request.data || {};
    var returnString = "Current tab isn\'t a supported Class page.";
    var success = false;

    if ($("body").hasClass("body-Course") &&
    ($(".CourseHeader-left-left-display").children(":first").children(":first").length
    && $(".CourseHeader-left-left-display").children().eq(1).length
    && ($(".RosterBase-item .xds-profpic .xds-screen .xds-profpic").length
    || $(".RosterBase-item .xds-profpic .fa-user-astronaut").length))) {
        var classObj = {};
        classObj.name = $(".CourseHeader-left-left-display").children(":first").children(":first").text();
        classObj.code = $(".CourseHeader-left-left-display").children().eq(1).text();
        classObj.students = [];
        $(".RosterBase-item .xds-profpic .xds-screen .xds-profpic").each(function (i) {
            classObj.students.push({
                name: $(this).attr('alt'),
                picture: $(this).children().first().attr("src")
            })
        });
        $(".RosterBase-item .xds-profpic .fa-user-astronaut").each(function (i) {
            classObj.students.push({
                name: "STUDENT MISSING"
            });
        });

        returnString = "Successfully fetched data.";
        success = true;
        data = {
            status: returnString,
            content: JSON.stringify(classObj, null, 2),
        }
    } else {
        data = {
            status: returnString
        }
    }

    sendResponse({ data: data, success: success });
});