// tutorial1.js
var PhotoStreamer = React.createClass({
  render: function() {
    return (
      <div className="photoStreamer">
        Hello, world! I am a PhotoStreamer.
      </div>
    );
  }
});

ReactDOM.render(
  <PhotoStreamer />,
  document.getElementById('content')
);