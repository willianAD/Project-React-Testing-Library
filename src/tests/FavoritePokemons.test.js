import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Testa se a pagina <FavoritesPokemons /> tem todos itens renderizado corretamente', () => {
  it('Verifica se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos', () => {
    render(<FavoritePokemons />);

    const getText = screen.getByText('No favorite pokemon found');
    expect(getText).toBeInTheDocument();
  });

  it('Verifica se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const getDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(getDetails);

    const getChecked = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(getChecked);

    const getFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(getFavorite);

    const getText = screen.queryByText('No favorite pokemon found');
    expect(getText).not.toBeInTheDocument();

    const getElement1 = screen.getByTestId('pokemon-name');
    expect(getElement1).toBeInTheDocument();

    const getElement2 = screen.getByTestId('pokemon-type');
    expect(getElement2).toBeInTheDocument();

    const getElement3 = screen.getByTestId('pokemon-weight');
    expect(getElement3).toBeInTheDocument();

    const getElement4 = screen.getByAltText('Pikachu sprite');
    const image = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(getElement4.src).toBe(image);

    const getElement5 = screen.getByAltText('Pikachu is marked as favorite');
    const image1 = 'http://localhost/star-icon.svg';
    expect(getElement5.src).toBe(image1);
  });
});
