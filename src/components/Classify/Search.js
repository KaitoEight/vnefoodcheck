import data from '../../data/data.json';

const searchInDataJson = (searchValue) => {

    const jsonData = JSON.parse(data);

    const searchResult = jsonData.filter(item => item.someProperty === searchValue);

    return JSON.stringify(searchResult);
}

export default searchInDataJson;
