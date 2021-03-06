module.exports = {
  index: function(params, callback) {
    var spec = {
      collection: {collection: 'Users', params: params}
    };
    this.app.fetch(spec, function(err, result) {
      callback(err, 'users_index_view', result);
    });
  },

  show: function(params, callback) {
    var spec = {
      model: {model: 'User', params: params},
      repos: {collection: 'Repos', params: {user: params.login}}
    };
    this.app.fetch(spec, function(err, result) {
      callback(err, 'users_show_view', result);
    });
  },

  // This is the same as `show`, but it doesn't fetch the Repos. Instead,
  // the `users_show_lazy_view` template specifies `lazy=true` on its
  // subview. We have both here for demonstration purposes.
  show_lazy: function(params, callback) {
    var spec = {
      model: {model: 'User', params: params}
    };
    this.app.fetch(spec, function(err, result) {
      if (err) return callback(err);
      // Extend the hash of options we pass to the view's constructor
      // to include the `template_name` option, which will be used
      // to look up the template file. This is a convenience so we
      // don't have to create a separate view class.
      _.extend(result, {
        template_name: 'users_show_lazy_view'
      });
      callback(err, 'users_show_view', result);
    });
  }
};
