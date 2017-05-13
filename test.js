function Task(name,start,length) {
    var name = name;
    var start = start;
    var length = length;

    this.getName = function () { return name; }

    this.isFinished = function () { if((start+length) <= Date.now()) return true; }

}




QUnit.test("hello test", function (assert) {

    var start = new Date(2014, 10, 17, 14, 29, 50);


    var task = new Task("short", start, start+5);
    assert.ok(1 == "1", "Passed!");
    assert.ok(task.getName() == "short", "Name is ok!");
    assert.ok(task.isFinished()==true,"Task is finished")

  //  assert.ok(task.start == start, "start sie zgadza!");
    // assert.ok(task.length == start+5, "length sie zgadza!");

});