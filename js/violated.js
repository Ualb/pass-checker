const dictionary1 = "../dictionary/passwords.txt";
const dictionary2 = "../dictionary/passwords2.txt";

async function readFileAsArray(file) {
  let result = [];
  await fetch(file)
      .then(response => response.text())
      .then(text => result = text.split("\n"))
  return result;
}


async function foundInDictionary(dictionaryFilePath, pass) {   
  return (await this.readFileAsArray(dictionaryFilePath)).some(element => element === pass); 
}

async function isExplosed(pass) { 
  if ((await foundInDictionary(dictionary1, pass)) || (await foundInDictionary(dictionary2, pass))) {
    return true;
  }
  return false;
}