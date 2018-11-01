import React from 'react';
import axios from 'axios';
import randomColor from 'randomcolor';

class DashboardPage extends React.Component {

  state = {
    quotes: null,
    selectedQuote: Math.floor(Math.random() * 102),
    color: randomColor({ luminosity: 'dark' })
  }

  componentDidMount() {
    axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then((res) => {
      this.setState({
        quotes: JSON.parse(res.request.response).quotes
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  selectQuote = () => {
    this.setState({
      selectedQuote: Math.floor(Math.random() * 102),
      color: randomColor({ luminosity: 'dark' })
    });
  }

  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (!this.state.quotes) {
      return (
        <div className="dashboard-page">
          <h1>Retrieving Quotes</h1>
        </div>
      );
    }
    const currQuote = this.state.quotes[this.state.selectedQuote];
    return (
      <div className="dashboard-page" style={{ color: this.state.color, backgroundColor: this.state.color }}>
        <div className="box-layout__box">
          <p className="quote-text">{currQuote.quote}</p>
          <h3 className="quote-author">{"- " + currQuote.author}</h3>
          <button className="button" style={{ background: this.state.color }} onClick={this.selectQuote}>New Quote</button>
          <a className="button"
            style={{ background: this.state.color }}
            href={`https://twitter.com/intent/tweet?text=${currQuote.quote} - ${currQuote.author}`}
            data-size="large"
            target="_blank"
          >
            Tweet</a>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
