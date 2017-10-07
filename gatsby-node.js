const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(limit: 1000) {
              edges {
                node {
                  fileAbsolutePath
                  frontmatter {
                    path
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {
          var abspath = edge.node.fileAbsolutePath
          var componentPath = `${abspath.split('index.md')[0]}index.js`

          component = blogPost
          if (fs.existsSync(componentPath)) {
            component = path.resolve(componentPath)
            console.log('found')
          }
          console.log('PATH:::::', edge.node.frontmatter.path)
          createPage({
            path: edge.node.frontmatter.path,
            component: component,
            context: {
              path: edge.node.frontmatter.path,
            },
          })
        })
      })
    )
  })
}
