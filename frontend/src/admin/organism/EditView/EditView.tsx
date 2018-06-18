import { Component } from 'react'
import { removeKeys } from '../../../common/common'

type Props = {
    fetch: any,
    history: any,
    update: any,
    match: any
}

type State = {
  model: {
    id?: any
  }
}

export class EditView<ChildProps = {}, ChildState = {}> extends Component<ChildProps & Props, ChildState & State> {
  fetchQueryName: string
  slug: string
  updateMutationName: string

  modelChanged = model => {
    this.setState({
      model,
    })
  }

  handleSubmit = () => {
    this.props
      .update({
        variables: {
          data: removeKeys({ ...this.state.model }),
        },
      })
      .then(data => {
        if (!this.state.model.id) {
          this.props.history.push(
            `/${this.slug}/edit/${data.data[this.updateMutationName].id}`
          )
        }
      })
  }

  // componentDidMount() {
  //     this.props.client
  //         .query({
  //             query: QUERY,
  //             variables: {
  //                 path: this.state.path.join('/')
  //             },
  //             fetchPolicy: 'network-only'
  //         })
  //         .then(result => {
  //             this.setState({
  //                 model : result.data.fetch[this.fetchQueryName]
  //             });
  //         });
  // }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      newProps !== this.props &&
      newProps.fetch &&
      newProps.fetch[this.fetchQueryName]
    ) {
      this.setState({
        model: newProps.fetch[this.fetchQueryName],
      })
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.fetch) {
      this.setState({
        model: this.props.fetch[this.fetchQueryName],
      })
    }
  }
}
