import React, {PropTypes} from "react"

import DefaultTemplate from "../DefaultTemplate"

import Html from "../Html"
import Head from "../Head"
import Body from "../Body"
import AuthorsList from "../AuthorsList"
import Author from "../Author"
import Contributors from "../Contributors"
import formatDate from "../formatDate"

export default class Post extends DefaultTemplate {

  static displayName = "Post"

  // should not be declared here too, only in parent class
  // https://github.com/yannickcr/eslint-plugin-react/issues/68
  static propTypes = {
    pkg: PropTypes.object.isRequired,
    contributors: PropTypes.object.isRequired,
    collections: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired,
  }

  render() {
    const pkg = this.props.pkg
    const i18n = this.props.i18n
    const file = this.props.file

    // we want original filename
    const filename = file.filename.replace(/\.html$/, ".md")

    var twitterAuthor = this.props.file.authors && this.props.file.authors.length ?
      this.props.contributors.map[this.props.file.authors[0]].twitter
      :
      this.props.i18n.twitterUsername

    return (
      <Html>
        <Head title={this.props.file.title}>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content={`@${this.props.i18n.twitterUsername}`} />
          <meta name="twitter:title" content={this.props.file.title} />
          <meta name="twitter:creator" content={`@${twitterAuthor}`} />

          <meta property="og:title" content={this.props.file.title} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content={this.props.i18n.title} />
        </Head>
        <Body>
          <article className="r-Grid putainde-Post">
            <div className="r-Grid-cell r-all--8of12 putainde-Post-contents">

              {
                this.props.file.title &&
                <div className="putainde-Title">
                  <h1 className="putainde-Title-text">
                    {this.props.file.title}
                  </h1>
                </div>
              }

              <header className="putainde-Post-header">
              {
                (file.authors || file.date) &&
                <div className="putainde-Post-metas">
                  {
                    (file.authors && file.authors.length) &&
                    <span>
                      {`${i18n.writtenBy} `}
                      <AuthorsList authors={file.authors} />
                    </span>
                  }
                  {
                    (file.authors && file.authors.length && file.date) &&
                    <span>{", "}</span>
                  }
                  {
                    file.date &&
                    <span className="putainde-Date">
                      {` ${i18n.the} ${formatDate(file.date)}`}
                    </span>
                  }
                  {". "}
                  <span
                    className="putainde-Post-readingTime putainde-Post-readingTime--hidden r-Tooltip r-Tooltip--top"
                    data-r-tooltip={i18n.readingTimeComment}
                    data-readingtime-wpm="250"
                  >
                    {`${i18n.readingTime} `}
                    <span className="putainde-Post-readingTime-value">...</span>
                    {` ${i18n.minutes}`}
                  </span>
                </div>
              }
              {
                file.tags &&
                <ul className="putainde-Tags putainde-Post-tags">
                {
                  file.tags.map(tag => (
                    <li key={tag} className="putainde-Tag">{tag}</li>
                  ))
                }
                </ul>
              }
              </header>

              <div className="putainde-Post-md">
                <div dangerouslySetInnerHTML={{__html: this.props.file.contents}}></div>
              </div>

              <footer className="putainde-Post-footer">

                <div className="putainde-Post-footer-title">{i18n.pageActions}</div>
                <div className="r-Grid">
                  <div className="r-Grid-cell r-all--1of3">
                    <a className="putainde-Post-footer-action" href={`${pkg.repositoryHttpUrl}/edit/master/content/${filename}`}>{i18n.pageEdit}</a>
                  </div>
                  <div className="r-Grid-cell r-all--1of3">
                    <a className="putainde-Post-footer-action" href={`${pkg.repositoryHttpUrl}/blame/master/content/${filename}`}>{i18n.pageBlame}</a>
                  </div>
                  <div className="r-Grid-cell r-all--1of3">
                    <a className="putainde-Post-footer-action" href={`${pkg.repositoryHttpUrl}/commits/master/content/${filename}`}>{i18n.pageHistory}</a>
                  </div>
                </div>

                {
                  file.authors && file.authors.length === 1 &&
                  <div>
                    <Author author={file.authors[0]} isPost={true} />
                  </div>
                }
                {
                  file.authors && file.authors.length > 1 &&
                  <div>
                    <h3 className="putainde-WrittenBy">{i18n.writtenBy}</h3>
                    {
                      file.authors &&
                      file.authors.map(author => <Author key={author} author={author} />)
                    }
                  </div>
                }

                <Contributors filename={filename} />

                <div id="disqus_thread" aria-live="polite">
                  <noscript>
                    {"Please enable JavaScript to view the "}
                    <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a>
                  </noscript>
                </div>

              </footer>

            </div>
          </article>
        </Body>
      </Html>
    )
  }
}
