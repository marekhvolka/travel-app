import { Component } from 'react'

type Props = {
  model: any
}

type State = {
  model: any
}

export class FormWithState<ChildProps = {}> extends Component<ChildProps & Props, State> {
  state = {
    model: {},
  }

  onChange = (newValues) => {
    this.setState(previousState => ({
      ...previousState,
      model: {
        ...previousState.model,
        ...newValues
      },
    }))
  }
}
