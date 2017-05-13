/*
* "class" Task realized by using closueres,
* inspired by:
* http://www.w3schools.com/js/js_function_closures.asp
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures
*/


var Task = (function () {

    //"private" fields
    var name;
    var start;
    var length;

    //constructor
    var ctor = function (_name, _start, _lengthInDays) {
        name = _name;
        start = _start;
        length = _lengthInDays;
    }

    //http://stackoverflow.com/questions/7039020/adding-properties-to-prototype-within-the-constructor-function
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype
    //prototypes
    ctor.prototype.getName = function () { return name; };

    ctor.prototype.getDescription = function () { return "Task, name=" + name; };

    ctor.prototype.isFinished = function (date) {
        var endDate = new Date();
        endDate.setDate(start.getDate() + length); //http://stackoverflow.com/questions/563406/add-days-to-datetime
        if (endDate < date)
            return true;
        else
            return false;
    };

    return ctor;//return constructor
})();


var Cost = (function () {

    //constructor
    var ctor = function (_name, _start, _lengthInDays) {
        Task.call(this,_name,_start,_lengthInDays);
        this.getDescription = function () { return "Cost"; };
    }
    ctor.prototype = new Task();

    return ctor;//return constructor
})();


QUnit.test("Test if functions of Task work ok", function (assert) {

    var start = new Date(2014, 10, 17);
    var task = new Cost("short", start, 5);


    assert.ok(task.getName() == "short", "getName() works ok!");

  //  alert(task.getDescription());
    assert.ok(task.getDescription() == "Cost", "getDescription() works ok!");

    var distantTestDate = new Date(2015, 10, 17);
    var tomorrowTestDate = new Date(2014, 10, 18);

    var dayBeforeEndDate = new Date(2014, 10, 21);
    var endDate = new Date(2014, 10, 23);
    var dayAfterEndDate = new Date(2014, 10, 23);

    assert.ok(task.isFinished(distantTestDate) == true, "isFinished(date) - Ok, it's finished for distantTestDate");



    assert.ok(task.isFinished(tomorrowTestDate) == false, "isFinished(date) - Ok, it's shouldnt be finished for tomorrowTestDate");


    assert.ok(task.isFinished(endDate) == true, "isFinished(date) - Ok, it should be finished for endDate");

    assert.ok(task.isFinished(dayAfterEndDate) == true, "isFinished(date) - Ok, it should be finished for dayAfterEndDate");

    assert.ok(task.isFinished(dayBeforeEndDate) == false, "isFinished(date) - Ok, it shouldn't be finished for dayBeforeEndDate");
});

QUnit.test("Test emulation of private variables", function (assert) {

    var start = new Date(2014, 10, 17, 14, 29, 50);
    var task = new Cost("short", start, start + 5);


    assert.ok(task.name == undefined, "name is private");
    assert.ok(task.start == undefined, "start is private");
    assert.ok(task.length == undefined, "length is private");

    //  assert.ok(task.start == start, "start sie zgadza!");
    // assert.ok(task.length == start+5, "length sie zgadza!");

});