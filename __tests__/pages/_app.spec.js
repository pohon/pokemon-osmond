import App from '../../pages/_app'
import Home from '../../pages/index'
import { render, screen, fireEvent } from '@testing-library/react'

describe('_app test', () => {
  
  it('Should render correctly', () => {
    const { container } = render(<App Component={Home} pageProps={{}} />)
    expect(container).toMatchSnapshot()

  });
})