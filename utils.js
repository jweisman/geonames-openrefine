

module.exports = {
  /** Chunks array and returns array of arrays of specified size */
  chunk: (inputArray, size) => {
    return inputArray.reduce((all,one,i) => {
      const ch = Math.floor(i/size); 
      all[ch] = [].concat((all[ch]||[]),one); 
      return all;
    }, []);
  },
  /** Asynchronously executes the function for each element in the array */
  asyncForEach: async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}


