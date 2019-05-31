var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HarknessSchema = new Schema({
    date: String,
    classId: String,
    studentsAbsent: String,
    skills: {
        id: String,
        name: String,
        data: {
            student: String,
            score: String
        }
    }
});

var Harkness = mongoose.model("Harkness", HarknessSchema);
module.exports = Harkness;