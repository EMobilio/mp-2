import {useEffect, useState} from "react";
import styled from "styled-components";
import PokemonCards from "./components/PokemonCards.tsx";
import {Pokemon} from "./interfaces/Pokemon.ts";

// styled wrapper div containing site content
const WrapperDiv = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 1%;
    background-color: #3b4cca;
    color: white;
    text-align: center;
    font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
    font-size: calc(8px + 1vw);
`;

export default function App() {
    // store all 151 pokemon with the useState hook
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

    // fetch pokemon data with useEffect hook
    useEffect(() => {
        async function fetchPokemon(): Promise<void> {
            const allPokemon: Pokemon[] = [];

            // loop through numbers 1 to 151 and fetch data for each pokemon
            for (let i = 1; i <= 151; i++) {
                const rawPokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                const pokemonData  = await rawPokemonData.json();

                // construct the pokemon instance with the fetched data
                const pokemon : Pokemon = {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    types: pokemonData.types.map((t : { type: { name: string } } ) => t.type.name),
                    abilities: pokemonData.abilities.map((a : { ability: { name: string } }) => a.ability.name),
                    image: pokemonData.sprites.front_default
                };

                // add this pokemon to the array of all pokemon
                allPokemon.push(pokemon);
            }

            // update the state with the fetched pokemon data
            setPokemonData(allPokemon);
        }

        fetchPokemon()
            .then(() => console.log("Successfully fetched pokemon."))
            .catch((e: Error) => console.log("Error while fetching pokemon: " + e));
    }, [pokemonData.length]);

    return (
        <WrapperDiv>
            <h1>Original 151 Pokemon</h1>
            {/* Pass in the pokemon data from state to the PokemonCards component to render all pokemon */}
            <PokemonCards pokemonData={pokemonData} />
        </WrapperDiv>
    );
}
