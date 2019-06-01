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
        name: "STUDENT MISSING (NO IMG)"
    });
});
console.log(JSON.stringify(classObj));

/* EXPORT
{
    "name": "Chemistry",
    "code": "SCH4UAa",
    "students": [
        {
            "name": "Alexander Alexiev",
            "picture": "https://edsbypublicca.blob.core.windows.net/cp1/b311a344685369f1b6b8db43c52127d77977"
        },
        {
            "name": "STUDENT MISSING (NO IMG)"
        }
    ]
}
*/