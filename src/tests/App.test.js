import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa ', () => {
  it('Verifica se os links tem seus respectivos titulos', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const getHome = screen.getByRole('link', { name: 'Home' });
    expect(getHome).toBeInTheDocument();

    const getAbout = screen.getByRole('link', { name: 'About' });
    expect(getAbout).toBeInTheDocument();

    const getFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(getFavorite).toBeInTheDocument();
  });

  it('Verifica se é renderizado a pagina / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);

    const getHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(getHome);
    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se é renderizado a pagina /about ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);

    const getAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(getAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it('Verifica se é renderizado a pagina /favorite ao clicar no link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const getFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(getFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Verifica se é renderizado a pagina Not Found ao selecionar uma pagina inexistente', () => {
    const { history } = renderWithRouter(<App />);

    const urlInvalid = '/xablau';
    act(() => {
      history.push(urlInvalid);
    });

    const getNotFound = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(getNotFound).toBeInTheDocument();
    const getElementOfPage = screen
      .getByRole('img', { name: 'Pikachu crying because the page requested was not found' });
    expect(getElementOfPage).toBeInTheDocument();
  });
});
