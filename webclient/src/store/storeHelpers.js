export function getMutations (classType, mutationNames) {
    var dict = {};
    mutationNames.forEach((mutationName) => {
        dict[mutationName] = function (state, payload) {
            var instance = new classType(state);
            instance[mutationName](payload);
        };
    });
    return dict;
}