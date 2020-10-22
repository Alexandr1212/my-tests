export class Router {
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  // Get match url, add in history, render template with params
  loadRoute(...urlSegments) {
    const matchedRoute = this._matchUrlToRoute(urlSegments);
    const url = `/${urlSegments.join('/')}`;
    const routerOutletElement = document.querySelectorAll('[data-router-render]')[0];
    history.pushState({}, '', url);

    if(typeof matchedRoute.template === "function") {
      routerOutletElement.innerHTML = matchedRoute.template(matchedRoute.params);
    } else {
      routerOutletElement.innerHTML = matchedRoute.template;
    }
  }

  // Search match url
  _matchUrlToRoute(urlSegments) {
    const matchedRoute = this.routes.find(route => {
      const routePathSegments = route.path.split('/').slice(1);

      if(routePathSegments.length !== urlSegments.length) return false;
      return routePathSegments.every((routePathSegment, i) => routePathSegment === urlSegments[i]);
    });
    return matchedRoute;
  }

  _loadInitialRoute() {
    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
    this.loadRoute(...pathSegments);
  }
}
