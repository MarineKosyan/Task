import React, { Fragment, PureComponent } from 'react';
import axios from 'axios';

import Article from './Article';
import { getItemFromStorage } from "../../utils/localStorageHelpers";

class Articles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      articles: [],
      currentPage: 1,
      pages: 0,
    };
  }

  componentDidMount() {
    this.request();
    this.setState({ intervalId: setInterval(this.request, 30000)});
    window.addEventListener('scroll', this.handleOnScroll);

  }

  componentWillUnmount() {
    // clearInterval(this.state.intervalId);
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  render () {
    const pinnedArticles = this.state.articles
      .filter(article => [...getItemFromStorage('pinned')].includes(article.id));
    return <Fragment>
      <div className='pinned-section'>
        <h2>Pinned Articles</h2>
        {pinnedArticles.map(article => <Article key={article.id} article={article} pinned />)}
      </div>
      <h2>Articles</h2>
      {this.state.articles.map(article => <Article key={article.id} article={article} />)}
    </Fragment>;
  }

  handleOnScroll = () => {
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    console.log(height, window.scrollY);
    if (height === window.scrollY) {
      const { currentPage, pages } = this.state;
      if(currentPage < pages) {
        this.request(currentPage + 1);
      }
    }
  };

  request = (page) => {
    const self = this;
    axios.get(`https://content.guardianapis.com/search?api-key=test&format=json&show-fields=thumbnail&page=${page || this.state.currentPage}`)
      .then(function (res) {
        const {data: { response: { results, currentPage, pages} }} = res;
        if (page) {
          self.setState({ articles: [...self.state.articles, ...results], currentPage, pages });
        } else {
          if (self.state.articles.length) {
            const index = results.findIndex(item => self.state.articles[0].id === item.id);
            if (index > 0) {
              self.setState({ articles: [...results.slice(0, index), ...self.state.articles], currentPage, pages });
            }
          } else {
            self.setState({ articles: results, currentPage, pages });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default Articles;
