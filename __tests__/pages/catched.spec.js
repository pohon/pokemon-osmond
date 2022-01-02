import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw';

import BULBASAUR_DETAIL_MOCK from '../__mocks__/bulbasaurDetail.json'

import Catched from '../../pages/catched'

const server = setupServer(
  // bulbasaur detail
  rest.get('https://pokeapi.co/api/v2/pokemon/1/', (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json(BULBASAUR_DETAIL_MOCK)
    )
  })
);


describe('Catched page test', () => {

  beforeAll(() => {
    localStorage.setItem('CATCHED_POKEMON', JSON.stringify([{
      id: 1,
      timeStamp: 1641104217345
    }]))

    return server.listen()
  })

  afterAll(() => {
    jest.resetAllMocks()

    return server.close()
  })

  afterEach(() => server.resetHandlers())

  beforeEach(() => {
    render(<Catched />)
  })

  it('Should display bulbasaur on the collected table', async () => {
    await screen.findByText('bulbasaur')
    expect(screen.queryAllByText('bulbasaur').length).toBe(1)
  })

  it('Should delete collected pokemon correctly', async () => {
    await screen.findByText('bulbasaur')

    // toggle delete
    fireEvent.click(screen.getAllByTestId('toggleDeleteBtn')[0], {})

    // confirm delete
    fireEvent.click(screen.getAllByTestId('confirmDeleteBtn')[0], {})
    expect(localStorage.getItem('CATCHED_POKEMON')).toEqual(JSON.stringify([]))
  });

})