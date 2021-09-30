const OCFLTools = {
  cleanPath: function (ocflPath) {
    //TODO: this thing should not be necessary. We need to re-work IDs and resolvers.
    let cleanPath = ocflPath;
    cleanPath = cleanPath.replace(/\//g, '');
    return cleanPath;
  }
}

module.exports = OCFLTools;
