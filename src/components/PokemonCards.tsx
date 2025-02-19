import styled from "styled-components";
import {Pokemon} from "../interfaces/Pokemon.ts";

// styled div container for all pokemon instances
const AllPokemonDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    width: 100%;
    margin: 5% 0;
`;

// styled div to contain info for individual pokemon
const PokemonDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    min-width: 140px;
    background-color: #b3a125;
    color: black;
    margin: 3%;
    padding: 2%;
    border-radius: 20px;
`;

// styled image for displaying pokemon sprites
const SpriteImg = styled.img`
    width: 80%;
    max-width: 100%;
`;

// styled span for pokemon info text
const PokemonInfoSpan= styled.span`
    margin: 5%;
`;

export default function PokemonCards (props: {pokemonData: Pokemon[]}) {
    return (
        <AllPokemonDiv>
            {/* Map each pokemon instance to a card display its info */}
            {props.pokemonData.map((pokemon: Pokemon) =>
                <PokemonDiv key={pokemon.id}>
                    <SpriteImg src={pokemon.image} alt={pokemon.name} />
                    <h2>{pokemon.name.toUpperCase()}</h2>

                    {/* Map all of its types to display them */}
                    <PokemonInfoSpan>
                        <h3>Types:</h3>
                        {pokemon.types.map((type: string, index: number) =>
                            <p key={index}>{type}</p>
                        )}
                    </PokemonInfoSpan>

                    {/* Map all of its abilities to display them */}
                    <PokemonInfoSpan>
                        <h3>Abilities:</h3>
                        {pokemon.abilities.map((ability: string, index: number) =>
                            <p key={index}>{ability}</p>
                        )}
                    </PokemonInfoSpan>
                </PokemonDiv>
            )}
        </AllPokemonDiv>
    );
}