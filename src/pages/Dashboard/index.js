import { Route } from 'react-router-dom';
import Header from '../../components/Header';
import Game from './Game'

export default function Dashboard() {
  return (
    <>
      <Header />
      <Route exact path='/' component={Game} />
    </>
  )
}