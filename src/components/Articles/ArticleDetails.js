import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import Article from './Article';
import { getItemFromStorage, pushItemToStorage } from '../../utils/localStorageHelpers';

class ArticleDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      articleDetails: {},
    };
  }

  componentDidMount() {
    this.setState({ articleDetails: getItemFromStorage('article') });
  }

  render () {
    return <div className='article_details'>
      <Article article={this.state.articleDetails} />
      <button onClick={() => pushItemToStorage('pinned', this.state.articleDetails.id)}>Pin</button>
      <button onClick={() => this.props.history.push('/')}>Back</button>
    </div>;
  }
}

export default withRouter(ArticleDetails);