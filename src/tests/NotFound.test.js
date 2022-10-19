import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../pages/NotFound';

describe('Testa se a pagina <NotFound /> tem todos itens renderizado corretamente', () => {
  it('Verifica se todos itens de <NotFound /> são renderizados na tela corretamente', () => {
    render(<NotFound />);

    const getNotFound = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(getNotFound).toBeInTheDocument();

    const getImage = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(getImage).toBeInTheDocument();

    const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const getImg = screen.getByRole('img');
    expect(getImg.src).toBe(image);
  });
});
