angular.module('geolfApp').service('geotracker', function() {
    var self = this;

    this.config = {
        enableHighAccuracy: true,
        maximumAge: 5000
    };

    /** geo listeners */
    this.listeners = [];

    /**
     * start tracking
     * @param callback for geoservice update
     * @param optional config to override default
     *
     */
    this.start = function(config) {
        if (config) {
            self.config = config;
        }
        navigator.geolocation.watchPosition(self.updated, self.error, self.config);
    };

    /**
     * subscribe  to geo service
     * @param callback
     */
    this.subscribe = function(callback) {
        self.listeners.push(callback);
    }

    /**
     * update geolocation
     * @param geo
     */
    this.updated = function(geo) {
        self.accuracy = geo.coords.accuracy;
        self.geo = geo;
        self.listeners.forEach( function(l) {
            l.apply(this, [geo]);
        });
    }

    /**
     * update geolocation error handler
     * @param error
     */
    this.error = function(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
    }
});