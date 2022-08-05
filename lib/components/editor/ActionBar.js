function ActionBar({onRun, onSave, onEdit}) {
  return (
    <div className="action-bar">
      <div className="columns is-mobile">
        <div className="column">
          {onSave && (
            <button className="button mr-3" onClick={onSave}>
              <span>Save</span>
              <span className="icon is-small">
                <i className="fa-solid fa-floppy-disk"></i>
              </span>
            </button>
          )}
          {onEdit && (
            <button className="button" onClick={onEdit}>
              <span>Edit</span>
              <span className="icon is-small">
                <i className="fa-solid fa-pen"></i>
              </span>
            </button>
          )}
        </div>
        <div className="column has-text-right">
          {onRun && (
            <button onClick={onRun} className="button is-primary">
              <span>Run</span>
              <span className="icon is-small">
                <i className="fa-solid fa-play"></i>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActionBar;