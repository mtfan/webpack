export default function({ store, route, redirect }) {
  if (route.name !== 'login' && !store.state.user) {
    console.log(redirect('/login'));
  }
}
