module.exports = function SettingsWithBill() {

  var callamount = 0;
  var smsamount = 0;
  var totalamount = 0;
  var callcost = 0;
  var smscost = 0;
  var warningLevel = 0;
  var criticalLevel = 0;


  let list = [];
  let temp = [];

  //logic function
  function settingsBill(billText) {
      var settingsItemType = billText;
    console.log('type: ' + settingsItemType);

      if (totalamount >= criticalLevel) {
        var diff = totalamount - criticalLevel;
        smsamount -= diff;
        totalamount -= diff
        
        
        return
      }

      if (settingsItemType === "call") {
        callamount += callcost;


    list.push({
      type: billText,
      cost: getCostCall,
      timestamp: new Date()
    });

      }
      if (totalamount > criticalLevel) {
        var diff = totalamount - criticalLevel;
        callamount -= diff;
      }
      else if (settingsItemType === "sms") {
        smsamount += smscost;

        list.push({
          type: billText,
          cost: getCostSms,
          timestamp: new Date()
        });
      }
      totalamount = callamount + smsamount;
      if (totalamount >= criticalLevel) {
        var diff = totalamount - criticalLevel;
        smsamount -= diff;
        totalamount -= diff
        
        
        return
      }

    
      //totalSettings();
      console.log(totalamount);
    }


    function actionsFor(type){
      const filteredActions = [];

      // loop through all the entries in the action list 
      for (let index = 0; index < list.length; index++) {
          const action = list[index];
          if (action.type === type) {
              
              filteredActions.push(action);
          }
      }

      return filteredActions;

     
  }

  //setters

  function setCostcall(value) {
    callcost = parseFloat(value);
  }

  function setCostsms(value) {
    smscost = parseFloat(value);
  }

  function setWarning(value) {
    warningLevel = value;
  }

  function setCritical(value) {
    criticalLevel = value;
  }

  //getters

  function totalSettings() {

    return (callamount + smsamount).toFixed(2);
  }

  function getCostCall() {

    return callamount.toFixed(2);
  }

  function getCostSms() {
    return smsamount.toFixed(2);
  }

  function getWarningLevel() {
    return warningLevel;
  }

  function getcriticalLevel() {
    return criticalLevel;
  }

  function reachedWarningLevel() {
    return totalSettings() >= warningLevel;
  }

  function reachedCriticalLevel() {
    return totalSettings() >= criticalLevel;
  }


  function action() {
    return list;
  }
  

  function myColor() {
    if(totalamount != 0){
        if (totalamount >= criticalLevel) {
          return "danger";
          
        }
        else if (totalamount >= warningLevel){
          return "warning";
        }
      }
  }

  function filter(list) {
  
  if(costType === list[i].type){
    temp.push(list[i]);
  }
}
  

  function returnValues(){
    return{
      callamount,
      smsamount,
      totalamount,
      callcost,
      smscost,
      warningLevel,
      criticalLevel,
      myColor,
      temp
    };
  }

  

  function reset() {

  var callamount = '';
  var smsamount = '';
  var totalamount = '';
  var callcost = '';
  var smscost = '';
  var warningLevel = '';
  var criticalLevel = '';
    
  }


  return {
    calcBill: settingsBill,
    setCall: setCostcall,
    setSms: setCostsms,
    setWarningLevel: setWarning,
    setCriticalLevel: setCritical,
    getsms: getCostSms,
    getcall: getCostCall,
    getTotal: totalSettings,
    getWaring: reachedWarningLevel,
    getCritical: reachedCriticalLevel,
    allValues:returnValues,
    action,
    reset,
    myColor, 

  };
};

