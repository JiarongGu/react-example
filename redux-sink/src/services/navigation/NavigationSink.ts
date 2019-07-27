import { createBrowserHistory, History, Location } from 'history';
import { sink, SinkFactory, state } from 'redux-sink';

@sink('navigation')
export class NavigationSink {
  @state public history: History;
  @state public location: Location;
}

export const createNavigationHistory = () => {
  const history = createBrowserHistory();
  const navigation = SinkFactory.sink(NavigationSink);

  history.listen((location) => navigation.location = location);
  navigation.location = history.location;
  navigation.history = history;

  return history;
}