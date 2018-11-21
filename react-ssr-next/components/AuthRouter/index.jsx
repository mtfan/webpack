import Router from 'next/router';
export default function AuthRouter(Comp) {
  return class WrapperComp extends Comp {
    componentWillMount() {
      if (false) {
        Router.push('/login');
      }
    }
    render() {
      return super.render();
    }
  };
}
