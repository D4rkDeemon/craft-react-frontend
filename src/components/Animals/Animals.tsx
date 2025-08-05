import { Button } from "../ui/Button";
import "./Animals.css";
import { GetAnimals } from "../../services/GraphQL";

export function Animals() {
    return (
        <>   
        <Button onClick={LoadAnimals} text="Load Animals" />

            <p>
                Data:
            </p>
            <p 
                id="data-container" 
                style={{
                    display: "flex", 
                    flexDirection: "row", 
                    flexWrap: "wrap"
                }}>
            </p>
        </>
    );
}

function LoadAnimals() {
    const dataContainer = document.getElementById('data-container');
    if (!dataContainer) {
        return;
    }
    
    dataContainer.innerHTML = '<span>Loading...</span>';

    let data = GetAnimals();

    // if (!data) {
    //     dataContainer.innerHTML = '<span>Error loading data</span>';
    //     return;
    // }

    
    // let animals = data.map((animal: any) => animal.title);

    // for (let i = 0; i < hirarchicalAnimals.length; i++) {
    //   output += "<div style='background-color: #27a9f5; flex: 1 0 auto; padding: 1rem; margin: .5rem;'>";
    //   output += '<h3 style="text-align: left;">' + hirarchicalAnimals[i].title + "</h3>";

    //   if (hirarchicalAnimals[i].subEntries) {
    //     output += "<ul>";

    //     for (let j = 0; j < hirarchicalAnimals[i].subEntries.length; j++) {
    //       output += "<li>" + hirarchicalAnimals[i].subEntries[j].title + "</li>";
    //     }

    //     output += "</ul>";
    //   }

    //   output += "</div>";
    // }
    // dataContainer.innerHTML = output;

    dataContainer.innerHTML = JSON.stringify(data);
}