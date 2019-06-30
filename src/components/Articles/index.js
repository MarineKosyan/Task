import React, { Fragment, PureComponent } from 'react';
import axios from 'axios';

import Article from './Article';
import { PAGE_SIZE, MILLISECONDS } from "../../constants/defaults";
import { getItemFromStorage } from "../../utils/localStorageHelpers";

class Articles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      articles: [],
      total: 0,
      pageSize: PAGE_SIZE,
    };
  }

  componentDidMount() {
    this.request();
    this.setState({ intervalId: setInterval(this.request, MILLISECONDS)});
    window.addEventListener('scroll', this.handleOnScroll)
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
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

  handleOnScroll = (e,c,f) => {
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height === window.scrollY) {
      const { total, pageSize } = this.state;
      if(pageSize * PAGE_SIZE < total) {
        this.request(pageSize + PAGE_SIZE);
      }
    }
  };

  request = (pageSize) => {
    const self = this;
    axios.get(`https://content.guardianapis.com/search?api-key=test&format=json&show-fields=thumbnail&page-size=${(pageSize || this.state.pageSize)}`)
      .then(function (res) {
        const {data: { response: { results, total, pageSize} }} = res;
        self.setState({articles: results, total, pageSize });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default Articles;
