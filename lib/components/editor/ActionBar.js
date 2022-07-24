function ActionBar({onRun, onSave}) {
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
        <button className="button" onClick={onSave}>
          <span>Save</span>
          <span className="icon is-small">
            <i className="fa-solid fa-floppy-disk"></i>
          </span>
        </button>
      )}
    </div>
  );
}

export default ActionBar;