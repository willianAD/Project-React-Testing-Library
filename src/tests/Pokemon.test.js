import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  it('Verifica se é renderizado um nome, tipo, informações, imagem e seus atributos de um pokémon', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const getName = screen.getByTestId('pokemon-name');
    expect(getName).toHaveTextContent('Pikachu');

    const getType = screen.getByTestId('pokemon-type');
    expect(getType).toHaveTextContent('Electric');

    const getWeight = screen.getByTestId('pokemon-weight');
    expect(getWeight).toHaveTextContent('Average weight: 6.0 kg');

    const image = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const getImg = screen.getByRole('img');
    expect(getImg.src).toBe(image);

    const getImg2 = screen.getByAltText('Pikachu sprite');
    expect(getImg2).toBeInTheDocument();
  });

  it('Verifica se ao clicar no link More Details, é redirecionado para a página de detalhes de pokémon com as descrições do mesmo', () => {
    const { history } = renderWithRouter(<App />);

    const getLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(getLink);
    expect(history.location.pathname).toBe('/pokemons/25');

    const getSubtitle = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(getSubtitle).toBeInTheDocument();
    const getInfos = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(getInfos).toBeInTheDocument();
    const img1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const img2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const getImage = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(getImage[0].src).toBe(img1);
    expect(getImage[1].src).toBe(img2);

    const getChecked = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(getChecked);
  });

  it('Verifica se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const getFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(getFavorite);
    expect(history.location.pathname).toBe('/favorites');

    const imagePikachu = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const getImgPikachu = screen.getByAltText('Pikachu sprite');
    expect(getImgPikachu.src).toBe(imagePikachu);
    expect(getImgPikachu).toBeInTheDocument();

    const getImgStar = screen.getByAltText('Pikachu is marked as favorite');
    const imageStar = 'http://localhost/star-icon.svg';
    expect(getImgStar.src).toBe(imageStar);
    expect(getImgStar).toBeInTheDocument();

    const getType = screen.getByTestId('pokemon-type');
    expect(getType).toHaveTextContent('Electric');

    const getDetails = screen.getByRole('link', { name: 'More details' });
    expect(getDetails).toBeInTheDocument();
    expect(getDetails.href).toBe('http://localhost/pokemons/25');
  });
});
