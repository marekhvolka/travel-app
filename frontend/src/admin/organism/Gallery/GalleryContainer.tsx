import React, { Component } from 'react'
import gql from 'graphql-tag'
import withApollo from 'react-apollo/withApollo'
import { Gallery } from './Gallery'
import {WithApolloClient} from "react-apollo";

const QUERY = gql`
  query($path: String!) {
    dir(path: $path) {
      name
      subdirectories {
        name
        path
      }
      files {
        size
        name
        path
      }
    }
  }
`

type Props = {
  onImageSelected?: any
}

type State = {
  directoryName: string
  path: string[]
  subdirectories: any[]
  files: any[]
}

class GalleryContainer extends Component<WithApolloClient<Props>, State> {
  state = {
    directoryName: null,
    path: [],
    subdirectories: [],
    files: [],
  }

  componentDidMount() {
    this.queryDirContent()
  }

  queryDirContent = () => {
    this.props.client
      .query({
        query: QUERY,
        variables: {
          path: this.state.path.join('/'),
        },
        fetchPolicy: 'network-only',
      })
      .then((result: any) => {
        this.setState({
          subdirectories: result.data.dir.subdirectories,
          files: result.data.dir.files,
        })
      })
  }

  dirClicked = dirName => {
    this.setState(
      previousState => ({
        path: [...previousState.path, dirName],
      }),
      () => {
        this.queryDirContent()
      }
    )
  }

  goBack = () => {
    this.setState(
      previousState => ({
        path: previousState.path.slice(0, -1),
      }),
      () => {
        this.queryDirContent()
      }
    )
  }

  render() {
    return (
      <div>
        <Gallery
          path={this.state.path}
          files={this.state.files}
          subdirectories={this.state.subdirectories}
          dirClicked={this.dirClicked}
          directoryName={this.state.directoryName}
          goBack={this.goBack}
          onRefresh={this.queryDirContent}
        />
      </div>
    )
  }
}

export default withApollo(GalleryContainer)
