import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Bio from '../../components/Bio'
import get from 'lodash/get'
import './index.scss'

class HelloFolks extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    console.log(this.props.data)

    return (
      <div className="helloFolks">
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h1>BOGUS</h1>

        <Bio />
      </div>
    )
  }
}

HelloFolks.propTypes = {
  route: React.PropTypes.object,
}

export default HelloFolks

export const pageQuery = graphql`
  query BlogPostByPath2($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
