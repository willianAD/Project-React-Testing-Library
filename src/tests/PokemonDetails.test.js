import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa se a pagina <PokemonDetails /> tem todos itens renderizado corretamente', () => {
  it('Verifica se as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const getDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(getDetails);

    const getText = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(getText).toBeInTheDocument();

    expect(getDetails).not.toBeInTheDocument();

    const getSummary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(getSummary).toBeInTheDocument();

    const getInfos = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(getInfos).toBeInTheDocument();
  });

  it('Verifica se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const getDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(getDetails);

    const getText = screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(getText).toBeInTheDocument();

    const img1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const img2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const getImage = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(getImage[0]).toBeInTheDocument();
    expect(getImage[1]).toBeInTheDocument();
    expect(getImage[0].src).toBe(img1);
    expect(getImage[1].src).toBe(img2);

    const getLocal = screen.getByText('Kanto Viridian Forest');
    expect(getLocal).toBeInTheDocument();

    const getLocal2 = screen.getByText('Kanto Power Plant');
    expect(getLocal2).toBeInTheDocument();
  });

  it('Verifica se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const getDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(getDetails);

    const getCheckbox = screen.getByLabelText('Pokémon favoritado?');
    console.log(getCheckbox.checked);
    expect(getCheckbox.checked).toBeFalsy();

    const getChecked = screen.getByLabelText('Pokémon favoritado?');
    expect(getChecked).toBeInTheDocument();

    userEvent.click(getChecked);
    expect(getCheckbox.checked).toBeTruthy();

    const getImgStar = screen.getByAltText('Pikachu is marked as favorite');
    const imageStar = 'http://localhost/star-icon.svg';
    expect(getImgStar.src).toBe(imageStar);
    expect(getImgStar).toBeInTheDocument();

    userEvent.click(getChecked);
    expect(getImgStar).not.toBeInTheDocument();
  });
});
