module.exports = {
    before: function(target, methodName, args) {
        console.log(`Before method ${methodName} called with args:`, args);
    },
    after: function(target, methodName, result) {
        console.log(`After method ${methodName} returned:`, result);
    },
    around: function(target, methodName, args, proceed) {
        console.log(`Around method ${methodName} called with args:`, args);
        const result = proceed();
        console.log(`Around method ${methodName} returned:`, result);
        return result;
    }
};