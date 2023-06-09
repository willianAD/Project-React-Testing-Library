import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa a funcionalidade da pagina principal', () => {
  it('Verifica se a página contém um heading h2 com o texto Encountered pokémons', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const getTitle = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(getTitle).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const getPokemon = screen.getByTestId('pokemon-name');
    expect(getPokemon).toHaveTextContent('Pikachu');

    const getButton = screen.getByTestId('next-pokemon');
    userEvent.click(getButton);
    expect(getPokemon).toHaveTextContent('Charmander');
  });

  it('Verifica se a Pokédex tem os botões de filtro', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    const getButton = screen.getAllByTestId('pokemon-type-button');
    expect(getButton[0]).toHaveTextContent('Electric');
    userEvent.click(getButton[0]);

    const getTypePokemon = screen.getByTestId('pokemon-type');
    expect(getTypePokemon).toHaveTextContent('Electric');

    const buttonNext = screen.getByTestId('next-pokemon');
    expect(buttonNext).toBeDisabled();
    expect(buttonNext.disabled).toBe(true);
    userEvent.click(buttonAll);

    expect(getButton[1]).toHaveTextContent('Fire');
    expect(getButton[2]).toHaveTextContent('Bug');
    expect(getButton[3]).toHaveTextContent('Poison');
    expect(getButton[4]).toHaveTextContent('Psychic');
    expect(getButton[5]).toHaveTextContent('Normal');
    expect(getButton[6]).toHaveTextContent('Dragon');
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro ', () => {
    const { history } = renderWithRouter(<App />);

    const refresh = '/';
    act(() => {
      history.push(refresh);
    });

    const getPokemon = screen.getByTestId('pokemon-name');
    expect(getPokemon).toHaveTextContent('Pikachu');
  });
});
