import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../pages/About';

describe('Testa se a pagina <About /> tem todos itens renderizado corretamente', () => {
  it('Verifica se a página contém um h2 com o texto About Pokédex', () => {
    render(<About />);

    const getTitle = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(getTitle).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const getText1 = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémons/i);
    expect(getText1).toBeInTheDocument();

    const getText2 = screen.getByText(/One can filter Pokémons by type, and see more details for each one of them/i);
    expect(getText2).toBeInTheDocument();
  });

  it('Verifica se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);

    const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const getImg = screen.getByRole('img');
    expect(getImg.src).toBe(image);

    const getImg2 = screen.getByAltText('Pokédex');
    expect(getImg2).toBeInTheDocument();
  });
});
