export function getPublicMutations (classType) {
    var mutationNames = new classType({}).public

    if (!mutationNames || !(mutationNames instanceof Array))
        throw new `class ${classType} doesn't have a list of mutations to return as public`

    var dict = {};
    mutationNames.forEach((mutationName) => {
        dict[mutationName] = function (state, payload) {
            var instance = new classType(state);
            instance[mutationName](payload);
        };
    });
    return dict;
}
