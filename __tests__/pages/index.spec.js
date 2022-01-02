import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw';
import { SWRConfig } from 'swr';

import POKEMON_LIST_MOCK from '../__mocks__/pokemonList.json'
import BULBASAUR_DETAIL_MOCK from '../__mocks__/bulbasaurDetail.json'

import Home from '../../pages/index'

const server = setupServer(
  // pokemon list
  rest.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0', (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json(POKEMON_LIST_MOCK)
    )
  }),

  // bulbasaur detail
  rest.get('https://pokeapi.co/api/v2/pokemon/1/', (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json(BULBASAUR_DETAIL_MOCK)
    )
  })
);

beforeAll(() => server.listen())
afterAll(() => {
  jest.resetAllMocks();

  return server.close()
})
afterEach(() => server.resetHandlers())

describe('Home page test', () => {

  beforeEach(() => {
    render(
      <SWRConfig>
        <Home />
      </SWRConfig>
    );
  });

  it('Should display bulbasaur', async () => {
    expect(screen.queryAllByTestId('listLoader').length).toBe(1)

    await screen.findByText('bulbasaur');

    expect(screen.queryAllByText('bulbasaur').length).toBe(1)
  })

  it("Should display bulbasaur's detail correctly", async () => {
    // spy setItem
    const spyLoStoSetItem = jest.spyOn(localStorage, 'setItem')

    // list loaded
    await screen.findByText('bulbasaur');
    expect(screen.queryAllByTestId('pokemonThumbnail').length).toBe(20);

    // click thumbnail
    fireEvent.click(screen.getAllByTestId('pokemonThumbnail')[0], {})
    expect(screen.queryAllByText('grass').length).toBe(1)

    // catch bulbasaur
    fireEvent.click(screen.getAllByTestId('catchButton')[0], {})
    expect(spyLoStoSetItem).toHaveBeenCalled()
  })
})