import React from 'react';
import axios from 'axios';

class DashboardPage extends React.Component {

  state = {
    quotes: null,
    selectedQuote: Math.floor(Math.random() * 101)
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
      selectedQuote: Math.floor(Math.random() * 103)
    });
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
      <div className="dashboard-page">
        <div className="box-layout__box">
          <h2>{currQuote.quote}</h2>
          <h3>{currQuote.author}</h3>
          <button className="button" onClick={this.selectQuote}>New Quote</button>
          <a className="button"
            href={`https://twitter.com/intent/tweet?text=${currQuote.quote} - ${currQuote.author}`}
            data-size="large"
            target="_blank"
          >
            Tweet</a>
        </div>
      </div>
    )
  }
}

export default DashboardPage;
