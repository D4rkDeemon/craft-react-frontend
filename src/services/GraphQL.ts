const TOKEN = "CvcTgb3odhJpf_sUfn7RU8pOFZardOxO"
const API_URL = 'http://localhost:8080/api';

export async function GetAnimals() {

    let data = await fetchDataFromCraftCMS(`{
        entries(section: "animals") {
            id
            title
            parent {
            id
            }
        }
    }`);

    let animals = data.data.entries;

    let hirarchicalAnimals = [];
    let output = "";

    for (let i = 0; i < animals.length; i++) {
      if (animals[i].parent) {
        if (hirarchicalAnimals[hirarchicalAnimals.length - 1].subEntries) {
          hirarchicalAnimals[hirarchicalAnimals.length - 1].subEntries.push(animals[i]);
        } else {
          hirarchicalAnimals[hirarchicalAnimals.length - 1].subEntries = [animals[i]];
        }
      } else {
        hirarchicalAnimals.push(animals[i]);
      }
    }

    return hirarchicalAnimals;
}


async function fetchDataFromCraftCMS(query: string): Promise<any> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`  
        },
        body: JSON.stringify({
            query: query 
        })
    });

    return await response.json();
}