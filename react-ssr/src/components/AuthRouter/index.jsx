export default function AuthRouter(Comp) {
  return class WrapperComp extends Comp {
    componentWillMount() {
      if (true) {
        this.props.history.push('/login');
      }
    }
    render() {
      return super.render();
    }
  };
}
