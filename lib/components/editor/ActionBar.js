function ActionBar({onRun, onSave, onEdit}) {
  return (
    <div className="mt-2">
      {onRun && (
        <button onClick={onRun} className="button is-primary mr-3">
          <span>Run</span>
          <span className="icon is-small">
            <i className="fa-solid fa-play"></i>
          </span>
        </button>
      )}
      {onSave && (
        <button className="button mr-3" onClick={onSave}>
          <span>Save</span>
          <span className="icon is-small">
            <i className="fa-solid fa-floppy-disk"></i>
          </span>
        </button>
      )}
      {onEdit && (
        <button className="button" onClick={onSave}>
          <span>Edit</span>
          <span className="icon is-small">
            <i className="fa-solid fa-pen"></i>
          </span>
        </button>
      )}
    </div>
  );
}

export default ActionBar;