import React from 'react';
import { withRouter } from 'react-router-dom';

import { getItemFromStorage, setItemToStorage, pushItemToStorage } from '../../utils/localStorageHelpers';

const isUnread = id => !getItemFromStorage('read').includes(id);

const showArticleDetails = (article, history) => {
  pushItemToStorage('read', article.id);
  setItemToStorage('article', article);
  history.push('/details');
};

export default withRouter((props) => {
  const { article, pinned, history } = props;
  const { id, sectionName, webTitle, fields } = article;
  const { thumbnail } = fields || {};
  return <div className='article' onClick={() => showArticleDetails(article, history)}>
    {thumbnail && <img src={thumbnail} alt={webTitle} />}
    <div className='content'>
      <span>
        {sectionName}
        {!pinned && isUnread(id) && <span className='unread'>Unread</span>}
      </span>
      <p>{webTitle}</p>
    </div>
  </div>;
});