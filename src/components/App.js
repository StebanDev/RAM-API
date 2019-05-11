import React, { Component } from 'react';

import logo from '../images/logo.png';
import CharacterCard from './CharacterCard';

class App extends Component {
  state = {
    loading: false,
    error: null,
    data: {
      info: {},
      results: []
    },
    nextPage: 1
  };

  componentDidMount() {
    if (this.state.nextPage <= 1) {
      this.fetchCharacters();
    }
    if (!this.state.loading) {
      window.onscroll = this.detectScrollEnd;
    }
  }
  componentDidUpdate() {
    if (this.state.loading) {
      window.onscroll = () => {};
    } else {
      window.onscroll = this.detectScrollEnd;
    }
  }

  fetchCharacters = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${
          this.state.nextPage
        }`
      );
      const data = await response.json();

      this.setState({
        loading: false,
        data: {
          info: data.info,
          results: [].concat(this.state.data.results, data.results)
        },
        nextPage: this.state.nextPage + 1
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  detectScrollEnd = () => {
    const contentHeight = document.body.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    if (scrollPosition >= contentHeight) {
      if (this.state.nextPage < 26) {
        this.fetchCharacters();
      }
    }
  };

  render() {
    if (this.state.error) {
      return 'Error!';
    }

    return (
      <div className="container">
        <div className="App">
          <img className="Logo" src={logo} alt="Rick y Morty" />

          <ul className="row">
            {this.state.data.results.map(character => (
              <li className="col-6 col-md-3" key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>

          {this.state.loading && (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
