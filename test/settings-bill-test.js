let assert = require("assert");
const SettingsWithBill = require("../settings-bills-logic");
//const settingsWithBill = settingsBill()

describe(' settingsBill function', function() {

  it('should test an amount of a call and return a total', function() {
   var settingsBill = SettingsWithBill();
   settingsBill.setCriticalLevel(10)
   settingsBill.setCall(2.75)
   settingsBill.calcBill('call');

  assert.equal(settingsBill.getcall(), 2.75);

 });

  it('should test an amount of an sms and return a total', function() {
    var settingsBill = SettingsWithBill();
    settingsBill.setCriticalLevel(10)

    settingsBill.setSms(0.70)
    settingsBill.calcBill('sms');

    assert.equal(settingsBill.getsms(), 0.70);

  });


  it('Should return the total amount of sms"s combined with calls and return total', function() {
    var settingsBill = SettingsWithBill();
    settingsBill.setCriticalLevel(50);
    settingsBill.setCall(2.75);
    settingsBill.setSms(0.70);

    settingsBill.calcBill('call');
    settingsBill.calcBill('call');
    settingsBill.calcBill('sms');
    settingsBill.calcBill('sms');

    assert.equal(settingsBill.getTotal(), 6.90);

  });

  it('should turn orange when reaches the warning amount', function() {
    var settingsBill = SettingsWithBill();
    settingsBill.setCriticalLevel(50);
    settingsBill.setWarningLevel(30)
    settingsBill.setCall(20);
    settingsBill.setSms(15);
    settingsBill.calcBill('call');
    settingsBill.calcBill('sms');
    assert.equal(settingsBill.getcall(), 20.00);
    assert.equal(settingsBill.getsms(), 15.00);
    assert.equal(settingsBill.getTotal(), 35.00);
    assert.equal(settingsBill.getWaring(), true);


  });

  it('should turn red when it reaches the critacal amount', function() {
    var settingsBill = SettingsWithBill();

    settingsBill.setCriticalLevel(50)
    settingsBill.setCall(20);
    settingsBill.setCall(20);
    settingsBill.setSms(10);
    settingsBill.calcBill('call');
    settingsBill.calcBill('call');
    settingsBill.calcBill('sms');
    assert.equal(settingsBill.getTotal(), 50.00);
    assert.equal(settingsBill.getCritical(), true);

  });


  it('should check that if the critical level total is reached and the critical level is upped that the critical level is no longer stopping the total from increasing', function() {
    var settingsBill = SettingsWithBill();
  
    settingsBill.setCall(20);
    settingsBill.setSms(10);
    settingsBill.setCriticalLevel(90)
    settingsBill.calcBill('call');
    settingsBill.calcBill('call');
    settingsBill.calcBill('call');
    settingsBill.calcBill('sms');
    
    assert.equal(settingsBill.getTotal(), 70.00);
    assert.equal(settingsBill.getCritical(), false);
    settingsBill.setCriticalLevel(80);
     assert.equal(settingsBill.getCritical(), false);
     settingsBill.calcBill('sms');
    assert.equal(settingsBill.getTotal(), 80.00);
  });

});
